// js/main.js
import { navigateTo, handleLinkClick } from './router.js';

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  // Delegar clics en enlaces con data-link
  document.body.addEventListener('click', handleLinkClick);

  // Obtener ruta inicial y navegar
  const initialPath = window.location.pathname;
  navigateTo(initialPath, false);
});

// Manejar eventos popstate (botones atrás/adelante)
window.addEventListener('popstate', (event) => {
  const path = event.state?.path || window.location.pathname;
  navigateTo(path, false);
});//test