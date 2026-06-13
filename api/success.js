module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Pago confirmado — Magica Trama</title>
<link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;700;800&display=swap" rel="stylesheet"/>
<style>
  body { font-family: 'Nunito', sans-serif; background: #F7E8FF; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
  .box { background: white; border-radius: 24px; padding: 48px 40px; text-align: center; max-width: 480px; width: 90%; box-shadow: 0 8px 40px rgba(26,5,51,0.1); }
  .emoji { font-size: 4rem; margin-bottom: 16px; }
  h1 { font-family: 'Fredoka One', cursive; font-size: 2rem; color: #1A0533; margin-bottom: 12px; }
  p { color: #5A3E7A; line-height: 1.7; margin-bottom: 16px; }
  .status { background: #F7E8FF; border-radius: 12px; padding: 16px; margin: 20px 0; font-size: 0.9rem; color: #1A0533; }
  .btn { display: inline-block; background: linear-gradient(135deg, #FF6B6B, #FF4757); color: white; font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 1rem; padding: 14px 32px; border-radius: 50px; text-decoration: none; margin-top: 8px; }
</style>
</head>
<body>
<div class="box">
  <div class="emoji" id="emoji">⏳</div>
  <h1 id="title">Confirmando tu pago...</h1>
  <p id="message">Estamos procesando tu pedido. Esto toma solo unos segundos.</p>
  <div class="status" id="status">Conectando con PayPal...</div>
  <a href="/" class="btn" id="btn" style="display:none;">Volver al inicio</a>
</div>
<script>
  async function confirmPayment() {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('token');
    if (!orderId) {
      document.getElementById('emoji').textContent = '😔';
      document.getElementById('title').textContent = 'Algo salio mal';
      document.getElementById('message').textContent = 'No encontramos tu orden. Contactanos a magicatrama@gmail.com';
      document.getElementById('status').textContent = 'Error: orden no encontrada';
      document.getElementById('btn').style.display = 'inline-block';
      return;
    }
    const savedData = JSON.parse(localStorage.getItem('magicatrama_order') || '{}');
    try {
      document.getElementById('status').textContent = 'Confirmando pago con PayPal...';
      const response = await fetch('/api/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: orderId,
          customerEmail: savedData.customerEmail || 'cliente@email.com',
          customerName: savedData.customerName || 'Cliente',
          childName: savedData.childName || 'el nino',
          story: savedData.story || '',
          packLabel: savedData.packLabel || 'Pack Explorador',
          amount: savedData.amount || '7.99'
        })
      });
      const data = await response.json();
      if (data.success) {
        document.getElementById('emoji').textContent = '🎉';
        document.getElementById('title').textContent = 'Pago confirmado!';
        document.getElementById('message').textContent = 'Gracias por tu compra. En unos minutos recibiras un email con tu libro personalizado.';
        document.getElementById('status').textContent = 'Email enviado a ' + (savedData.customerEmail || 'tu correo');
        localStorage.removeItem('magicatrama_order');
      } else {
        throw new Error(data.error || 'Error al confirmar');
      }
    } catch (error) {
      document.getElementById('emoji').textContent = '😔';
      document.getElementById('title').textContent = 'Hubo un problema';
      document.getElementById('message').textContent = 'Tu pago fue procesado pero hubo un error. Contactanos a magicatrama@gmail.com con tu numero de orden.';
      document.getElementById('status').textContent = 'Orden: ' + orderId;
    }
    document.getElementById('btn').style.display = 'inline-block';
  }
  confirmPayment();
</script>
</body>
</html>`);
}
