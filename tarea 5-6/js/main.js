// js/main.js
import { handleLinkClick, initRouter } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
  // Delegar clics en enlaces con data-link
  document.body.addEventListener('click', handleLinkClick);
  
  // Inicializar el router (hash mode)
  initRouter();
});

// Función para cerrar sesión (puedes llamarla desde un botón)
window.logout = function() {
  localStorage.removeItem('riwiflow_session');
  window.location.href = 'login.html';
};