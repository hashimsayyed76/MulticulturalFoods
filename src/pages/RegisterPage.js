export class RegisterPage {
  constructor(auth) {
    this.auth = auth
  }

  render() {
    return `
      <div class="form-container">
        <h2>Create Your Account</h2>
        <form id="registerForm">
          <div class="form-group">
            <label for="fullname">Full Name</label>
            <input type="text" id="fullname" required>
          </div>
          <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" required minlength="8">
          </div>
          <div class="form-group">
            <label for="dob">Date of Birth</label>
            <input type="date" id="dob" required>
          </div>
          <button type="submit" class="btn btn-full">Create Account</button>
        </form>
        
        <div style="text-align: center; margin-top: 20px;">
          <p>Already have an account? <a href="#" id="loginLink" style="color: #4CAF50; text-decoration: none;">Login here</a></p>
        </div>
        
        <div id="registerError" style="display: none; color: #e63946; text-align: center; margin-top: 15px;"></div>
        <div id="registerSuccess" style="display: none; color: #4CAF50; text-align: center; margin-top: 15px;"></div>
      </div>
    `
  }

  init() {
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
      e.preventDefault()
      await this.handleRegister()
    })

    document.getElementById('loginLink').addEventListener('click', (e) => {
      e.preventDefault()
      window.history.pushState({}, '', '/login')
      window.dispatchEvent(new PopStateEvent('popstate'))
    })
  }

  async handleRegister() {
    const formData = {
      fullname: document.getElementById('fullname').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      dob: document.getElementById('dob').value
    }

    const errorDiv = document.getElementById('registerError')
    const successDiv = document.getElementById('registerSuccess')

    try {
      await this.auth.register(formData)
      
      successDiv.textContent = 'Account created successfully! You can now log in.'
      successDiv.style.display = 'block'
      errorDiv.style.display = 'none'
      
      // Clear form
      document.getElementById('registerForm').reset()
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        window.history.pushState({}, '', '/login')
        window.dispatchEvent(new PopStateEvent('popstate'))
      }, 2000)
      
    } catch (error) {
      errorDiv.textContent = error
      errorDiv.style.display = 'block'
      successDiv.style.display = 'none'
    }
  }
}