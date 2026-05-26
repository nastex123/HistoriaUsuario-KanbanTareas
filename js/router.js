// js/router.js
import { dashboardView } from './views/dashboard.js';
import { projectsView } from './views/projects.js';
import { teamView } from './views/team.js';
import { reportsView } from './views/reports.js';
import { settingsView } from './views/settings.js';

// Mapa de rutas
const routes = {
  '/dashboard': dashboardView,
  '/projects': projectsView,
  '/team': teamView,
  '/reports': reportsView,
  '/settings': settingsView,
};

// Vista por defecto
const defaultRoute = '/dashboard';

// Obtener la vista según la ruta
function getViewForPath(path) {
  const route = routes[path];
  if (route) return route();
  // Si no existe, intentar ruta base (ej. /projects/extra -> /projects)
  const basePath = path.split('/')[1];
  const baseRoute = `/${basePath}`;
  if (routes[baseRoute]) return routes[baseRoute]();
  return routes[defaultRoute]();
}

// Función principal de navegación
export function navigateTo(path, addToHistory = true) {
  const viewContainer = document.getElementById('app-view');
  if (!viewContainer) return;

  const content = getViewForPath(path);
  viewContainer.innerHTML = content;

  if (addToHistory) {
    window.history.pushState({ path }, '', path);
  }

  // Actualizar clase activa en el menú lateral
  setActiveLink(path);
}

// Resaltar el enlace activo
function setActiveLink(path) {
  const links = document.querySelectorAll('nav a[data-link]');
  links.forEach(link => {
    const linkPath = link.getAttribute('href');
    const currentBase = path.replace(/^\//, '') || 'dashboard';
    const linkBase = linkPath.replace(/^\//, '') || 'dashboard';
    if (currentBase === linkBase) {
      link.classList.add('bg-primary-fixed', 'text-on-primary-fixed-variant', 'rounded-lg', 'scale-[0.98]');
      link.classList.remove('text-secondary', 'hover:bg-primary-container/10');
    } else {
      link.classList.remove('bg-primary-fixed', 'text-on-primary-fixed-variant', 'rounded-lg', 'scale-[0.98]');
      link.classList.add('text-secondary', 'hover:bg-primary-container/10');
    }
  });
}

// Manejar clics en enlaces
export function handleLinkClick(event) {
  const link = event.target.closest('a[data-link]');
  if (!link) return;
  event.preventDefault();
  const href = link.getAttribute('href');
  if (href) navigateTo(href);
}