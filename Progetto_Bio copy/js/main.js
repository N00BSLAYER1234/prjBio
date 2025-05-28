document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true
    });
    
    // Add loaded class to hero after a slight delay
    setTimeout(() => {
        document.querySelector('.hero').classList.add('loaded');
    }, 300);
    
    // Change header style on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            document.querySelector('.main-header').classList.add('header-scrolled');
        } else {
            document.querySelector('.main-header').classList.remove('header-scrolled');
        }
    });
    
const menuToggle = document.querySelector('.menu-toggle');
const menuOverlay = document.querySelector('.menu-overlay');

let scrollTop = 0;

if (menuToggle && menuOverlay) {
  menuToggle.addEventListener('click', function () {
    const isActive = menuOverlay.classList.toggle('active');
    menuToggle.classList.toggle('menu-open');

    if (isActive) {
      scrollTop = window.scrollY;
      document.body.style.top = `-${scrollTop}px`;
      document.body.classList.add('no-scroll');
      document.body.style.position = 'fixed';
    } else {
      document.body.classList.remove('no-scroll');
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, scrollTop);
    }
  });
} 
    // Close menu overlay
    const closeMenu = document.querySelector('.close-menu');
    if (closeMenu && menuOverlay) {
        closeMenu.addEventListener('click', function() {
            menuToggle.classList.remove('menu-open');
            menuOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    }
    
    // Toggle search overlay
    const searchToggle = document.querySelector('.search-toggle');
    const searchOverlay = document.querySelector('.search-overlay');
    if (searchToggle && searchOverlay) {
        searchToggle.addEventListener('click', function(e) {
            e.preventDefault();
            searchOverlay.classList.add('active');
            document.querySelector('.search-input').focus();
            document.body.classList.add('no-scroll');
        });
    }
    
    // Close search overlay
    const searchClose = document.querySelector('.search-close');
    if (searchClose && searchOverlay) {
        searchClose.addEventListener('click', function() {
            searchOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    }
});