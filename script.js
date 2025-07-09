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

// WhatsApp contact form submission
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

// Your school's WhatsApp number
const whatsappNumber = "919745544623";

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Clear previous messages
  formMessage.textContent = '';

  // Get inputs
  const nameInput = document.getElementById('name');
  const ageInput = document.getElementById('age');
  const classInput = document.getElementById('class');
  const admissionInput = document.getElementById('admission');
  const phoneInput = document.getElementById('phone');

  const inputs = [
    { el: nameInput, name: 'Full Name' },
    { el: ageInput, name: 'Age' },
    { el: classInput, name: 'Class' },
    { el: admissionInput, name: 'Admission Number' },
    { el: phoneInput, name: 'Phone Number' },
  ];

  let valid = true;

  inputs.forEach(({ el }) => {
    const errorElem = el.nextElementSibling;
    if (!el.value.trim()) {
      el.classList.add('error');
      errorElem.textContent = "This field is required";
      valid = false;
    } else {
      el.classList.remove('error');
      errorElem.textContent = '';
    }
  });

  // Additional phone and age validations
  if (phoneInput.value.trim() && !validatePhone(phoneInput.value.trim())) {
    phoneInput.classList.add('error');
    phoneInput.nextElementSibling.textContent = "Invalid phone number";
    valid = false;
  }

  if (ageInput.value.trim() && (ageInput.value < 5 || ageInput.value > 100)) {
    ageInput.classList.add('error');
    ageInput.nextElementSibling.textContent = "Age must be between 5 and 100";
    valid = false;
  }

  if (!valid) {
    formMessage.style.color = '#e74c3c';
    formMessage.textContent = 'Please fix errors before submitting.';
    return;
  }

  // Build WhatsApp message
  const message = 
`Hello, I am interested in the Cybersquare course at Tisk School.
Here are my details:

Name: ${nameInput.value.trim()}
Age: ${ageInput.value.trim()}
Class: ${classInput.value.trim()}
Admission Number: ${admissionInput.value.trim()}
Phone Number: ${phoneInput.value.trim()}`;

  // URL encode message
  const encodedMessage = encodeURIComponent(message);

  // WhatsApp URL to open
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  // Open WhatsApp in new tab — fallback to location.href if blocked
  let opened = window.open(whatsappURL, '_blank');
  if (!opened) {
    window.location.href = whatsappURL;
  }

  // Reset form and show success message
  contactForm.reset();
  formMessage.style.color = 'green';
  formMessage.textContent = 'Your message is ready in WhatsApp!';
});

function validatePhone(phone) {
  // Allow digits, + and spaces and length 10-15 characters
  const re = /^[+0-9\s]{10,15}$/;
  return re.test(phone);
}
