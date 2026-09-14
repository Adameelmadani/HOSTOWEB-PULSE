import { url } from "./general.js";

/**
 * @function checkForAuthentication
 * @description Checks if the user is authenticated by verifying the token stored in localStorage.
 * If the token is invalid or not present, redirects the user to the signup page.
 * @returns {void}
 */
function checkForAuthentication() {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('No token found. Redirecting to signup page.');
    window.location.replace('signup.html');
    return;
  }
  
  const userCheckUrl = url + 'user/check-token';
  const data = { token: token };
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  fetch(userCheckUrl, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      const allowed = data.allowed;
      if (allowed === 'no') {
        window.location.replace('signup.html');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while checking authentication. Please try again later.');
    });
}

// Initiate authentication check
checkForAuthentication();
