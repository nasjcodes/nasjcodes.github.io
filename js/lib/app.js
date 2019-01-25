import toggleMenu from './togglemenu.js';

class App {
  constructor() {
    this.routes = {};
    // TODO: delete
    // this.navbar = document.getElementById('navbar');
    // this.footer = document.getElementById('footer');
    this.title = document.getElementById('title');
    this.content = document.getElementById('content');

    // Forward and back buttons
    window.addEventListener('popstate', () => {
      this.loadPage(window.location.pathname, true);
    });

    // Allow links to call route() with 'this' context
    window.route = this.route.bind(this);
  }

  // TODO: delete
  // Render navbar and footer
  // loadComponents() {
  //   this.navbar.innerHTML = navbar;
  //   this.footer.innerHTML = footer;
  // }

  addRoutes(...routes) {
    routes.forEach((route) => {
      const [link, value] = route;
      this.routes[link] = value;
    });
  }

  route(request) {
    // Checks if ?redirect=___ is present in url
    // Attemps to load the respective page
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('redirect')) {
      this.loadPage(urlParams.get('redirect'), true);
    } else {
      this.loadPage(request, false);
    }
  }

  loadPage(link, isRedirect) {
    App.collapseNavBar();
    this.displayPage(link);
    App.setUrl(link, isRedirect);
  }

  displayPage(link) {
    let page;
    if (this.routes[link] === undefined) {
      // Display error page if not found
      page = this.routes['/error'];
      document.title = 'Error';
    } else {
      page = this.routes[link];
      App.setDocTitle(link);
    }

    this.title.innerHTML = page.title;
    this.content.innerHTML = page.content;

    console.log(this.title);
    console.log(page.title);
  }

  static collapseNavBar() {
    const menuElem = document.getElementById('menu');
    if (menuElem.classList.contains('change')) {
      toggleMenu(menuElem);
    }
  }

  static setUrl(link, isRedirect) {
    if (isRedirect || window.location.pathname === link) {
      window.history.replaceState({}, '', link);
    } else {
      window.history.pushState({}, '', link);
    }
  }

  // Use static because 'this' is not used
  static setDocTitle(link) {
    const pageName = link.substring(1);
    let title = 'nasjcodes';

    if (pageName !== '') {
      title += ` |  ${pageName}`;
    }
    document.title = title;
  }
}

export default App;
