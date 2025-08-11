import { 
  registerUser as firebaseRegister, 
  loginUser as firebaseLogin, 
  logoutUser as firebaseLogout,
  resetPassword as firebaseResetPassword,
  getCurrentUser,
  onAuthChange
} from '../firebase/firebase.js';

export class AuthManager {
  constructor() {
    this.currentUser = null;
    this.authStateListener = null;
    this.initAuthListener();
  }

  initAuthListener() {
    this.authStateListener = onAuthChange((user) => {
      if (user) {
        // User is signed in
        this.currentUser = {
          id: user.uid,
          email: user.email,
          displayName: user.displayName || user.email.split('@')[0]
        };
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      } else {
        // User is signed out
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentUser');
      }
    });
  }

  async register(userData) {
    const { email, password } = userData;
    const result = await firebaseRegister(email, password);
    
    if (result.success) {
      return {
        id: result.user.uid,
        email: result.user.email
      };
    } else {
      throw new Error(result.error);
    }
  }

  async login(email, password) {
    const result = await firebaseLogin(email, password);
    
    if (result.success) {
      return {
        id: result.user.uid,
        email: result.user.email
      };
    } else {
      throw new Error(result.error);
    }
  }

  async logout() {
    const result = await firebaseLogout();
    if (!result.success) {
      throw new Error(result.error);
    }
  }

  async forgotPassword(email) {
    const result = await firebaseResetPassword(email);
    if (!result.success) {
      throw new Error(result.error);
    }
  }

  isLoggedIn() {
    return getCurrentUser() !== null || localStorage.getItem('currentUser') !== null;
  }

  getCurrentUser() {
    return this.currentUser;
  }
}