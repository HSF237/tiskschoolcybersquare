// ✅ Responsive navigation toggling
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// ✅ Smooth scrolling and active link switching
const navLinkElements = document.querySelectorAll('.nav-link');

navLinkElements.forEach(link => {
  link.addEventListener('click', function () {
    if (navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
    }

    navLinkElements.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});

// ✅ WhatsApp contact form submission
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const whatsappNumber = "919605229939"; // ✅ Replace with your number

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

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
    { el: phoneInput, name: 'Phone Number' }
  ];

  let valid = true;

  // Clear previous errors
  inputs.forEach(({ el }) => {
    el.classList.remove('error');
    const errorElem = el.nextElementSibling;
    if (errorElem) errorElem.textContent = '';
  });

  // Validate inputs
  inputs.forEach(({ el, name }) => {
    const value = el.value.trim();
    const errorElem = el.nextElementSibling;
    if (!value) {
      el.classList.add('error');
      if (errorElem) errorElem.textContent = `${name} is required`;
      valid = false;
    }
  });

  // Validate age
  const age = parseInt(ageInput.value.trim());
  if (age && (age < 5 || age > 100)) {
    ageInput.classList.add('error');
    ageInput.nextElementSibling.textContent = "Age must be between 5 and 100";
    valid = false;
  }

  // Validate phone number
  const phone = phoneInput.value.trim();
  const phoneRegex = /^[6-9]\d{9}$/;
  if (phone && !phoneRegex.test(phone)) {
    phoneInput.classList.add('error');
    phoneInput.nextElementSibling.textContent = "Invalid phone number";
    valid = false;
  }

  if (!valid) {
    formMessage.style.color = '#e74c3c';
    formMessage.textContent = 'Please correct the highlighted fields.';
    return;
  }

  // Build WhatsApp message
  const message = 
`Hello, I am interested in the Cybersquare course at Tisk School.

Name: ${nameInput.value.trim()}
Age: ${ageInput.value.trim()}
Class: ${classInput.value.trim()}
Admission Number: ${admissionInput.value.trim()}
Phone Number: ${phoneInput.value.trim()}`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  // Open WhatsApp
  let opened = window.open(whatsappURL, '_blank');
  if (!opened) {
    window.location.href = whatsappURL;
  }

  // Reset form
  contactForm.reset();
  formMessage.style.color = 'green';
  formMessage.textContent = 'Opening WhatsApp...';
});

// ✅ Welcome screen animation
window.addEventListener('load', () => {
  const welcome = document.getElementById('welcome-screen');
  setTimeout(() => {
    welcome.classList.add('fade-out');
    setTimeout(() => {
      welcome.style.display = 'none';
    }, 500);
  }, 2500);
});

// ✅ Modal logic for "Know More" buttons
const knowMoreButtons = document.querySelectorAll('.know-more');
const modal = document.getElementById('info-modal');
const modalContent = document.getElementById('modal-body');
const modalClose = document.querySelector('.close-btn');

const modalTexts = {
  "Grades 1–2": `Grades 1–2 students are introduced to Visual Coding to build logic using blocks and get hands-on with simple Robotics & IoT activities.`,
  "Grades 3–5": `This level adds AI basics to Visual Coding and Robotics. Students begin to understand logic flow and simple automation concepts.`,
  "Grades 6–7": `Students explore real-world programming (Python), AI, and Robotics. This prepares them for advanced applications and real coding logic.`,
  "Grades 8+": `This group dives into Web Applications, Python Programming, AI problem solving, and advanced Robotics & IoT for real project exposure.`
};

knowMoreButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const title = btn.getAttribute('data-title');
    modalContent.innerHTML = `<h3>${title}</h3><p>${modalTexts[title]}</p>`;
    modal.style.display = 'flex';
  });
});

modalClose.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});
