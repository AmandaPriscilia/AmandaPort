document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav ul');

  menuToggle.addEventListener('click', function () {
    navMenu.classList.toggle('show');
    if (navMenu.classList.contains('show')) {
      navMenu.style.display = 'flex';
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '100%';
      navMenu.style.left = '0';
      navMenu.style.right = '0';
      navMenu.style.backgroundColor = '#fff';
      navMenu.style.padding = '1rem 5%';
      navMenu.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';

      if (document.body.classList.contains('dark-mode')) {
        navMenu.style.backgroundColor = '#1e1e1e';
      }
    } else {
      navMenu.style.display = 'none';
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth',
        });

        // Close mobile menu if open
        if (navMenu.classList.contains('show')) {
          navMenu.classList.remove('show');
          navMenu.style.display = 'none';
        }
      }
    });
  });

  // Dark mode toggle
  const darkModeToggle = document.createElement('div');
  darkModeToggle.className = 'dark-mode-toggle';
  darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  document.body.appendChild(darkModeToggle);

  darkModeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');

    const icon = this.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
      localStorage.setItem('darkMode', 'enabled');

      // Adjust nav menu background for dark mode if open
      if (navMenu.classList.contains('show')) {
        navMenu.style.backgroundColor = '#1e1e1e';
      }
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
      localStorage.setItem('darkMode', 'disabled');

      if (navMenu.classList.contains('show')) {
        navMenu.style.backgroundColor = '#fff';
      }
    }
  });

  // Check for saved dark mode preference
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }

  // Project card hover effect enhancement
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card) => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-10px)';
      this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)';
    });
  });

  // Active navigation link highlighting
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('nav ul li a');

  window.addEventListener('scroll', function () {
    let current = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach((item) => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });

  // Form submission handling (if you add a contact form later)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you for your message! I will get back to you soon.');
      this.reset();
    });
  }
});
