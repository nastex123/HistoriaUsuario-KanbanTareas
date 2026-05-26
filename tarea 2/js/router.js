// js/router.js - Modo hash
import { dashboardView } from './views/dashboard.js';
import { projectsView } from './views/projects.js';
import { teamView } from './views/team.js';
import { reportsView } from './views/reports.js';
import { settingsView } from './views/settings.js';

// Mapa de rutas
const routes = {
  'dashboard': dashboardView,
  'projects': projectsView,
  'team': teamView,
  'reports': reportsView,
  'settings': settingsView,
};

// Vista por defecto
const defaultRoute = 'dashboard';

// Obtener la ruta actual desde el hash
function getCurrentRoute() {
  let hash = window.location.hash.slice(1); // Elimina el #
  // Si el hash está vacío o es solo '/', usar defaultRoute
  if (!hash || hash === '/') return defaultRoute;
  // Eliminar cualquier slash inicial
  hash = hash.replace(/^\//, '');
  return routes[hash] ? hash : defaultRoute;
}

// Obtener el contenido de la vista según la ruta
function getViewForRoute(route) {
  const view = routes[route];
  return view ? view() : routesdefaultRoute;
}

// Función principal de navegación
export function navigateTo(route, addToHistory = true) {
  // Asegurar que la ruta no tenga slash inicial
  const cleanRoute = route.replace(/^\//, '');
  if (!routes[cleanRoute]) return;

  if (addToHistory) {
    window.location.hash = cleanRoute;
  }

  renderView(cleanRoute);
  setActiveLink(cleanRoute);
}

// Renderizar la vista en el contenedor
function renderView(route) {
  const viewContainer = document.getElementById('app-view');
  if (!viewContainer) return;
  const content = getViewForRoute(route);
  viewContainer.innerHTML = content;
}

// Resaltar el enlace activo
function setActiveLink(route) {
  const links = document.querySelectorAll('nav a[data-link]');
  links.forEach(link => {
    const linkPath = link.getAttribute('href').replace(/^\//, '');
    if (route === linkPath) {
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

// Inicializar el router (escuchar cambios de hash y renderizar la ruta inicial)
export function initRouter() {
  // Escuchar cambios en el hash
  window.addEventListener('hashchange', () => {
    const route = getCurrentRoute();
    renderView(route);
    setActiveLink(route);
  });

  // Cargar la vista inicial según el hash actual (o por defecto)
  const initialRoute = getCurrentRoute();
  renderView(initialRoute);
  setActiveLink(initialRoute);
}