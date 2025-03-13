
// 6. Auth Session Management
// Create sessionManager.js
export const setupSessionTimeout = () => {
  const checkSession = () => {
    const sessionExpires = localStorage.getItem('sessionExpires');
    
    if (sessionExpires) {
      const expiryTime = parseInt(sessionExpires);
      
      if (Date.now() > expiryTime) {
        // Session expired
        localStorage.removeItem('sessionExpires');
        
        // Clear any auth tokens
        localStorage.removeItem('authToken');
        
        // Redirect to login
        window.location.href = '/';
        alert('Your session has expired. Please log in again.');
      }
    }
  };
  
  // Check session every minute
  const intervalId = setInterval(checkSession, 60000);
  
  // Reset session timer on user activity
  const resetTimer = () => {
    const sessionExpires = localStorage.getItem('sessionExpires');
    
    if (sessionExpires) {
      // Extend session by 30 minutes from current time
      const newExpiryTime = Date.now() + 30 * 60 * 1000;
      localStorage.setItem('sessionExpires', newExpiryTime.toString());
    }
  };
  
  // Add event listeners for user activity
  window.addEventListener('click', resetTimer);
  window.addEventListener('keypress', resetTimer);
  window.addEventListener('scroll', resetTimer);
  window.addEventListener('mousemove', resetTimer);
  
  // Clean up function to remove event listeners
  return () => {
    clearInterval(intervalId);
    window.removeEventListener('click', resetTimer);
    window.removeEventListener('keypress', resetTimer);
    window.removeEventListener('scroll', resetTimer);
    window.removeEventListener('mousemove', resetTimer);
  };
};