export class LoginPage {
  constructor(auth) {
    this.auth = auth
  }

  render() {
    return `
      <div class="form-container">
        <h2>Welcome Back!</h2>
        <form id="loginForm">
          <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" required>
          </div>
          <button type="submit" class="btn btn-full">Login</button>
        </form>
        
        <div style="text-align: center; margin-top: 20px;">
          <p>Don't have an account? <a href="#" id="registerLink" style="color: #4CAF50; text-decoration: none;">Register here</a></p>
          <p><a href="#" id="forgotLink" style="color: #666; text-decoration: none;">Forgot password?</a></p>
        </div>
        
        <div id="loginError" style="display: none; color: #e63946; text-align: center; margin-top: 15px;"></div>
      </div>
    `
  }

  init() {
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
      e.preventDefault()
      await this.handleLogin()
    })

    document.getElementById('registerLink').addEventListener('click', (e) => {
      e.preventDefault()
      window.history.pushState({}, '', '/register')
      window.dispatchEvent(new PopStateEvent('popstate'))
    })

    document.getElementById('forgotLink').addEventListener('click', (e) => {
      e.preventDefault()
      this.handleForgotPassword()
    })
  }

  async handleLogin() {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const errorDiv = document.getElementById('loginError')

    try {
      await this.auth.login(email, password)
      // Redirect to home page
      window.history.pushState({}, '', '/')
      window.dispatchEvent(new PopStateEvent('popstate'))
    } catch (error) {
      errorDiv.textContent = error
      errorDiv.style.display = 'block'
    }
  }

  async handleForgotPassword() {
    const email = prompt('Enter your email address:')
    if (email) {
      try {
        await this.auth.forgotPassword(email)
        alert('If this email is registered, a password reset link has been sent.')
      } catch (error) {
        alert('Error: ' + error)
      }
    }
  }
}