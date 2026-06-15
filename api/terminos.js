module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Términos y Condiciones — Mágica Trama</title>
<link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet"/>
<style>
  body { font-family: Nunito, sans-serif; background: #F7E8FF; margin: 0; padding: 0; color: #2D1B4E; }
  .header { background: #1A0533; padding: 20px 40px; display: flex; align-items: center; justify-content: space-between; }
  .logo { font-family: Fredoka One, cursive; font-size: 1.5rem; color: white; text-decoration: none; display: flex; align-items: center; gap: 8px; }
  .container { max-width: 860px; margin: 0 auto; padding: 50px 30px; }
  .page-title { font-family: Fredoka One, cursive; font-size: 2.2rem; color: #1A0533; margin-bottom: 8px; }
  .subtitle { color: #5A3E7A; font-size: 0.9rem; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 2px solid rgba(26,5,51,0.1); }
  .section { background: white; border-radius: 16px; padding: 30px; margin-bottom: 20px; box-shadow: 0 2px 12px rgba(26,5,51,0.06); }
  .section h2 { font-family: Fredoka One, cursive; font-size: 1.2rem; color: #1A0533; margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
  .section p, .section li { font-size: 0.92rem; color: #5A3E7A; line-height: 1.8; margin-bottom: 10px; }
  .section ul { padding-left: 20px; }
  .section li { margin-bottom: 6px; }
  .highlight { background: #F7E8FF; border-left: 4px solid #FF6B6B; padding: 14px 18px; border-radius: 0 10px 10px 0; margin: 16px 0; font-size: 0.9rem; color: #1A0533; font-weight: 700; }
  .footer-doc { text-align: center; padding: 30px; color: #9B8AAD; font-size: 0.82rem; }
  a.back { display: inline-flex; align-items: center; gap: 6px; color: #FF6B6B; font-weight: 700; text-decoration: none; font-size: 0.9rem; }
</style>
</head>
<body>
<div class="header">
  <a href="/" class="logo">✦ Mágica Trama</a>
  <a href="/" class="back" style="color:#4CC9F0;">← Volver al inicio</a>
</div>
<div class="container">
  <div class="page-title">Términos y Condiciones</div>
  <div class="subtitle">Última actualización: Junio 2025 — Al usar nuestros servicios, aceptas estos términos en su totalidad.</div>

  <div class="section">
    <h2>1. Aceptación de los Términos</h2>
    <p>Al acceder y utilizar el sitio web de Mágica Trama (en adelante "la Plataforma"), sus servicios, herramientas de inteligencia artificial y productos digitales, usted (en adelante "el Usuario" o "el Cliente") acepta plena e incondicionalmente estos Términos y Condiciones, así como nuestra Política de Privacidad.</p>
    <p>Si no está de acuerdo con alguno de estos términos, le rogamos que se abstenga de utilizar la Plataforma. El uso continuado de la misma constituye aceptación tácita de cualquier modificación futura.</p>
    <div class="highlight">El uso de la plataforma implica la aceptación automática e irrevocable de estos Términos y Condiciones.</div>
  </div>

  <div class="section">
    <h2>2. Descripción del Servicio</h2>
    <p>Mágica Trama es una plataforma digital que ofrece la creación de libros de colorear personalizados mediante tecnología de inteligencia artificial. El servicio incluye:</p>
    <ul>
      <li>Generación de imágenes de arte lineal mediante IA basadas en la información proporcionada por el Usuario.</li>
      <li>Compilación de las imágenes generadas en formato PDF descargable.</li>
      <li>Entrega del producto digital vía correo electrónico.</li>
      <li>Procesamiento seguro de pagos a través de PayPal.</li>
    </ul>
    <p>Mágica Trama se reserva el derecho de modificar, suspender o discontinuar cualquier aspecto del servicio en cualquier momento y sin previo aviso.</p>
  </div>

  <div class="section">
    <h2>3. Uso de Inteligencia Artificial</h2>
    <p>La Plataforma utiliza herramientas de inteligencia artificial de terceros para la generación de contenido visual. El Usuario reconoce y acepta que:</p>
    <ul>
      <li>Los resultados generados por IA pueden variar y no garantizamos que el producto final sea idéntico a las muestras previas.</li>
      <li>La IA genera contenido basado en descripciones textuales proporcionadas por el Usuario. Mágica Trama no es responsable de resultados que no satisfagan expectativas subjetivas.</li>
      <li>Las imágenes generadas son de uso exclusivo del comprador para fines personales y no comerciales.</li>
      <li>Mágica Trama no garantiza que las imágenes generadas sean 100% consistentes con la descripción física del menor.</li>
    </ul>
  </div>

  <div class="section">
    <h2>4. Limitación de Responsabilidad</h2>
    <div class="highlight">Mágica Trama, sus propietarios, empleados, socios, proveedores y afiliados quedan expresamente exonerados de toda responsabilidad por:</div>
    <ul>
      <li>Daños directos, indirectos, incidentales, especiales o consecuentes derivados del uso o imposibilidad de uso del servicio.</li>
      <li>Pérdida de datos, interrupciones del servicio o fallos técnicos de terceros proveedores (PayPal, Fal.ai, Vercel, Google).</li>
      <li>El contenido generado por la IA que pudiera considerarse inapropiado, impreciso o no satisfactorio.</li>
      <li>Uso inadecuado del producto digital por parte del Usuario o terceros.</li>
      <li>Cualquier daño psicológico, emocional o de otra índole relacionado con el contenido del libro.</li>
      <li>Retrasos en la entrega del producto digital causados por factores externos a nuestro control.</li>
    </ul>
    <p>En ningún caso la responsabilidad total de Mágica Trama superará el monto pagado por el Usuario en la transacción específica que dio origen al reclamo.</p>
  </div>

  <div class="section">
    <h2>5. Política de Pagos y Reembolsos</h2>
    <p>Todos los pagos se procesan de forma segura a través de PayPal. Al realizar una compra, el Usuario acepta las condiciones de pago de PayPal aplicables en su región.</p>
    <ul>
      <li><strong>Productos digitales:</strong> Debido a la naturaleza personalizada e inmaterial del producto, no se aceptan devoluciones una vez que el PDF ha sido generado y enviado al correo del cliente.</li>
      <li><strong>Error técnico comprobado:</strong> En caso de falla técnica documentada que impida la entrega del producto, Mágica Trama ofrecerá una regeneración gratuita o reembolso total a discreción exclusiva de la empresa.</li>
      <li><strong>Cargo no autorizado:</strong> Si el Usuario detecta un cargo no autorizado, debe contactarnos en magicatrama@gmail.com dentro de las 48 horas siguientes a la transacción.</li>
    </ul>
  </div>

  <div class="section">
    <h2>6. Propiedad Intelectual</h2>
    <p>El Usuario retiene los derechos sobre las fotografías originales que carga en la Plataforma. Las imágenes generadas por la IA son de uso personal del comprador.</p>
    <ul>
      <li>El Usuario no podrá reproducir, distribuir, vender o explotar comercialmente el contenido generado por Mágica Trama sin autorización expresa por escrito.</li>
      <li>El nombre, logotipo, diseño y marca "Mágica Trama" son propiedad exclusiva de sus titulares y están protegidos por las leyes de propiedad intelectual aplicables.</li>
      <li>El User Generated Content (fotos, descripciones) es responsabilidad exclusiva del Usuario. Mágica Trama no asume responsabilidad por contenido ilegal, ofensivo o que viole derechos de terceros.</li>
    </ul>
  </div>

  <div class="section">
    <h2>7. Uso Apropiado y Conducta del Usuario</h2>
    <p>El Usuario se compromete a utilizar la Plataforma únicamente para fines lícitos y apropiados. Queda estrictamente prohibido:</p>
    <ul>
      <li>Subir imágenes de menores sin ser su tutor legal o sin contar con el consentimiento expreso de sus padres o tutores.</li>
      <li>Subir contenido de naturaleza sexual, violenta, discriminatoria o que viole los derechos de terceros.</li>
      <li>Intentar vulnerar la seguridad de la Plataforma o acceder a datos de otros usuarios.</li>
      <li>Usar la Plataforma para generar contenido con fines comerciales sin autorización.</li>
      <li>Realizar ingeniería inversa, copiar o reproducir el sistema tecnológico de la Plataforma.</li>
    </ul>
    <p>El incumplimiento de estas normas faculta a Mágica Trama a suspender el acceso del Usuario sin previo aviso y sin derecho a reembolso.</p>
  </div>

  <div class="section">
    <h2>8. Menores de Edad</h2>
    <p>La Plataforma está diseñada para ser utilizada por adultos mayores de 18 años en representación de menores de edad. Al utilizar el servicio, el Usuario declara ser mayor de edad y contar con la autoridad legal para proporcionar imágenes e información de los menores incluidos en el producto.</p>
    <div class="highlight">Mágica Trama no recopila datos de menores de edad directamente. Toda la información es proporcionada por el adulto responsable.</div>
  </div>

  <div class="section">
    <h2>9. Modificaciones a los Términos</h2>
    <p>Mágica Trama se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en la Plataforma. El uso continuado del servicio tras la publicación de cambios constituye aceptación de los nuevos términos.</p>
  </div>

  <div class="section">
    <h2>10. Ley Aplicable y Jurisdicción</h2>
    <p>Estos Términos y Condiciones se rigen por las leyes aplicables en la jurisdicción donde opera Mágica Trama. Cualquier disputa derivada del uso de la Plataforma será sometida a la jurisdicción exclusiva de los tribunales competentes de dicha jurisdicción.</p>
    <p>Para cualquier consulta legal, contáctenos en: <strong>magicatrama@gmail.com</strong></p>
  </div>

</div>
<div class="footer-doc">
  <p>© 2025 Mágica Trama. Todos los derechos reservados.</p>
  <p>magicatrama@gmail.com</p>
</div>
</body>
</html>`);
}
