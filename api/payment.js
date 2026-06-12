module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { amount, packLabel } = req.body;

    // Obtener token de acceso de PayPal
    const authResponse = await fetch('https://api-m.paypal.com/v1/oauth2/token', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(process.env.PAYPAL_CLIENT_ID + ':' + process.env.PAYPAL_SECRET).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    });

    const authData = await authResponse.json();
    const accessToken = authData.access_token;

    // Crear orden de pago
    const orderResponse = await fetch('https://api-m.paypal.com/v2/checkout/orders', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: amount
          },
          description: 'Magica Trama - ' + packLabel
        }],
        application_context: {
          brand_name: 'Magica Trama',
          landing_page: 'NO_PREFERENCE',
          user_action: 'PAY_NOW',
          return_url: 'https://magica-trama.vercel.app/success',
          cancel_url: 'https://magica-trama.vercel.app'
        }
      })
    });

    const orderData = await orderResponse.json();

    if (!orderResponse.ok) {
      console.error('PayPal error:', JSON.stringify(orderData));
      return res.status(500).json({ error: 'Error creating order', details: orderData });
    }

    const approvalUrl = orderData.links.find(link => link.rel === 'approve').href;

    return res.status(200).json({
      orderId: orderData.id,
      approvalUrl: approvalUrl
    });

  } catch (error) {
    console.error('Payment error:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
