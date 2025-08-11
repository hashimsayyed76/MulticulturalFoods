// Dark mode functionality
function initDarkMode() {
  // Check for saved preference
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  
  // Apply dark mode if saved preference exists
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
  }
  
  // Create toggle function that can be called from any page
  window.toggleDarkMode = function() {
    const isDarkModeNow = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDarkModeNow);
    return isDarkModeNow;
  };
}

// Initialize dark mode on page load
document.addEventListener('DOMContentLoaded', initDarkMode);