document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

// Slideshow functionality
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 5000; // Change slide every 5 seconds

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Start the slideshow
    setInterval(nextSlide, slideInterval);
}

// Clients Carousel Auto-Scroll Logic
function initClientsCarousel() {
    const carousel = document.querySelector('.clients-carousel');
    if (!carousel) return;
    // Duplicate logos for seamless loop
    carousel.innerHTML += carousel.innerHTML;
    let isPaused = false;
    let scrollAmount = 0;
    const speed = 1; // px per frame
    const wrapper = document.querySelector('.carousel-wrapper');

    function scroll() {
        if (!isPaused) {
            scrollAmount += speed;
            if (scrollAmount >= carousel.scrollWidth / 2) {
                scrollAmount = 0;
            }
            carousel.style.transform = `translateX(-${scrollAmount}px)`;
        }
        requestAnimationFrame(scroll);
    }

    wrapper.addEventListener('mouseenter', () => { isPaused = true; });
    wrapper.addEventListener('mouseleave', () => { isPaused = false; });

    scroll();
}

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSlideshow();
    initClientsCarousel();
});

// Team modal popup logic
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('team-modal');
    if (!modal) return;
    const modalBody = modal.querySelector('.team-modal-body');
    const closeBtn = modal.querySelector('.team-modal-close');
    const overlay = modal.querySelector('.team-modal-overlay');
    document.querySelectorAll('.team-member .team-photo').forEach(photo => {
      photo.addEventListener('click', function(e) {
        const member = this.closest('.team-member');
        const bio = member.getAttribute('data-bio').replace(/\\n/g, '<br><br>');
        modalBody.innerHTML = bio;
        modal.style.display = 'flex';
        setTimeout(() => { modal.classList.add('active'); }, 10);
      });
    });
    function closeModal() {
      modal.classList.remove('active');
      setTimeout(() => { modal.style.display = 'none'; }, 200);
    }
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeModal();
    });
  });
})();

// Mobile Navbar Dropdown
const navbarToggle = document.getElementById('navbar-toggle');
const navbarMenu = document.getElementById('navbar-menu');
const navLinks = navbarMenu ? navbarMenu.querySelectorAll('nav a') : [];

if (navbarToggle && navbarMenu) {
  navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
    // Animate nav links with stagger
    navLinks.forEach((link, i) => {
      link.style.setProperty('--i', i);
    });
  });
  // Optional: Close menu when a link is clicked (for better UX)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navbarToggle.classList.remove('active');
      navbarMenu.classList.remove('active');
    });
  });
}