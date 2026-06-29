const form = document.getElementById('producto-form');
const contenedorErrores = document.getElementById('form-errores');

const inputImagen = document.getElementById('imagen');
const textoUploader = document.querySelector('.uploader__text');
inputImagen.addEventListener('change', () => {
  textoUploader.textContent = inputImagen.files.length ? inputImagen.files[0].name : 'Click para subir';
});

// Lavados llevan duración (no stock); Accesorios al revés.
const selectCategoria = document.getElementById('categoria_id');
const inputDuracion = document.getElementById('duracion');
const inputStock = document.getElementById('stock');
function aplicarRestriccionCategoria() {
  const nombre = selectCategoria.options[selectCategoria.selectedIndex]?.text.trim();
  inputStock.disabled = nombre === 'Lavados';
  inputDuracion.disabled = nombre === 'Accesorios';
}
selectCategoria.addEventListener('change', aplicarRestriccionCategoria);
aplicarRestriccionCategoria();

// logica botón activar desactivar
const btnToggle = document.getElementById('btn-toggle-activo');
if (btnToggle) {
  btnToggle.addEventListener('click', async () => {
    const res = await fetch(`/api/productos/${form.dataset.id}/${btnToggle.dataset.accion}`, { method: 'PATCH' });
    if (res.ok) window.location.href = '/admin/dashboard';
  });
}

//add event listener para pisar el post de edición por PUT
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  contenedorErrores.innerHTML = '';

  const id = form.dataset.id;
  const res = await fetch(id ? `/api/productos/${id}` : '/api/productos', {
    method: id ? 'PUT' : 'POST',
    body: new FormData(form),
  });

  if (res.ok) {
    window.location.href = '/admin/dashboard';
    return;
  }

  let errores = ['No se pudo guardar el producto'];
  try {
    const data = await res.json();
    if (Array.isArray(data.errores)) errores = data.errores;
    else if (data.error) errores = [data.error];
  } catch { /* respuesta sin JSON */ }
  contenedorErrores.innerHTML = errores.map((msg) => `<p class="form-error">${msg}</p>`).join('');
});
