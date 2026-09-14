import { url } from "./general.js";
const userUrl = url + 'user';

/**
 * Displays an error message in the authentication error div.
 * @param {string} message - The error message to display.
 */
function showErrorMessage(message) {
  const authErrorDiv = document.querySelector('.auth-error');
  authErrorDiv.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>${message}`;
  authErrorDiv.style.display = 'block';
}

/**
 * Retrieves data from input fields and handles form submission.
 */
function getDataFromInput() {
  const submitButton = document.querySelector('.auth-container div button');
  const usernameInput = document.querySelector('.auth-input .username');
  const passwordInput = document.querySelector('.auth-input .password');

  usernameInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      submitButton.click();
    }
  });

  passwordInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      submitButton.click();
    }
  });

  submitButton.addEventListener('click', () => {
    const username = usernameInput.value;
    const password = passwordInput.value;
    if (username.length < 8) {
      showErrorMessage('Username must be at least 8 characters long.');
    } else if (password.length < 8) {
      showErrorMessage('Password must be at least 8 characters long.');
    } else {
      submitUser({username, password});
    }
  });
}

/**
 * Submits user data to the server.
 * @param {Object} data - The user data to submit.
 * @param {string} data.username - The username.
 * @param {string} data.password - The password.
 */
function submitUser(data) {
  // Options for the fetch request
  const options = {
    method: 'POST', // HTTP method
    headers: {
      'Content-Type': 'application/json' // Content-Type header specifies the media type of the request
    },
    body: JSON.stringify(data) // Convert the data object to a JSON string
  };

  // Make the POST request
  fetch(userUrl, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json(); // Assuming the server responds with JSON
    })
    .then(data => {
      const token = data.token;
      if (token === '') {
        showErrorMessage('This username is already taken. Please try another one.');
      } else {
        localStorage.setItem('token', data.token);
        window.location.replace('ind-ins-products-services.html');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      showErrorMessage('An error occurred while processing your request. Please try again later.');
    });
}

getDataFromInput();
