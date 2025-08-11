import { AuthManager } from './auth.js';

// Function to protect routes that require authentication
export function protectRoute() {
  const auth = new AuthManager();
  
  if (!auth.isLoggedIn()) {
    // Save the current URL to redirect back after login
    const currentPath = window.location.pathname;
    if (currentPath !== '/login.html' && currentPath !== '/register.html' && currentPath !== '/forgot-password.html') {
      sessionStorage.setItem('redirectAfterLogin', currentPath);
    }
    
    // Redirect to login page
    window.location.href = 'login.html';
    return false;
  }
  
  return true;
}

// Function to redirect from auth pages if already logged in
export function redirectIfLoggedIn() {
  const auth = new AuthManager();
  
  if (auth.isLoggedIn()) {
    // Redirect to home or saved redirect path
    const redirectPath = sessionStorage.getItem('redirectAfterLogin') || 'home.html';
    sessionStorage.removeItem('redirectAfterLogin');
    window.location.href = redirectPath;
    return true;
  }
  
  return false;
}