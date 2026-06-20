module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { childName, story, imageBase64 } = req.body;

    // Paso 1: Subir la imagen a Fal.ai para obtener una URL
    const uploadResponse = await fetch('https://fal.run/fal-ai/image-upload', {
      method: 'POST',
      headers: {
        'Authorization': 'Key ' + process.env.FAL_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image: 'data:image/jpeg;base64,' + imageBase64
      })
    });

    const uploadData = await uploadResponse.json();
    console.log('Upload response:', JSON.stringify(uploadData));

    const imageUrl = uploadData.url || uploadData.image_url;

    if (!imageUrl) {
      throw new Error('Could not upload image');
    }

    // Paso 2: Generar 2 imagenes usando IP-Adapter Face
    const prompt = 'Children coloring book page, cartoon caricature style, ' + childName + ' as the main character, ' + story + ', clean bold black outlines only, pure white background, no shading, no gradients, no color fills, wide spaces for coloring, vector line art, professional children book illustration, single page centered composition';

    const response = await fetch('https://fal.run/fal-ai/ip-adapter-face-id', {
      method: 'POST',
      headers: {
        'Authorization': 'Key ' + process.env.FAL_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: prompt,
        face_image_url: imageUrl,
        negative_prompt: 'color, shading, gradients, realistic, photograph, blurry, dark background',
        num_inference_steps: 30,
        num_images: 2,
        guidance_scale: 7.5,
        image_size: 'portrait_4_3'
      })
    });

    const data = await response.json();
    console.log('IP-Adapter response:', JSON.stringify(data));

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
