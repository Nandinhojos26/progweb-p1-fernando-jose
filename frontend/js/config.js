
const LOCAL = ['localhost', '127.0.0.1'].includes(
  window.location.hostname
);

export const API_BASE = LOCAL
  ? 'http://localhost:3000'
  : 'https://moral-cell-api.onrender.com';
