module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Pago confirmado — Magica Trama</title>
<link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;700;800&display=swap" rel="stylesheet"/>
<style>
  body { font-family: Nunito, sans-serif; background: #F7E8FF; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
  .box { background: white; border-radius: 24px; padding: 48px 40px; text-align: center; max-width: 480px; width: 90%; box-shadow: 0 8px 40px rgba(26,5,51,0.1); }
  .emoji { font-size: 4rem; margin-bottom: 16px; }
  h1 { font-family: Fredoka One, cursive; font-size: 2rem; color: #1A0533; margin-bottom: 12px; }
  p { color: #5A3E7A; line-height: 1.7; margin-bottom: 16px; }
  .status { background: #F7E8FF; border-radius: 12px; padding: 16px; margin: 20px 0; font-size: 0.9rem; color: #1A0533; }
  .btn { display: inline-block; background: linear-gradient(135deg, #FF6B6B, #FF4757); color: white; font-family: Nunito, sans-serif; font-weight: 800; font-size: 1rem; padding: 14px 32px; border-radius: 50px; text-decoration: none; margin-top: 8px; }
</style>
</head>
<body>
<div class="box">
  <div class="emoji" id="emoji">⏳</div>
  <h1 id="title">Confirmando tu pago...</h1>
  <p id="message">Estamos procesando tu pedido. Esto toma solo unos segundos.</p>
  <div class="status" id="status">Conectando...</div>
  <a href="/" class="btn" id="btn" style="display:none;">Volver al inicio</a>
</div>
<script>
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function updateUI(emoji, title, message, status) {
  document.getElementById('emoji').textContent = emoji;
  document.getElementById('title').textContent = title;
  document.getElementById('message').textContent = message;
  document.getElementById('status').textContent = status;
}

function showBtn() {
  document.getElementById('btn').style.display = 'inline-block';
}

function confirmPayment() {
  var paypalToken = getParam('token');
  var mpPaymentId = getParam('payment_id');
  var mpStatus = getParam('status');
  var orderId = paypalToken || mpPaymentId;
  var paymentSource = paypalToken ? 'paypal' : 'mercadopago';

  if (!orderId) {
    updateUI('😔', 'Algo salio mal', 'No encontramos tu orden. Contactanos a magicatrama@gmail.com', 'Error: orden no encontrada');
    showBtn();
    return;
  }

  if (paymentSource === 'mercadopago' && mpStatus === 'rejected') {
    updateUI('😔', 'Pago rechazado', 'Tu pago fue rechazado. Intenta con otro metodo de pago.', 'Estado: rechazado');
    showBtn();
    return;
  }

  var savedData = {};
  try { savedData = JSON.parse(localStorage.getItem('magicatrama_order') || '{}'); } catch(e) {}

  var source = paymentSource === 'mercadopago' ? 'Mercado Pago' : 'PayPal';
  document.getElementById('status').textContent = 'Confirmando pago con ' + source + '...';

  fetch('/api/confirm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      orderId: orderId,
      paymentSource: paymentSource,
      customerEmail: savedData.customerEmail || 'magicatrama@gmail.com',
      customerName: savedData.customerName || 'Cliente',
      childName: savedData.childName || 'el nino',
      story: savedData.story || 'aventura magica',
      packLabel: savedData.packLabel || 'Pack Explorador',
      amount: savedData.amount || '4.99'
    })
  })
  .then(function(r) { return r.json(); })
  .then(function(confirmData) {
    if (!confirmData.success) throw new Error('Error al confirmar pago');
    updateUI('🎨', 'Pago confirmado!', 'Estamos generando tu libro personalizado. Esto puede tomar 2-3 minutos...', 'Generando tu PDF...');

    return fetch('/api/generate-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        childName: savedData.childName || 'el nino',
        story: savedData.story || 'aventura magica',
        packLabel: savedData.packLabel || 'Pack Explorador',
        customerEmail: savedData.customerEmail || 'magicatrama@gmail.com',
        customerName: savedData.customerName || 'Cliente'
      })
    });
  })
  .then(function(r) { return r.json(); })
  .then(function(pdfData) {
    if (pdfData.success) {
      updateUI('📚', 'Tu libro esta en camino!', 'Hemos enviado tu PDF personalizado a tu correo. Revisa tu bandeja de entrada y spam.', 'Email enviado a ' + (savedData.customerEmail || 'tu correo'));
      localStorage.removeItem('magicatrama_order');
      localStorage.removeItem('magicatrama_images');
    } else {
      throw new Error('Error generando PDF');
    }
    showBtn();
  })
  .catch(function(error) {
    console.error(error);
    updateUI('😔', 'Hubo un problema', 'Tu pago fue procesado. Te enviaremos el libro manualmente. Escribenos a magicatrama@gmail.com con tu numero de orden.', 'Orden: ' + orderId);
    showBtn();
  });
}

confirmPayment();
</script>
</body>
</html>`);
}
