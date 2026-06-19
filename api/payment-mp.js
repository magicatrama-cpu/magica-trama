module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { amount, packLabel, customerEmail } = req.body;

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + process.env.MP_ACCESS_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: [{
          title: 'Magica Trama — ' + packLabel,
          quantity: 1,
          currency_id: 'USD',
          unit_price: parseFloat(amount)
        }],
        payer: { email: customerEmail },
        back_urls: {
          success: 'https://magica-trama.vercel.app/api/success',
          failure: 'https://magica-trama.vercel.app',
          pending: 'https://magica-trama.vercel.app'
        },
        auto_return: 'approved',
        statement_descriptor: 'MAGICA TRAMA',
        external_reference: Date.now().toString()
      })
    });

    const data = await response.json();
    console.log('MP response:', JSON.stringify(data));

    if (!response.ok) {
      return res.status(500).json({ error: 'Error creating MP preference', details: data });
    }

    return res.status(200).json({
      checkoutUrl: data.init_point
    });

  } catch (error) {
    console.error('MP error:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
