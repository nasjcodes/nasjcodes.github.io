import App from './lib/app.js';

// Components
import navbar from './views/components/navbar.js';
import footer from './views/components/footer.js';

// Pages
import home from './views/pages/home.js';
import about from './views/pages/about.js';
import projects from './views/pages/projects.js';
import contact from './views/pages/contact.js';
import error from './views/pages/error.js';

// Misc. functionality
import toggleMenu from './lib/togglemenu.js';

window.toggleMenu = toggleMenu;

const app = new App();

// Allow links to call route() function with 'app' context
window.route = app.route.bind(app);

app.addRoutes({
  '/': home,
  '/index.html': home,
  '/about': about,
  '/projects': projects,
  '/contact': contact,
  '/error': error,
});

app.addComponents({
  navbar,
  footer,
});

// Load components and content once DOM is loaded
document.addEventListener('DOMContentLoaded', loadInitial);

function loadInitial() {
  app.loadComponents();
  app.route(window.location.pathname);
}
