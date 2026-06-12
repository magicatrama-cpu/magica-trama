export const config = {
  api: { bodyParser: { sizeLimit: '10mb' } }
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { childName, story, imageBase64 } = req.body;

    const prompt = `A child named ${childName}, coloring book page style, clean bold black outlines only, pure white background, high contrast, wide spaces for coloring, no shading, no gradients, no color fills, vector line art, professional children's illustration, ${story}, single page, centered composition`;

    const response = await fetch('https://fal.run/fal-ai/flux/schnell', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${process.env.FAL_KEY}`,
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
      return res.status(500).json({ error: 'Error generando imágenes', details: data });
    }

    return res.status(200).json({
      images: data.images.map(img => img.url)
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
