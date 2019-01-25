import toggleMenu from './togglemenu.js';

class App {
  constructor() {
    this.routes = {};
    // TODO: delete
    // this.navbar = document.getElementById('navbar');
    // this.footer = document.getElementById('footer');
    this.mainDiv = document.getElementById('main_content');
    this.header = document.getElementById('header');
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
    } else {
      page = this.routes[link];
    }

    App.setDocTitle(page.title);

    // Style properties
    page.centerX ? this.mainDiv.classList.add('center-x') : this.mainDiv.classList.remove('center-x');

    page.centerY ? this.mainDiv.classList.add('center-y') : this.mainDiv.classList.remove('center-y');

    this.header.innerHTML = page.header;
    this.content.innerHTML = page.content;

    console.log(this.header);
    console.log(page.header);
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
  static setDocTitle(pageName) {
    let title = 'nasjcodes';

    if (pageName !== '') {
      title += ` |  ${pageName}`;
    }
    document.title = title;
  }
}

export default App;
