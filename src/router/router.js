export class Router {
  constructor() {
    this.routes = new Map()
    this.currentPage = null
  }

  addRoute(path, handler) {
    this.routes.set(path, handler)
  }

  navigate(path) {
    window.history.pushState({}, '', path)
    this.handleRoute(path)
  }

  handleRoute(path) {
    // Handle parameterized routes
    let handler = this.routes.get(path)
    let params = {}

    if (!handler) {
      // Check for parameterized routes
      for (let [route, routeHandler] of this.routes) {
        const routeRegex = route.replace(/:[^/]+/g, '([^/]+)')
        const match = path.match(new RegExp(`^${routeRegex}$`))
        
        if (match) {
          handler = routeHandler
          const paramNames = route.match(/:[^/]+/g) || []
          paramNames.forEach((param, index) => {
            params[param.slice(1)] = match[index + 1]
          })
          break
        }
      }
    }

    if (handler) {
      // Clean up previous page
      if (this.currentPage && this.currentPage.cleanup) {
        this.currentPage.cleanup()
      }

      // Load new page
      this.currentPage = handler(params)
      if (this.currentPage && this.currentPage.render) {
        const mainContent = document.getElementById('mainContent')
        mainContent.innerHTML = this.currentPage.render()
        
        // Initialize page if it has an init method
        if (this.currentPage.init) {
          this.currentPage.init()
        }
      }
    } else {
      // 404 - redirect to home
      this.navigate('/')
    }
  }

  start() {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
      this.handleRoute(window.location.pathname)
    })

    // Handle initial route
    this.handleRoute(window.location.pathname)
  }
}