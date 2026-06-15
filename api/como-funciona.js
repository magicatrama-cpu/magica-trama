module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Cómo Funciona — Mágica Trama</title>
<link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet"/>
<style>
  body { font-family: Nunito, sans-serif; background: #F7E8FF; margin: 0; padding: 0; color: #2D1B4E; }
  .header { background: #1A0533; padding: 20px 40px; display: flex; align-items: center; justify-content: space-between; }
  .logo { font-family: Fredoka One, cursive; font-size: 1.5rem; color: white; text-decoration: none; display: flex; align-items: center; gap: 8px; }
  .container { max-width: 860px; margin: 0 auto; padding: 50px 30px; }
  .page-title { font-family: Fredoka One, cursive; font-size: 2.2rem; color: #1A0533; margin-bottom: 8px; }
  .subtitle { color: #5A3E7A; font-size: 1rem; margin-bottom: 50px; line-height: 1.7; }
  .step { background: white; border-radius: 20px; padding: 34px; margin-bottom: 24px; box-shadow: 0 2px 12px rgba(26,5,51,0.06); display: flex; gap: 24px; align-items: flex-start; }
  .step-num { background: #1A0533; color: white; font-family: Fredoka One, cursive; font-size: 1.5rem; width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .step-content h2 { font-family: Fredoka One, cursive; font-size: 1.3rem; color: #1A0533; margin-bottom: 10px; }
  .step-content p { font-size: 0.92rem; color: #5A3E7A; line-height: 1.8; margin-bottom: 8px; }
  .step-content ul { padding-left: 18px; }
  .step-content li { font-size: 0.9rem; color: #5A3E7A; line-height: 1.8; margin-bottom: 4px; }
  .tip { background: #F7E8FF; border-left: 4px solid #FFD166; padding: 12px 16px; border-radius: 0 10px 10px 0; margin-top: 12px; font-size: 0.88rem; color: #1A0533; }
  .tip strong { color: #FF6B6B; }
  .faq { background: white; border-radius: 16px; padding: 30px; margin-top: 40px; box-shadow: 0 2px 12px rgba(26,5,51,0.06); }
  .faq h2 { font-family: Fredoka One, cursive; font-size: 1.5rem; color: #1A0533; margin-bottom: 24px; }
  .faq-item { border-bottom: 1px solid rgba(26,5,51,0.08); padding: 16px 0; }
  .faq-item:last-child { border-bottom: none; }
  .faq-q { font-weight: 800; color: #1A0533; font-size: 0.95rem; margin-bottom: 8px; }
  .faq-a { color: #5A3E7A; font-size: 0.9rem; line-height: 1.7; }
  .cta-box { background: #1A0533; border-radius: 20px; padding: 40px; text-align: center; margin-top: 40px; }
  .cta-box h2 { font-family: Fredoka One, cursive; font-size: 1.8rem; color: white; margin-bottom: 12px; }
  .cta-box p { color: rgba(255,255,255,0.7); font-size: 0.95rem; margin-bottom: 24px; }
  .cta-btn { display: inline-block; background: linear-gradient(135deg, #FF6B6B, #FF4757); color: white; font-family: Nunito, sans-serif; font-weight: 800; font-size: 1.1rem; padding: 16px 40px; border-radius: 50px; text-decoration: none; box-shadow: 0 6px 20px rgba(255,107,107,0.4); }
  .footer-doc { text-align: center; padding: 30px; color: #9B8AAD; font-size: 0.82rem; }
</style>
</head>
<body>
<div class="header">
  <a href="/" class="logo">✦ Mágica Trama</a>
  <a href="/" style="color:#4CC9F0;font-weight:700;text-decoration:none;font-size:0.9rem;">← Volver al inicio</a>
</div>
<div class="container">
  <div class="page-title">Cómo Funciona</div>
  <div class="subtitle">Crear el libro de colorear personalizado de tu niño o niña es muy sencillo. Sigue estos pasos y en menos de 10 minutos tendrás un libro único listo para imprimir y colorear.</div>

  <div class="step">
    <div class="step-num">1</div>
    <div class="step-content">
      <h2>Sube la foto del protagonista 📸</h2>
      <p>En la página principal encontrarás el formulario de creación. El primer campo es para subir una fotografía de tu niño o niña.</p>
      <ul>
        <li>Usa una foto reciente donde se vea claramente el rostro.</li>
        <li>La foto debe estar bien iluminada y de frente.</li>
        <li>Formatos aceptados: JPG o PNG.</li>
        <li>Tamaño máximo: 10 MB.</li>
        <li>Puedes arrastrar la foto directamente al recuadro o hacer clic para seleccionarla.</li>
      </ul>
      <div class="tip"><strong>Consejo:</strong> Cuanto más clara y nítida sea la foto, mejor será el resultado del libro personalizado.</div>
    </div>
  </div>

  <div class="step">
    <div class="step-num">2</div>
    <div class="step-content">
      <h2>Escribe tu correo electrónico 📧</h2>
      <p>Ingresa tu correo electrónico en el campo correspondiente. A esta dirección te enviaremos:</p>
      <ul>
        <li>La confirmación de tu compra.</li>
        <li>El PDF con el libro completo personalizado.</li>
      </ul>
      <div class="tip"><strong>Importante:</strong> Verifica bien tu correo antes de continuar. Si hay un error, no podremos entregarte el libro.</div>
    </div>
  </div>

  <div class="step">
    <div class="step-num">3</div>
    <div class="step-content">
      <h2>Escribe el nombre del protagonista ✍️</h2>
      <p>Ingresa el nombre de tu niño o niña. Este nombre aparecerá en la portada del libro y será el nombre del personaje principal en todas las páginas.</p>
      <ul>
        <li>Puede ser el nombre real del niño o un apodo especial.</li>
        <li>El nombre aparecerá tal como lo escribas.</li>
      </ul>
    </div>
  </div>

  <div class="step">
    <div class="step-num">4</div>
    <div class="step-content">
      <h2>Cuéntanos su historia o temática favorita 🌟</h2>
      <p>Este es el campo más importante. Aquí puedes escribir libremente sobre los gustos, sueños o la historia que quieres que protagonice tu niño.</p>
      <ul>
        <li><strong>Ejemplos de lo que puedes escribir:</strong></li>
        <li>"Le encantan los dinosaurios y quiere ser astronauta"</li>
        <li>"Es una niña princesa que vive en un reino mágico con unicornios"</li>
        <li>"Le da miedo el primer día de colegio pero es muy valiente"</li>
        <li>"Ama los dinosaurios, los cohetes y tiene un perro llamado Max"</li>
        <li>"Va a ser hermano mayor y quiere conocer a su nuevo hermanito"</li>
      </ul>
      <div class="tip"><strong>Consejo:</strong> Cuanto más detalle incluyas, más personalizado y único será el libro. No hay límite de creatividad.</div>
    </div>
  </div>

  <div class="step">
    <div class="step-num">5</div>
    <div class="step-content">
      <h2>Genera tus 2 páginas de muestra gratis ✨</h2>
      <p>Haz clic en el botón "Generar 2 páginas de muestra gratis". Nuestra inteligencia artificial comenzará a crear las páginas personalizadas.</p>
      <ul>
        <li>El proceso toma entre 15 y 30 segundos.</li>
        <li>Verás una animación mientras la IA trabaja.</li>
        <li>Las 2 páginas de muestra se mostrarán con una marca de agua protectora.</li>
      </ul>
      <div class="tip"><strong>Mientras esperas:</strong> Elige el pack que más te guste — 5, 10 o 20 páginas.</div>
    </div>
  </div>

  <div class="step">
    <div class="step-num">6</div>
    <div class="step-content">
      <h2>Elige tu pack y completa el pago 💳</h2>
      <p>Selecciona el pack que prefieras y haz clic en el botón de compra. Serás redirigido a PayPal para completar el pago de forma segura.</p>
      <ul>
        <li><strong>Pack Aventura Corta — 5 páginas:</strong> Ideal para probar la experiencia.</li>
        <li><strong>Pack Explorador — 10 páginas:</strong> El más popular. Una aventura completa.</li>
        <li><strong>Pack Gran Saga — 20 páginas:</strong> La experiencia completa para los más aventureros.</li>
      </ul>
      <div class="tip"><strong>Seguridad:</strong> Todos los pagos se procesan a través de PayPal. Mágica Trama no almacena datos de tu tarjeta.</div>
    </div>
  </div>

  <div class="step">
    <div class="step-num">7</div>
    <div class="step-content">
      <h2>Recibe tu libro en el correo 📚</h2>
      <p>Una vez confirmado el pago, recibirás dos correos:</p>
      <ul>
        <li><strong>Correo 1 — Confirmación inmediata:</strong> Confirma que tu pago fue procesado exitosamente.</li>
        <li><strong>Correo 2 — Tu libro PDF:</strong> Llega en aproximadamente 3 a 5 minutos con el libro completo adjunto.</li>
      </ul>
      <ul>
        <li>El PDF está listo para imprimir en casa o en cualquier imprenta.</li>
        <li>Recomendamos imprimir en papel tamaño A4 o carta.</li>
        <li>Puedes imprimirlo tantas veces como quieras.</li>
      </ul>
      <div class="tip"><strong>Si no ves el correo:</strong> Revisa tu carpeta de spam o correo no deseado. También puedes escribirnos a magicatrama@gmail.com.</div>
    </div>
  </div>

  <div class="faq">
    <h2>Preguntas Frecuentes</h2>
    <div class="faq-item">
      <div class="faq-q">¿Cuánto tiempo tarda en llegar el libro?</div>
      <div class="faq-a">El correo de confirmación llega al instante. El PDF con el libro completo llega en aproximadamente 3 a 5 minutos después del pago.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">¿Se almacena la foto de mi hijo/a?</div>
      <div class="faq-a">No. La fotografía se usa únicamente en tiempo real para generar el libro y se descarta inmediatamente. No la guardamos en ningún servidor.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">¿Puedo imprimir el libro varias veces?</div>
      <div class="faq-a">Sí. El PDF que recibes es tuyo y puedes imprimirlo cuantas veces quieras para uso personal.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">¿El libro tiene colores o es solo para colorear?</div>
      <div class="faq-a">El libro es en blanco y negro con líneas limpias, diseñado específicamente para colorear. Las páginas tienen espacios amplios perfectos para usar crayones, lápices de color o marcadores.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">¿Qué pasa si no me llega el correo?</div>
      <div class="faq-a">Primero revisa tu carpeta de spam. Si después de 10 minutos no llega, escríbenos a magicatrama@gmail.com con el número de orden de PayPal y lo resolvemos de inmediato.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">¿Puedo pedir un reembolso?</div>
      <div class="faq-a">Debido a la naturaleza personalizada del producto digital, no aceptamos devoluciones una vez generado el libro. En caso de error técnico comprobado, ofrecemos regeneración gratuita o reembolso total.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">¿En qué idioma está el libro?</div>
      <div class="faq-a">Las imágenes son visuales y no contienen texto. La portada está en español.</div>
    </div>
  </div>

  <div class="cta-box">
    <h2>¿Listo para crear la aventura?</h2>
    <p>Sube la foto de tu niño o niña y empieza ahora mismo — las 2 primeras páginas son gratis.</p>
    <a href="/" class="cta-btn">✨ Crear mi libro ahora</a>
  </div>

</div>
<div class="footer-doc">
  <p>© 2025 Mágica Trama. Todos los derechos reservados.</p>
  <p>magicatrama@gmail.com</p>
</div>
</body>
</html>`);
}
