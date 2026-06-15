module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Política de Privacidad — Mágica Trama</title>
<link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet"/>
<style>
  body { font-family: Nunito, sans-serif; background: #F7E8FF; margin: 0; padding: 0; color: #2D1B4E; }
  .header { background: #1A0533; padding: 20px 40px; display: flex; align-items: center; justify-content: space-between; }
  .logo { font-family: Fredoka One, cursive; font-size: 1.5rem; color: white; text-decoration: none; display: flex; align-items: center; gap: 8px; }
  .container { max-width: 860px; margin: 0 auto; padding: 50px 30px; }
  .page-title { font-family: Fredoka One, cursive; font-size: 2.2rem; color: #1A0533; margin-bottom: 8px; }
  .subtitle { color: #5A3E7A; font-size: 0.9rem; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 2px solid rgba(26,5,51,0.1); }
  .section { background: white; border-radius: 16px; padding: 30px; margin-bottom: 20px; box-shadow: 0 2px 12px rgba(26,5,51,0.06); }
  .section h2 { font-family: Fredoka One, cursive; font-size: 1.2rem; color: #1A0533; margin-bottom: 14px; }
  .section p, .section li { font-size: 0.92rem; color: #5A3E7A; line-height: 1.8; margin-bottom: 10px; }
  .section ul { padding-left: 20px; }
  .section li { margin-bottom: 6px; }
  .highlight { background: #F7E8FF; border-left: 4px solid #4CC9F0; padding: 14px 18px; border-radius: 0 10px 10px 0; margin: 16px 0; font-size: 0.9rem; color: #1A0533; font-weight: 700; }
  .consent-box { background: #1A0533; border-radius: 16px; padding: 24px; margin: 30px 0; text-align: center; }
  .consent-box p { color: white; font-size: 0.95rem; line-height: 1.7; margin: 0; }
  .consent-box strong { color: #FFD166; }
  .footer-doc { text-align: center; padding: 30px; color: #9B8AAD; font-size: 0.82rem; }
</style>
</head>
<body>
<div class="header">
  <a href="/" class="logo">✦ Mágica Trama</a>
  <a href="/" style="color:#4CC9F0;font-weight:700;text-decoration:none;font-size:0.9rem;">← Volver al inicio</a>
</div>
<div class="container">
  <div class="page-title">Política de Privacidad</div>
  <div class="subtitle">Última actualización: Junio 2025 — Tu privacidad y la de tu familia son nuestra prioridad.</div>

  <div class="consent-box">
    <p><strong>Cláusula de Consentimiento:</strong> Al utilizar la Plataforma de Mágica Trama y cargar imágenes o información personal, el Usuario otorga su consentimiento expreso, libre e informado para el tratamiento de sus datos conforme a esta Política de Privacidad.</p>
  </div>

  <div class="section">
    <h2>1. Responsable del Tratamiento de Datos</h2>
    <p>Mágica Trama es responsable del tratamiento de los datos personales proporcionados a través de la Plataforma. Para cualquier consulta relacionada con tu privacidad, contáctanos en: <strong>magicatrama@gmail.com</strong></p>
  </div>

  <div class="section">
    <h2>2. Datos que Recopilamos</h2>
    <p>Para prestar el servicio, recopilamos únicamente la información estrictamente necesaria:</p>
    <ul>
      <li><strong>Correo electrónico:</strong> Para enviarte el producto digital y comunicaciones relacionadas con tu pedido.</li>
      <li><strong>Nombre del niño o niña:</strong> Para personalizar el libro de colorear.</li>
      <li><strong>Descripción o temática:</strong> Para generar el contenido visual personalizado.</li>
      <li><strong>Fotografía:</strong> Utilizada exclusivamente para el proceso de generación del libro. Ver sección 3.</li>
      <li><strong>Datos de pago:</strong> Procesados directamente por PayPal. Mágica Trama no almacena datos de tarjetas de crédito ni información financiera.</li>
    </ul>
  </div>

  <div class="section">
    <h2>3. Tratamiento de Fotografías e Imágenes</h2>
    <div class="highlight">Tu foto y la de tu hijo/a son tratadas con el máximo nivel de privacidad y seguridad.</div>
    <ul>
      <li><strong>La fotografía NO se almacena</strong> en ningún servidor propio de Mágica Trama.</li>
      <li><strong>La fotografía NO se comparte</strong> con terceros, anunciantes ni socios comerciales.</li>
      <li>La imagen se procesa en tiempo real únicamente para la generación del libro y es descartada inmediatamente después.</li>
      <li>El producto final (PDF) se envía directamente al correo del cliente y no queda almacenado de forma permanente.</li>
      <li>Las imágenes generadas por IA son de uso exclusivo del comprador.</li>
    </ul>
    <div class="highlight">Al subir una fotografía en nuestra Plataforma, el Usuario declara tener autorización legal para usar dicha imagen y acepta su uso temporal para la generación del producto digital.</div>
  </div>

  <div class="section">
    <h2>4. Finalidad del Tratamiento de Datos</h2>
    <p>Los datos recopilados se utilizan exclusivamente para:</p>
    <ul>
      <li>Generar el libro de colorear personalizado solicitado.</li>
      <li>Enviar el producto digital al correo electrónico proporcionado.</li>
      <li>Procesar y confirmar el pago realizado.</li>
      <li>Responder consultas o reclamos del Cliente.</li>
      <li>Mejorar la calidad del servicio de forma agregada y anónima.</li>
    </ul>
    <p>Mágica Trama NO utiliza los datos para publicidad dirigida, perfilamiento de usuarios ni venta de datos a terceros.</p>
  </div>

  <div class="section">
    <h2>5. Compartición de Datos con Terceros</h2>
    <p>Para prestar el servicio, trabajamos con los siguientes proveedores tecnológicos de confianza:</p>
    <ul>
      <li><strong>PayPal:</strong> Procesamiento de pagos. Sujeto a la política de privacidad de PayPal.</li>
      <li><strong>Fal.ai:</strong> Generación de imágenes mediante inteligencia artificial.</li>
      <li><strong>Vercel:</strong> Infraestructura de hosting y servidores.</li>
      <li><strong>Google (Gmail):</strong> Envío de correos electrónicos con el producto final.</li>
    </ul>
    <p>Ninguno de estos proveedores tiene autorización para usar los datos del Usuario para fines distintos a los estrictamente necesarios para prestar el servicio.</p>
  </div>

  <div class="section">
    <h2>6. Conservación de Datos</h2>
    <ul>
      <li><strong>Fotografías:</strong> No se almacenan. Se procesan en tiempo real y se descartan inmediatamente.</li>
      <li><strong>Correo electrónico:</strong> Conservado únicamente para el envío del producto y soporte post-venta.</li>
      <li><strong>Datos de la orden:</strong> Conservados por el período legalmente requerido para fines contables y fiscales.</li>
    </ul>
  </div>

  <div class="section">
    <h2>7. Derechos del Usuario</h2>
    <p>El Usuario tiene derecho a:</p>
    <ul>
      <li><strong>Acceso:</strong> Solicitar información sobre los datos que tenemos sobre ti.</li>
      <li><strong>Rectificación:</strong> Corregir datos incorrectos o incompletos.</li>
      <li><strong>Eliminación:</strong> Solicitar la eliminación de tus datos personales.</li>
      <li><strong>Oposición:</strong> Oponerte al tratamiento de tus datos en cualquier momento.</li>
      <li><strong>Portabilidad:</strong> Recibir tus datos en formato estructurado.</li>
    </ul>
    <p>Para ejercer cualquiera de estos derechos, contáctanos en <strong>magicatrama@gmail.com</strong> con el asunto "Privacidad de Datos".</p>
  </div>

  <div class="section">
    <h2>8. Seguridad de los Datos</h2>
    <p>Implementamos medidas técnicas y organizativas para proteger tus datos:</p>
    <ul>
      <li>Transmisión de datos cifrada mediante protocolo HTTPS/SSL.</li>
      <li>Acceso restringido a datos personales únicamente al personal autorizado.</li>
      <li>Proveedores de tecnología certificados con altos estándares de seguridad.</li>
      <li>No almacenamiento de fotografías ni datos sensibles más allá del tiempo necesario.</li>
    </ul>
  </div>

  <div class="section">
    <h2>9. Cookies y Tecnologías de Seguimiento</h2>
    <p>La Plataforma puede utilizar tecnologías de almacenamiento local (localStorage) únicamente para mantener temporalmente los datos de tu pedido durante el proceso de compra. Estos datos se eliminan automáticamente una vez completada la transacción.</p>
    <p>No utilizamos cookies de seguimiento, publicidad comportamental ni herramientas de análisis invasivas.</p>
  </div>

  <div class="section">
    <h2>10. Cambios a esta Política</h2>
    <p>Mágica Trama puede actualizar esta Política de Privacidad periódicamente. Notificaremos cambios significativos a través de la Plataforma. El uso continuado del servicio implica aceptación de la política vigente.</p>
  </div>

</div>
<div class="footer-doc">
  <p>© 2025 Mágica Trama. Todos los derechos reservados.</p>
  <p>magicatrama@gmail.com</p>
</div>
</body>
</html>`);
}
