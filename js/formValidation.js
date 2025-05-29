// formValidation.js: validazione modulo
document.getElementById('contactForm').addEventListener('submit', function (e) {
  console.log('formValidation: submit event triggered');
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  console.log('formValidation: field values:', { name, email, message });

  if (!name || !email || !message) {
    console.log('formValidation: validation failed - missing fields');
    alert('Please fill in all fields.');
    return;
  }

  alert('Message sent successfully! ');
  console.log('formValidation: validation passed, form reset');
  this.reset();
});
