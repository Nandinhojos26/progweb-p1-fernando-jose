
const aviso = document.getElementById('aviso');

export function mostrarAviso(mensagem, tipo = 'success') {
  aviso.textContent = mensagem;
  aviso.className = `alert alert-${tipo}`;
  aviso.classList.remove('d-none');
}

export function limparAviso() {
  aviso.textContent = '';
  aviso.className = 'alert d-none';
}
