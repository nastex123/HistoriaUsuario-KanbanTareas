import { dashboardView, initDashboard } from './views/dashboard.js';
import { projectsView } from './views/projects.js';
import { teamView, initTeam } from './views/team.js';
import { reportsView } from './views/reports.js';
import { settingsView } from './views/settings.js';

const routes = {
    'dashboard': { view: dashboardView, init: initDashboard },
    'projects': { view: projectsView, init: null },
    'team': { view: teamView, init: initTeam },
    'reports': { view: reportsView, init: null },
    'settings': { view: settingsView, init: null }
};

const defaultRoute = 'dashboard';

function getCurrentRoute() {
    let hash = window.location.hash.slice(1);
    if (!hash || hash === '/') {
        hash = defaultRoute;
    }
    hash = hash.replace(/^\//, '');
    return routes[hash] ? hash : defaultRoute;
}

async function renderView(route) {
    const viewContainer = document.getElementById('app-view');
    if (!viewContainer) {
        console.error('app-view container not found');
        return;
    }
    
    const routeConfig = routes[route];
    if (!routeConfig) {
        console.error('Route not found:', route);
        return;
    }
    
    console.log('Rendering route:', route);
    
    try {
        const content = routeConfig.view();
        viewContainer.innerHTML = content;
        
        if (routeConfig.init) {
            await routeConfig.init();
        }
        
        setActiveLink(route);
        document.title = `Riwiflow - ${route.charAt(0).toUpperCase() + route.slice(1)}`;
    } catch (error) {
        console.error('Error rendering view:', error);
        viewContainer.innerHTML = `
            <div class="flex items-center justify-center h-full">
                <div class="text-center text-red-500">
                    <span class="material-symbols-outlined text-4xl">error</span>
                    <p class="mt-2">Error loading view: ${error.message}</p>
                </div>
            </div>
        `;
    }
}

function setActiveLink(activeRoute) {
    const links = document.querySelectorAll('nav a[data-link]');
    links.forEach(link => {
        const href = link.getAttribute('href');
        let linkRoute = href.replace(/^\//, '').replace(/^#/, '');
        if (linkRoute === '') linkRoute = 'dashboard';
        
        if (activeRoute === linkRoute) {
            link.classList.add('bg-primary-fixed', 'text-on-primary-fixed-variant', 'rounded-lg', 'scale-[0.98]');
            link.classList.remove('text-secondary', 'hover:bg-primary-container/10');
        } else {
            link.classList.remove('bg-primary-fixed', 'text-on-primary-fixed-variant', 'rounded-lg', 'scale-[0.98]');
            link.classList.add('text-secondary', 'hover:bg-primary-container/10');
        }
    });
}

export function navigateTo(route) {
    const cleanRoute = route.replace(/^\//, '').replace(/^#/, '');
    if (!routes[cleanRoute]) return;
    window.location.hash = cleanRoute;
}

export function initRouter() {
    // Escuchar cambios en el hash
    window.addEventListener('hashchange', () => {
        const route = getCurrentRoute();
        renderView(route);
    });
    
    // Escuchar clics en los enlaces del menu
    document.querySelectorAll('nav a[data-link]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href) {
                const route = href.replace(/^\//, '').replace(/^#/, '');
                navigateTo(route || 'dashboard');
            }
        });
    });
    
    // Cargar la ruta inicial
    const initialRoute = getCurrentRoute();
    renderView(initialRoute);
}