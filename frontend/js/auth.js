// Firebase Auth Configuration
console.log("✅ auth.js is properly loaded!");

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBvXkkbC9NojdOL0xivRBG1cOut25EntCA",
  authDomain: "multiculturalfoods-8f667.firebaseapp.com",
  projectId: "multiculturalfoods-8f667",
  storageBucket: "multiculturalfoods-8f667.firebasestorage.app",
  messagingSenderId: "935323823874",
  appId: "1:935323823874:web:3aeacfef6f44f2842adc1b",
  measurementId: "G-JNVQVF2CJF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ======================
// 1. REGISTRATION FLOW
// ======================
function registerUser(fullname, dob, email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Save extra fields to localStorage (or Firebase DB later)
        const user = userCredential.user;
        localStorage.setItem('firebaseUser', JSON.stringify({
          email: user.email,
          uid: user.uid,
          fullname: fullname,
          dob: dob
        }));
        return user;
      })
      .catch(error => {
        console.error('Registration error:', error);
        throw error.message || JSON.stringify(error);
      });
}

// ======================
// 2. LOGIN FLOW
// ======================
function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        localStorage.setItem('firebaseUser', JSON.stringify({
          email: user.email,
          uid: user.uid
        }));
        return user;
      })
      .catch(error => {
        console.error('Login error:', error);
        throw error.message || JSON.stringify(error);
      });
}

// ======================
// 3. PASSWORD RESET FLOW
// ======================
function forgotPassword(email) {
  return sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Password reset email sent.");
      })
      .catch(error => {
        console.error('Forgot password error:', error);
        throw error.message || JSON.stringify(error);
      });
}

// Placeholder for confirmPassword (Firebase uses reset link instead)
function confirmPassword(email, code, newPassword) {
  throw new Error("confirmPassword is not used in Firebase. Use the email link sent for resetting.");
}

// ======================
// 4. SESSION MANAGEMENT
// ======================
function getCurrentUser() {
  return JSON.parse(localStorage.getItem('firebaseUser'));
}

function isUserLoggedIn() {
  return !!getCurrentUser();
}

function logoutUser() {
  return signOut(auth).then(() => {
    localStorage.removeItem('firebaseUser');
  });
}

// ======================
// EXPORT ALL FUNCTIONS
// ======================
window.auth = {
  registerUser,
  loginUser,
  forgotPassword,
  confirmPassword,
  getCurrentUser,
  isUserLoggedIn,
  logoutUser
};
