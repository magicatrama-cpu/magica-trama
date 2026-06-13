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

    // Generar imagenes con Fal.ai
    const scenarios = [
      'exploring a magical forest with fairy creatures and glowing mushrooms',
      'riding a friendly dragon through clouds and rainbows',
      'discovering a treasure chest on a pirate ship at sea',
      'playing with friendly dinosaurs in a prehistoric jungle',
      'flying a rocket ship through space with planets and stars',
      'swimming with friendly colorful fish and sea creatures underwater',
      'building a magical castle with wizard helpers and fairy towers',
      'racing on a rainbow with unicorns through the sky',
      'going on safari with friendly giraffes lions and elephants',
      'cooking magical potions in a fantasy kitchen with talking animals',
      'climbing the highest mountain with penguin and bear friends',
      'sailing on a boat through magical glowing waters at night',
      'dancing with forest animals in a sunny clearing with flowers',
      'exploring ancient ruins with a treasure map and animal companions',
      'playing music that makes giant flowers bloom and butterflies appear',
      'teaching little baby dragons to fly over a fantasy kingdom',
      'finding a secret garden full of talking flowers and tiny fairies',
      'meeting friendly giants who live in a land of giant mushrooms',
      'surfing giant waves with dolphin and whale friends',
      'celebrating a birthday party with all magical animal friends'
    ];

    const images = [];
    const pagesToGenerate = Math.min(numPages, scenarios.length);

    for (let i = 0; i < pagesToGenerate; i++) {
      try {
        const prompt = 'Coloring book page for children, the main character is a child named ' + childName + ', ' + scenarios[i] + ', clean bold black outlines only, pure white background, no shading, no gradients, no color fills, wide spaces for coloring, vector line art, professional children illustration, single page centered composition, ' + story;

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

    // Crear PDF
    const doc = new PDFDocument({ size: 'A4', margin: 40 });
    const buffers = [];

    doc.on('data', chunk => buffers.push(chunk));

    await new Promise((resolve, reject) => {
      doc.on('end', resolve);
      doc.on('error', reject);

      // Portada
      doc.rect(0, 0, doc.page.width, doc.page.height).fill('#F7E8FF');
      doc.fill('#1A0533')
         .font('Helvetica-Bold')
         .fontSize(36)
         .text('Magica Trama', 0, 200, { align: 'center' });
      doc.fill('#FF6B6B')
         .fontSize(24)
         .text('La aventura de ' + childName, 0, 260, { align: 'center' });
      doc.fill('#5A3E7A')
         .fontSize(14)
         .text('Libro de colorear personalizado', 0, 310, { align: 'center' });
      doc.fill('#9B8AAD')
         .fontSize(11)
         .text('magicatrama@gmail.com', 0, 700, { align: 'center' });

      // Paginas con imagenes
      const addPages = async () => {
        for (let i = 0; i < images.length; i++) {
          doc.addPage();
          doc.rect(0, 0, doc.page.width, doc.page.height).fill('#FFFFFF');

          try {
            const imgResponse = await axios.get(images[i], { responseType: 'arraybuffer' });
            const imgBuffer = Buffer.from(imgResponse.data);
            doc.image(imgBuffer, 40, 60, { 
              width: doc.page.width - 80,
              height: doc.page.height - 140
            });
          } catch (err) {
            console.error('Error adding image', i, err.message);
            doc.fill('#9B8AAD').fontSize(14).text('Pagina ' + (i + 1), 40, 400, { align: 'center' });
          }

          // Numero de pagina y marca de agua discreta
          doc.fill('#CCCCCC').fontSize(8).text('magicatrama.com  •  Pagina ' + (i + 1), 0, doc.page.height - 30, { align: 'center' });
        }

        doc.end();
      };

      addPages().catch(reject);
    });

    const pdfBuffer = Buffer.concat(buffers);
    console.log('PDF generated, size:', pdfBuffer.length);

    // Enviar email con PDF adjunto
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
}
