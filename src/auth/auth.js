export class AuthManager {
  constructor() {
    this.users = JSON.parse(localStorage.getItem('users') || '[]')
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
  }

  register(userData) {
    return new Promise((resolve, reject) => {
      // Check if user already exists
      const existingUser = this.users.find(user => user.email === userData.email)
      if (existingUser) {
        reject('User already exists with this email')
        return
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email: userData.email,
        password: userData.password, // In real app, this would be hashed
        fullname: userData.fullname,
        dob: userData.dob,
        createdAt: new Date().toISOString()
      }

      this.users.push(newUser)
      localStorage.setItem('users', JSON.stringify(this.users))
      
      resolve(newUser)
    })
  }

  login(email, password) {
    return new Promise((resolve, reject) => {
      const user = this.users.find(u => u.email === email && u.password === password)
      
      if (user) {
        this.currentUser = { ...user }
        delete this.currentUser.password // Don't store password in current user
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
        resolve(this.currentUser)
      } else {
        reject('Invalid email or password')
      }
    })
  }

  logout() {
    this.currentUser = null
    localStorage.removeItem('currentUser')
  }

  isLoggedIn() {
    return this.currentUser !== null
  }

  getCurrentUser() {
    return this.currentUser
  }

  forgotPassword(email) {
    return new Promise((resolve, reject) => {
      const user = this.users.find(u => u.email === email)
      if (user) {
        // In a real app, this would send an email
        console.log(`Password reset link sent to ${email}`)
        resolve()
      } else {
        reject('Email not found')
      }
    })
  }
}