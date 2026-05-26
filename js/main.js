import { initRouter, handleLinkClick } from './router.js';

// Sesión y Logout
const session = localStorage.getItem('riwiflow_session');
if (!session) {
    window.location.href = 'login.html';
}

window.logout = function() {
    localStorage.removeItem('riwiflow_session');
    window.location.href = 'login.html';
};

// Inicialización Global
document.addEventListener('DOMContentLoaded', () => {
    const userNameDisplay = document.getElementById('user-name-display');
    if (userNameDisplay && session) {
        const userData = JSON.parse(session);
        userNameDisplay.textContent = userData.name;
    }
    initRouter();
    document.addEventListener('click', handleLinkClick);
});