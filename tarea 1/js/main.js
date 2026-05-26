// js/main.js
import { handleLinkClick, initRouter } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
  // Delegar clics en enlaces con data-link
  document.body.addEventListener('click', handleLinkClick);
  
  // Inicializar el router (hash mode)
  initRouter();
});