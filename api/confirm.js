const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { orderId, customerEmail, customerName, childName, story, packLabel, amount } = req.body;

    console.log('Confirming order:', orderId);

    // Obtener token PayPal
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const secret = process.env.PAYPAL_SECRET;
    const credentials = Buffer.from(clientId + ':' + secret).toString('base64');

    const authResponse = await fetch('https://api-m.paypal.com/v1/oauth2/token', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + credentials,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    });
    const authData = await authResponse.json();
    const accessToken = authData.access_token;
// Si es Mercado Pago, saltar verificacion de PayPal
    if (req.body.paymentSource === 'mercadopago') {
      console.log('Mercado Pago payment confirmed:', orderId);
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: 'magicatrama@gmail.com', pass: process.env.GMAIL_PASSWORD }
      });
      await transporter.sendMail({
        from: '"Magica Trama" <magicatrama@gmail.com>',
        to: req.body.customerEmail,
        subject: 'Tu libro de Magica Trama esta listo, ' + req.body.customerName + '!',
        html: '<div style="font-family:Arial,sans-serif;padding:20px;"><h2>Hola ' + req.body.customerName + '!</h2><p>Tu pago fue confirmado. En los proximos minutos recibiras tu PDF personalizado.</p></div>'
      });
      await transporter.sendMail({
        from: '"Magica Trama" <magicatrama@gmail.com>',
        to: 'magicatrama@gmail.com',
        subject: 'Nueva venta MP! ' + req.body.packLabel + ' - $' + req.body.amount,
        html: '<div style="font-family:Arial,sans-serif;padding:20px;"><h2>Nueva venta Mercado Pago</h2><p><strong>Cliente:</strong> ' + req.body.customerName + '</p><p><strong>Email:</strong> ' + req.body.customerEmail + '</p><p><strong>Nino:</strong> ' + req.body.childName + '</p><p><strong>Pack:</strong> ' + req.body.packLabel + '</p><p><strong>Monto:</strong> $' + req.body.amount + ' USD</p><p><strong>Payment ID:</strong> ' + orderId + '</p></div>'
      });
      return res.status(200).json({ success: true });
    }
    
    // Verificar estado de la orden
    const orderResponse = await fetch('https://api-m.paypal.com/v2/checkout/orders/' + orderId, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + accessToken }
    });
    const orderData = await orderResponse.json();
    console.log('Order status:', orderData.status);

    let finalStatus = orderData.status;
    if (orderData.status === 'APPROVED') {
      const captureResponse = await fetch('https://api-m.paypal.com/v2/checkout/orders/' + orderId + '/capture', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        }
      });
      const captureData = await captureResponse.json();
      finalStatus = captureData.status;
    }

    if (orderData.status === 'COMPLETED') {
      finalStatus = 'COMPLETED';
    }

    if (finalStatus !== 'COMPLETED') {
      return res.status(400).json({ error: 'Payment not completed', status: finalStatus });
    }

    // Configurar Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'magicatrama@gmail.com',
        pass: process.env.GMAIL_PASSWORD
      }
    });

    // Email al cliente
    await transporter.sendMail({
      from: '"Magica Trama" <magicatrama@gmail.com>',
      to: customerEmail,
      subject: 'Tu libro de Magica Trama esta listo, ' + customerName + '!',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#F7E8FF;padding:40px;border-radius:20px;">
          <div style="text-align:center;margin-bottom:30px;">
            <h1 style="font-size:2rem;color:#1A0533;">✨ Magica Trama</h1>
            <p style="color:#5A3E7A;">Donde tu imaginacion toma el color</p>
          </div>
          <div style="background:white;border-radius:16px;padding:30px;margin-bottom:24px;">
            <h2 style="color:#1A0533;">Hola ${customerName}!</h2>
            <p style="color:#5A3E7A;line-height:1.7;">El libro personalizado de <strong>${childName}</strong> esta siendo preparado.</p>
            <p style="color:#5A3E7A;line-height:1.7;">Pack comprado: <strong>${packLabel}</strong></p>
            <p style="color:#5A3E7A;line-height:1.7;">Monto: <strong>$${amount} USD</strong></p>
            <p style="color:#5A3E7A;line-height:1.7;">Orden: <strong>${orderId}</strong></p>
            <p style="color:#5A3E7A;line-height:1.7;margin-top:20px;">En los proximos minutos recibiras tu PDF personalizado en este mismo correo.</p>
          </div>
          <div style="text-align:center;">
            <p style="color:#9B8AAD;font-size:0.8rem;">magicatrama@gmail.com</p>
          </div>
        </div>
      `
    });

    console.log('Email sent to customer:', customerEmail);

    // Notificacion al negocio
    await transporter.sendMail({
      from: '"Magica Trama" <magicatrama@gmail.com>',
      to: 'magicatrama@gmail.com',
      subject: 'Nueva venta! ' + packLabel + ' - $' + amount,
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;">
          <h2>Nueva venta confirmada</h2>
          <p><strong>Cliente:</strong> ${customerName}</p>
          <p><strong>Email:</strong> ${customerEmail}</p>
          <p><strong>Nino:</strong> ${childName}</p>
          <p><strong>Historia:</strong> ${story}</p>
          <p><strong>Pack:</strong> ${packLabel}</p>
          <p><strong>Monto:</strong> $${amount} USD</p>
          <p><strong>Orden:</strong> ${orderId}</p>
        </div>
      `
    });

    console.log('Notification sent to business');

    // Disparar generacion del PDF en background
    fetch('https://magica-trama.vercel.app/api/generate-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        childName: childName,
        story: story,
        packLabel: packLabel,
        customerEmail: customerEmail,
        customerName: customerName
      })
    }).catch(err => console.error('PDF generation error:', err.message));

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Confirm error:', error.message);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}
