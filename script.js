// Responsive navigation toggling
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Smooth scrolling and active link switching
const navLinkElements = document.querySelectorAll('.nav-link');

navLinkElements.forEach(link => {
  link.addEventListener('click', function () {
    // close nav menu on mobile after click
    if (navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
    }

    navLinkElements.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});

// Form validation
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Clear previous errors
  formMessage.textContent = '';
  const inputs = ['name', 'email', 'message'];

  let valid = true;

  inputs.forEach(id => {
    const input = document.getElementById(id);
    const errorElem = input.nextElementSibling;
    if (!input.value.trim()) {
      input.classList.add('error');
      errorElem.textContent = "This field is required";
      valid = false;
    } else {
      if (id === 'email' && !validateEmail(input.value.trim())) {
        input.classList.add('error');
        errorElem.textContent = "Please enter a valid email";
        valid = false;
      } else {
        input.classList.remove('error');
        errorElem.textContent = '';
      }
    }
  });

  if (valid) {
    // Simulate sending form data (here just show success message)
    formMessage.style.color = 'green';
    formMessage.textContent = 'Thank you! Your message has been sent.';
    contactForm.reset();
  } else {
    formMessage.style.color = '#e74c3c';
    formMessage.textContent = 'Please fix errors before submitting.';
  }
});

function validateEmail(email) {
  // Simple email regex
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}
