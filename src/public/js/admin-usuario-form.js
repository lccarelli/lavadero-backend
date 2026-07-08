const form = document.getElementById('usuario-form');
const contenedorErrores = document.getElementById('form-errores');

// Postea el alta por fetch a la API (reusa el controller de auth), igual que el form de producto.
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  contenedorErrores.innerHTML = '';

  const datos = {
    nombre: document.getElementById('nombre').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  };

  const res = await fetch('/api/auth/registro-admin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });

  if (res.ok) {
    window.location.href = '/admin/dashboard';
    return;
  }

  let errores = ['No se pudo crear el administrador'];
  try {
    const data = await res.json();
    if (Array.isArray(data.errores)) errores = data.errores;
    else if (data.error) errores = [data.error];
  } catch { /* respuesta sin JSON */ }
  contenedorErrores.innerHTML = errores.map((msg) => `<p class="form-error">${msg}</p>`).join('');
});
