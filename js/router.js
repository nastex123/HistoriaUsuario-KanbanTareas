import { dashboardView, initDashboard } from './views/dashboard.js';
import { projectsView } from './views/projects.js';
import { teamView } from './views/team.js';
import { reportsView } from './views/reports.js';
import { settingsView } from './views/settings.js';

const routes = {
  'dashboard': dashboardView,
  'projects': projectsView,
  'team': teamView,
  'reports': reportsView,
  'settings': settingsView,
};

const defaultRoute = 'dashboard';

function getCurrentRoute() {
  let hash = window.location.hash.slice(1);
  if (!hash || hash === '/') return defaultRoute;
  hash = hash.replace(/^\//, '');
  return routes[hash] ? hash : defaultRoute;
}

function getViewForRoute(route) {
  const view = routes[route];
  return view ? view() : routes[defaultRoute]();
}

export function navigateTo(route, addToHistory = true) {
  const cleanRoute = route.replace(/^\//, '');
  if (!routes[cleanRoute]) return;
  if (addToHistory) window.location.hash = cleanRoute;
  renderView(cleanRoute);
  setActiveLink(cleanRoute);
}

async function renderView(route) {
  const viewContainer = document.getElementById('app-view');
  if (!viewContainer) return;
  const content = getViewForRoute(route);
  viewContainer.innerHTML = content;
  if (route === 'dashboard') {
    await initDashboard();
  }
}

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

export function handleLinkClick(event) {
  const link = event.target.closest('a[data-link]');
  if (!link) return;
  event.preventDefault();
  const href = link.getAttribute('href');
  if (href) navigateTo(href);
}

export function initRouter() {
  window.addEventListener('hashchange', () => {
    const route = getCurrentRoute();
    renderView(route);
    setActiveLink(route);
  });
  const initialRoute = getCurrentRoute();
  renderView(initialRoute);
  setActiveLink(initialRoute);
}