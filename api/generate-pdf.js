const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');
const axios = require('axios');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { childName, story, packLabel, customerEmail, customerName } = req.body;

    const numPages = packLabel && packLabel.includes('Gran Saga') ? 20
                   : packLabel && packLabel.includes('Explorador') ? 10 : 5;

    console.log('Generating', numPages, 'pages for', childName);

    // Paso 1: Usar Claude para generar escenas unicas basadas en la historia del cliente
    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: 'Create ' + numPages + ' unique and creative scene descriptions for a children\'s coloring book. The main character is a child named ' + childName + '. The story theme is: ' + story + '. Each scene should be a specific moment in the story, completely based on the theme provided. Return ONLY a JSON array of strings, no other text. Example format: ["scene 1 description", "scene 2 description"]. Make each scene vivid, fun and child-appropriate. Each description should be 1-2 sentences maximum.'
        }]
      })
    });

    const claudeData = await claudeResponse.json();
    console.log('Claude response:', claudeData.content[0].text);

    let scenes = [];
    try {
      const cleanText = claudeData.content[0].text.replace(/```json|```/g, '').trim();
      scenes = JSON.parse(cleanText);
    } catch (e) {
      console.error('Error parsing Claude response:', e.message);
      // Fallback: usar la historia directamente
      scenes = Array.from({ length: numPages }, (_, i) => 'Scene ' + (i + 1) + ' of the story: ' + story);
    }

    console.log('Scenes generated:', scenes.length);

    // Paso 2: Generar imagenes con Fal.ai para cada escena
    const images = [];

    for (let i = 0; i < scenes.length; i++) {
      try {
        const prompt = 'Children coloring book page, ' + childName + ' as the main character, ' + scenes[i] + ', STRICT: clean bold black outlines ONLY, pure white background, absolutely NO color fills, NO shading, NO gradients, NO grey tones, black and white line art only, wide empty spaces for coloring, vector illustration style, professional children book illustration';

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
            num_images: 1,
            enable_safety_checker: true
          })
        });

        const data = await response.json();
        if (data.images && data.images[0]) {
          images.push(data.images[0].url);
          console.log('Generated page', i + 1);
        }
      } catch (err) {
        console.error('Error generating page', i + 1, err.message);
      }
    }

    console.log('Total images generated:', images.length);

    // Paso 3: Crear PDF
    const doc = new PDFDocument({ size: 'A4', margin: 0, autoFirstPage: false });
    const buffers = [];
    doc.on('data', chunk => buffers.push(chunk));

    // Portada
    doc.addPage();
    doc.rect(0, 0, doc.page.width, doc.page.height).fill('#F7E8FF');
    doc.fill('#1A0533').font('Helvetica-Bold').fontSize(36).text('Magica Trama', 0, 200, { align: 'center' });
    doc.fill('#FF6B6B').fontSize(24).text('La aventura de ' + childName, 0, 260, { align: 'center' });
    doc.fill('#5A3E7A').fontSize(14).text('Libro de colorear personalizado', 0, 310, { align: 'center' });
    doc.fill('#9B8AAD').fontSize(11).text('magicatrama@gmail.com', 0, 700, { align: 'center' });

    // Paginas con imagenes
    for (let i = 0; i < images.length; i++) {
      doc.addPage();
      try {
        const imgResponse = await axios.get(images[i], { responseType: 'arraybuffer' });
        const imgBuffer = Buffer.from(imgResponse.data);
        doc.image(imgBuffer, 40, 40, {
          width: doc.page.width - 80,
          height: doc.page.height - 80
        });
      } catch (err) {
        console.error('Error adding image', i, err.message);
        doc.fill('#9B8AAD').fontSize(14).text('Pagina ' + (i + 1), 0, 400, { align: 'center' });
      }
      doc.fill('#CCCCCC').fontSize(8).text('magicatrama.com  •  Pagina ' + (i + 1), 0, doc.page.height - 20, { align: 'center' });
    }

    doc.end();
    await new Promise((resolve) => doc.on('end', resolve));

    const pdfBuffer = Buffer.concat(buffers);
    console.log('PDF generated, size:', pdfBuffer.length);

    // Paso 4: Enviar email con PDF
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'magicatrama@gmail.com',
        pass: process.env.GMAIL_PASSWORD
      }
    });

    await transporter.sendMail({
      from: '"Magica Trama" <magicatrama@gmail.com>',
      to: customerEmail,
      subject: 'Aqui esta tu libro de colorear, ' + customerName + '!',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#F7E8FF;padding:40px;border-radius:20px;">
          <div style="text-align:center;margin-bottom:30px;">
            <h1 style="color:#1A0533;">✨ Magica Trama</h1>
          </div>
          <div style="background:white;border-radius:16px;padding:30px;">
            <h2 style="color:#1A0533;">Hola ${customerName}!</h2>
            <p style="color:#5A3E7A;line-height:1.7;">Adjunto encontraras el libro de colorear personalizado de <strong>${childName}</strong>.</p>
            <p style="color:#5A3E7A;line-height:1.7;">Puedes imprimirlo en casa o en cualquier imprenta local.</p>
            <p style="color:#5A3E7A;line-height:1.7;">Gracias por confiar en Magica Trama.</p>
          </div>
          <div style="text-align:center;margin-top:20px;">
            <p style="color:#9B8AAD;font-size:0.8rem;">magicatrama@gmail.com</p>
          </div>
        </div>
      `,
      attachments: [{
        filename: 'MagicaTrama-' + childName + '.pdf',
        content: pdfBuffer,
        contentType: 'application/pdf'
      }]
    });

    console.log('PDF email sent to:', customerEmail);
    return res.status(200).json({ success: true, pages: images.length });

  } catch (error) {
    console.error('Generate PDF error:', error.message);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};
