// script/index.js

document.addEventListener('DOMContentLoaded', function () {
  // --- Mobile Menu Toggle ---
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav ul li a');

  // Function to close the mobile menu
  function closeMenu() {
    nav.classList.remove('show');
    document.body.classList.remove('menu-open'); // Menghapus kelas ini juga penting untuk potensi overlay jika Anda memutuskan untuk menambahkannya lagi di masa depan
  }

  // Event listener for the hamburger menu toggle button
  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      nav.classList.toggle('show');
      document.body.classList.toggle('menu-open'); // Menambahkan/menghapus kelas ini untuk mengontrol status menu
    });
  }

  // Close menu when a navigation link is clicked (for smooth scrolling)
  navLinks.forEach((link) => {
    link.addEventListener('click', function () {
      // Small delay to allow scroll animation to start before closing menu
      setTimeout(closeMenu, 300);
    });
  });

  // Close menu when clicking outside the menu (on the body/overlay area)
  document.body.addEventListener('click', function (event) {
    // Check if the body has 'menu-open' class AND the click target is NOT the toggle button AND NOT inside the nav
    if (document.body.classList.contains('menu-open') && !nav.contains(event.target) && !menuToggle.contains(event.target)) {
      closeMenu();
    }
  });

  // --- Smooth Scrolling for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return; // Prevent scrolling if href is just '#'

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100, // Adjust offset for sticky header
          behavior: 'smooth',
        });
        // Menu closing is already handled by navLinks.forEach above or body click listener
      }
    });
  });

  // --- Dark Mode Toggle ---
  const darkModeToggle = document.createElement('div');
  darkModeToggle.className = 'dark-mode-toggle';
  darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Default icon: moon (light mode)
  document.body.appendChild(darkModeToggle);

  const darkModeIcon = darkModeToggle.querySelector('i');

  // --- Initialize Dark Mode on Page Load ---
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    // If saved preference is 'dark', activate dark mode
    document.body.classList.add('dark-mode');
    if (darkModeIcon) {
      darkModeIcon.classList.remove('fa-moon');
      darkModeIcon.classList.add('fa-sun'); // Change icon to sun
    }
  } else {
    // If no preference saved, or preference is 'light', ensure body does not have dark-mode
    document.body.classList.remove('dark-mode');
    if (darkModeIcon) {
      darkModeIcon.classList.remove('fa-sun');
      darkModeIcon.classList.add('fa-moon'); // Change icon to moon
    }
  }

  // --- Event Listener for Dark Mode Toggle ---
  darkModeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
      darkModeIcon.classList.remove('fa-moon');
      darkModeIcon.classList.add('fa-sun');
      localStorage.setItem('theme', 'dark'); // Save 'dark' preference
    } else {
      darkModeIcon.classList.remove('fa-sun');
      darkModeIcon.classList.add('fa-moon');
      localStorage.setItem('theme', 'light'); // Save 'light' preference
    }
  });

  // --- Project Card Hover Effect Enhancement ---
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

  // --- Active Navigation Link Highlighting ---
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('nav ul li a');

  window.addEventListener('scroll', function () {
    let current = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150; // Offset for sticky header/better UX
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach((item) => {
      item.classList.remove('active'); // Remove 'active' from all links
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active'); // Add 'active' to the matching link
      }
    });
  });

  window.dispatchEvent(new Event('scroll')); // Trigger scroll event once on load to set initial active link

  // --- Form Submission Handling (Placeholder) ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent default form submission
      alert('Thank you for your message! I will get back to you soon.');
      this.reset(); // Clear form fields
    });
  }
});
