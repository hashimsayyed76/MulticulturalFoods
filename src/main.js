import './style.css'
import { AuthManager } from './auth/auth.js'
import { Router } from './router/router.js'
import '../firebase/firebase.js'
import { HomePage } from './pages/HomePage.js'
import { SearchPage } from './pages/SearchPage.js'
import { AskAIPage } from './pages/AskAIPage.js'
import { FavoritesPage } from './pages/FavoritesPage.js'
import { LoginPage } from './pages/LoginPage.js'
import { RegisterPage } from './pages/RegisterPage.js'
import { CountryPage } from './pages/CountryPage.js'

class App {
  constructor() {
    this.auth = new AuthManager()
    this.router = new Router()
    this.init()
  }

  init() {
    this.setupRoutes()
    this.setupNavigation()
    this.setupProfileDropdown()
    this.checkAuthState()
    
    // Start the router
    this.router.start()
  }

  setupRoutes() {
    this.router.addRoute('/', () => new HomePage())
    this.router.addRoute('/search', () => new SearchPage())
    this.router.addRoute('/ask-ai', () => new AskAIPage())
    this.router.addRoute('/favorites', () => new FavoritesPage())
    this.router.addRoute('/login', () => new LoginPage(this.auth))
    this.router.addRoute('/register', () => new RegisterPage(this.auth))
    this.router.addRoute('/country/:country', (params) => new CountryPage(params.country))
  }

  setupNavigation() {
    document.getElementById('homeLink').addEventListener('click', (e) => {
      e.preventDefault()
      this.router.navigate('/')
    })

    document.getElementById('searchLink').addEventListener('click', (e) => {
      e.preventDefault()
      this.router.navigate('/search')
    })

    document.getElementById('askAiLink').addEventListener('click', (e) => {
      e.preventDefault()
      if (this.auth.isLoggedIn()) {
        this.router.navigate('/ask-ai')
      } else {
        alert('Please log in to access Ask AI')
        this.router.navigate('/login')
      }
    })

    document.getElementById('favoritesLink').addEventListener('click', (e) => {
      e.preventDefault()
      this.router.navigate('/favorites')
    })
  }

  setupProfileDropdown() {
    const profileBtn = document.getElementById('profileBtn')
    const profileDropdown = document.getElementById('profileDropdown')
    
    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      const isExpanded = profileBtn.getAttribute('aria-expanded') === 'true'
      profileBtn.setAttribute('aria-expanded', !isExpanded)
      profileDropdown.style.display = isExpanded ? 'none' : 'flex'
    })

    document.addEventListener('click', () => {
      profileBtn.setAttribute('aria-expanded', 'false')
      profileDropdown.style.display = 'none'
    })

    document.getElementById('settingsBtn').addEventListener('click', () => {
      alert('Settings functionality coming soon!')
    })

    document.getElementById('logoutBtn').addEventListener('click', () => {
      this.auth.logout()
      this.checkAuthState()
      this.router.navigate('/')
    })
  }

  checkAuthState() {
    const isLoggedIn = this.auth.isLoggedIn()
    
    document.getElementById('askAiLink').classList.toggle('disabled', !isLoggedIn)
    document.getElementById('favoritesLink').classList.toggle('disabled', !isLoggedIn)
    
    if (!isLoggedIn) {
      this.router.navigate('/login')
    }
  }
}

// Initialize the app
new App()