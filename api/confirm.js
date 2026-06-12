module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { orderId, customerEmail, customerName, childName, story, packLabel, amount } = req.body;

    // Paso 1: Capturar el pago en PayPal
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

    const captureResponse = await fetch('https://api-m.paypal.com/v2/checkout/orders/' + orderId + '/capture', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      }
    });

    const captureData = await captureResponse.json();
    console.log('Capture result:', JSON.stringify(captureData));

    if (captureData.status !== 'COMPLETED') {
      return res.status(400).json({ error: 'Payment not completed', details: captureData });
    }

    // Paso 2: Generar paginas adicionales con IA
    const numPages = packLabel.includes('Gran Saga') ? 18 : packLabel.includes('Explorador') ? 8 : 3;
    const pages = [];

    const scenarios = [
      'exploring a magical forest with fairy creatures',
      'riding a dragon through the clouds',
      'discovering a treasure chest on a pirate ship',
      'playing with friendly dinosaurs in a jungle',
      'flying a rocket ship through space with planets and stars',
      'swimming with friendly sea creatures underwater',
      'building a magical castle with wizard helpers',
      'racing on a rainbow with unicorns',
      'going on safari with friendly wild animals',
      'cooking magical potions in a fantasy kitchen',
      'climbing the highest mountain with animal friends',
      'sailing on a boat through magical waters',
      'dancing with forest animals in a clearing',
      'exploring ancient ruins with a map',
      'playing music that makes flowers bloom',
      'teaching little dragons to fly',
      'finding a secret garden full of wonders',
      'meeting friendly giants in a fantasy land'
    ];

    for (let i = 0; i < Math.min(numPages, scenarios.length); i++) {
      pages.push('Pagina ' + (i + 1) + ': ' + childName + ' - ' + scenarios[i]);
    }

    // Paso 3: Enviar email al cliente
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + process.env.RESEND_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Magica Trama <onboarding@resend.dev>',
        to: [customerEmail],
        subject: 'Tu libro de Magica Trama esta listo, ' + customerName + '!',
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#F7E8FF;padding:40px;border-radius:20px;">
            <div style="text-align:center;margin-bottom:30px;">
              <h1 style="font-size:2rem;color:#1A0533;margin-bottom:8px;">✨ Magica Trama</h1>
              <p style="color:#5A3E7A;font-size:0.9rem;">Donde tu imaginacion toma el color</p>
            </div>
            <div style="background:white;border-radius:16px;padding:30px;margin-bottom:24px;">
              <h2 style="color:#1A0533;font-size:1.4rem;margin-bottom:12px;">Hola ${customerName}!</h2>
              <p style="color:#5A3E7A;line-height:1.7;">El libro personalizado de <strong>${childName}</strong> esta listo. Has comprado el <strong>${packLabel}</strong>.</p>
              <p style="color:#5A3E7A;line-height:1.7;">En las proximas horas recibiras un segundo email con el link de descarga de tu PDF personalizado.</p>
              <div style="background:#F7E8FF;border-radius:12px;padding:20px;margin-top:20px;">
                <p style="color:#1A0533;font-weight:700;margin-bottom:8px;">Resumen de tu pedido:</p>
                <p style="color:#5A3E7A;margin:4px 0;">Pack: ${packLabel}</p>
                <p style="color:#5A3E7A;margin:4px 0;">Protagonista: ${childName}</p>
                <p style="color:#5A3E7A;margin:4px 0;">Monto pagado: $${amount} USD</p>
                <p style="color:#5A3E7A;margin:4px 0;">Orden PayPal: ${orderId}</p>
              </div>
            </div>
            <div style="text-align:center;">
              <p style="color:#9B8AAD;font-size:0.8rem;">Gracias por confiar en Magica Trama</p>
              <p style="color:#9B8AAD;font-size:0.8rem;">magicatrama@gmail.com</p>
            </div>
          </div>
        `
      })
    });

    const emailData = await emailResponse.json();
    console.log('Email sent:', JSON.stringify(emailData));

    // Paso 4: Notificar al negocio
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + process.env.RESEND_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Magica Trama <onboarding@resend.dev>',
        to: ['magicatrama@gmail.com'],
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
            <p><strong>Orden PayPal:</strong> ${orderId}</p>
          </div>
        `
      })
    });

    return res.status(200).json({ success: true, message: 'Payment confirmed and email sent' });

  } catch (error) {
    console.error('Confirm error:', error.message);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}
