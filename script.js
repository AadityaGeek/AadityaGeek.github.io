// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    // Check if the link is to the current page
    if (this.getAttribute('href').includes('#') && window.location.pathname.endsWith('index.html')) {
      e.preventDefault();
      const targetId = this.getAttribute('href').split('#')[1];
      document.getElementById(targetId).scrollIntoView({
        behavior: 'smooth'
      });
    }
    // Close mobile menu and reset icon after clicking a link
    const navUl = document.querySelector('nav ul');
    const menuToggle = document.querySelector('.menu-toggle');
    navUl.classList.remove('active');
    menuToggle.classList.remove('active');
  });
});

// Hamburger menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navUl = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
  navUl.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  const navUl = document.querySelector('nav ul');
  const menuToggle = document.querySelector('.menu-toggle');
  if (!navUl.contains(e.target) && !menuToggle.contains(e.target)) {
    navUl.classList.remove('active');
    menuToggle.classList.remove('active');
  }
});

// Add animations on scroll
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => {
  observer.observe(section);
});

// Update footer year dynamically
document.getElementById('year').textContent = new Date().getFullYear();

// Certificate modal functionality
function openCertModal(imageSrc) {
  const modal = document.getElementById('certModal');
  const modalImg = document.getElementById('modalImage');
  if (!modal || !modalImg) return;

  modalImg.style.opacity = '0';
  modal.style.display = "block";
  document.body.style.overflow = 'hidden';

  // Add loading indicator if needed
  modalImg.onload = () => {
    modalImg.style.opacity = '1';
  };
  modalImg.src = imageSrc;

  // Focus trap
  const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  firstFocusable.focus();

  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  });
}

// Close modal function
function closeModal() {
  const modal = document.getElementById('certModal');
  if (!modal) {
    console.error('Modal element not found');
    return;
  }
  modal.style.display = "none";
  document.body.style.overflow = 'auto';
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const closeButton = document.querySelector('.close-modal');
  const modal = document.getElementById('certModal');
  
  if (closeButton) {
    closeButton.addEventListener('click', (e) => {
      e.stopPropagation();
      closeModal();
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
});

// Add form handling
const contactForm = document.querySelector('#contact form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        try {
            const formData = new FormData(contactForm);
            // You need to replace 'YOUR_FORM_ENDPOINT' with your actual form handling endpoint
            const response = await fetch('https://formspree.io/f/xrbpzpwo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(formData)),
            });

            if (response.ok) {
                alert('Message sent successfully!');
                contactForm.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to send message. Please try again later.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
}