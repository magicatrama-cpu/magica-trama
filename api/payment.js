module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { amount, packLabel } = req.body;

    const clientId = process.env.PAYPAL_CLIENT_ID;
    const secret = process.env.PAYPAL_SECRET;

    console.log('ClientID length:', clientId ? clientId.length : 'MISSING');
    console.log('Secret length:', secret ? secret.length : 'MISSING');

    const credentials = Buffer.from(clientId + ':' + secret).toString('base64');

    const authResponse = await fetch('https://api-m.paypal.com/v1/oauth2/token', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + credentials,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: 'grant_type=client_credentials'
    });

    const authText = await authResponse.text();
    console.log('PayPal auth response:', authText);

    const authData = JSON.parse(authText);

    if (!authResponse.ok) {
      return res.status(500).json({ error: 'Auth failed', details: authData });
    }

    const accessToken = authData.access_token;

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
          user_action: 'PAY_NOW',
         return_url: 'https://magica-trama.vercel.app/api/success',
          cancel_url: 'https://magica-trama.vercel.app'
        }
      })
    });

    const orderData = await orderResponse.json();

    if (!orderResponse.ok) {
      console.error('Order error:', JSON.stringify(orderData));
      return res.status(500).json({ error: 'Error creating order', details: orderData });
    }

    const approvalUrl = orderData.links.find(link => link.rel === 'approve').href;

    return res.status(200).json({
      orderId: orderData.id,
      approvalUrl: approvalUrl
    });

  } catch (error) {
    console.error('Payment error:', error.message);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}
