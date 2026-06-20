module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { childName, story } = req.body;

    const prompt = 'Coloring book page for children, the main character is a child named ' + childName + ', ' + story + ', clean bold black outlines only, pure white background, no shading, no gradients, no color fills, wide spaces for coloring, vector line art, professional children illustration, single page centered composition';

    const response = await fetch('https://fal.run/fal-ai/flux/schnell', {
      method: 'POST',
      headers: {
        'Authorization': 'Key ' + process.env.FAL_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: prompt,
        image_size: 'portrait_4_3',
        num_inference_steps: 4,
        num_images: 2,
        enable_safety_checker: true
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Fal.ai error:', data);
      return res.status(500).json({ error: 'Error generating images', details: data });
    }

    return res.status(200).json({
      images: data.images.map(img => img.url)
    });

  } catch (error) {
    console.error('Server error:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
