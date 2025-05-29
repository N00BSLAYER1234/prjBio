// main.js: AOS inizilizzazione e gestione eventi
document.addEventListener('DOMContentLoaded', function() {
    console.log('main.js: DOMContentLoaded event fired');
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true
    });
    console.log('main.js: AOS initialized with duration=800, easing="ease-out", once=true');
    
    //  carica la la classe loaded dopo un delay di 300ms
    setTimeout(() => {
        document.querySelector('.hero').classList.add('loaded');
    }, 300);
    console.log('main.js: hero load class added after 300ms delay');
    
    // Change header style on scroll
    window.addEventListener('scroll', function() {
        console.log('main.js: scroll event, window.scrollY =', window.scrollY);
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
        console.log('main.js: menuToggle clicked, menuOverlay active =', menuOverlay.classList.contains('active'));
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
    // chiusura meny
    const closeMenu = document.querySelector('.close-menu');
    if (closeMenu && menuOverlay) {
        closeMenu.addEventListener('click', function() {
            console.log('main.js: closeMenu clicked, hiding menuOverlay');
            menuToggle.classList.remove('menu-open');
            menuOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    }
    
    // overlay
    const searchToggle = document.querySelector('.search-toggle');
    const searchOverlay = document.querySelector('.search-overlay');
    if (searchToggle && searchOverlay) {
        searchToggle.addEventListener('click', function(e) {
            console.log('main.js: searchToggle clicked, opening search overlay');
            e.preventDefault();
            searchOverlay.classList.add('active');
            document.querySelector('.search-input').focus();
            document.body.classList.add('no-scroll');
        });
    }
    
    // chiusura ovelay seach
    const searchClose = document.querySelector('.search-close');
    if (searchClose && searchOverlay) {
        searchClose.addEventListener('click', function() {
        console.log('main.js: searchClose clicked, closing search overlay');
            searchOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    }
});