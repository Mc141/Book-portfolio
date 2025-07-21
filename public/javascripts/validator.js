
const form = document.querySelector('#contact-form');
const submitButton = document.querySelector('#submit-button');

form.addEventListener('submit', function (e) {
// Clear previous errors
document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
let hasErrors = false;

const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const email = document.querySelector('#email');
const message = document.querySelector('#message');

if (firstName.value.trim() === '') {
    showError(firstName, 'First name is required');
    hasErrors = true;
}

if (lastName.value.trim() === '') {
    showError(lastName, 'Last name is required');
    hasErrors = true;
}

if (!validateEmail(email.value.trim())) {
    showError(email, 'Enter a valid email address');
    hasErrors = true;
}

if (message.value.trim() === '') {
    showError(message, 'Message cannot be empty');
    hasErrors = true;
}

if (hasErrors) {
    e.preventDefault();
}
});

function showError(inputElement, message) {
  const errorSpan = inputElement.nextElementSibling;
  if (errorSpan && errorSpan.classList.contains('error-message')) {
    errorSpan.textContent = message;
  }
  inputElement.classList.add('input-error');
}


function validateEmail(email) {
return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}






function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const subMessageDiv = document.getElementById('submission-message');
const subSuccess = getQueryParam('success');
const subError = getQueryParam('error');

if (subMessageDiv && (subSuccess || subError)) {
  if (subSuccess) {
    subMessageDiv.textContent = 'Your message was sent successfully. Thank you!';
    subMessageDiv.classList.remove('error');
  } else if (subError) {
    subMessageDiv.textContent = 'There was an error sending your message. Please try again later.';
    subMessageDiv.classList.add('error');
  }

  setTimeout(() => {
    subMessageDiv.classList.add('fade-out');
    setTimeout(() => {
      subMessageDiv.textContent = '';
      subMessageDiv.classList.remove('fade-out', 'error');
    }, 1000);
  }, 5000);
}
