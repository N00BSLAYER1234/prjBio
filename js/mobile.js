// moblie utilities 

// funzioni responsive 
const MobileUtils = {
    
    isMobile: () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    
    isTouchDevice: () => {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    },

    // sezione viewport
    getViewport: () => {
        return {
            width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
            height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
        };
    },

    // sezione debounce
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // il throttle
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// navigazione mobile
class MobileNavigation {
    constructor() {
        this.menu = document.getElementById('mobileMenu');
        this.menuButton = document.querySelector('[onclick="toggleMenu()"]');
        this.isOpen = false;
        this.scrollPosition = 0;
        
        this.init();
    }

    init() {
        // touch event
        if (this.menu) {
            this.menu.addEventListener('touchstart', this.handleTouchStart.bind(this));
            this.menu.addEventListener('touchmove', this.handleTouchMove.bind(this));
            this.menu.addEventListener('touchend', this.handleTouchEnd.bind(this));
        }

     
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        
        
        document.addEventListener('click', this.handleOutsideClick.bind(this));
    }

    handleTouchStart(e) {
        this.startY = e.touches[0].clientY;
        this.startTime = Date.now();
    }

    handleTouchMove(e) {
        if (!this.startY) return;
        
        const currentY = e.touches[0].clientY;
        const diffY = this.startY - currentY;
        
        // Prevent default scrolling when menu is open
        if (this.isOpen && Math.abs(diffY) > 10) {
            e.preventDefault();
        }
    }

    handleTouchEnd(e) {
        if (!this.startY) return;
        
        const endY = e.changedTouches[0].clientY;
        const diffY = this.startY - endY;
        const diffTime = Date.now() - this.startTime;
        
        //lo swipe per chiudere
        if (diffY > 50 && diffTime < 300 && this.isOpen) {
            this.close();
        }
        
        this.startY = null;
        this.startTime = null;
    }

    handleKeyDown(e) {
        if (e.key === 'Escape' && this.isOpen) {
            this.close();
        }
        
        // il tab per la navigazione
        if (e.key === 'Tab' && this.isOpen) {
            this.handleTabNavigation(e);
        }
    }

    handleTabNavigation(e) {
        const focusableElements = this.menu.querySelectorAll(
            'a, button, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }

    handleOutsideClick(e) {
        if (this.isOpen && !this.menu.contains(e.target) && !this.menuButton.contains(e.target)) {
            this.close();
        }
    }

    open() {
        this.scrollPosition = window.pageYOffset;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${this.scrollPosition}px`;
        document.body.style.width = '100%';
        document.body.classList.add('no-scroll');
        
        this.menu.classList.remove('hidden');
        this.menu.setAttribute('aria-hidden', 'false');
        this.isOpen = true;
        
        // first menut item
        const firstMenuItem = this.menu.querySelector('a');
        if (firstMenuItem) {
            setTimeout(() => firstMenuItem.focus(), 100);
        }
    }

    close() {
        document.body.classList.remove('no-scroll');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        
        this.menu.classList.add('hidden');
        this.menu.setAttribute('aria-hidden', 'true');
        this.isOpen = false;
        
        window.scrollTo(0, this.scrollPosition);
        
        // ritorna il focus sul pulsante del menu
        if (this.menuButton) {
            this.menuButton.focus();
        }
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
}

// ottimizzazione prestazioni
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {

        this.optimizeImages();
        

        this.setupLazyLoading();
        

        this.optimizeScrollEvents();
        

        this.preloadCriticalResources();
    }

    optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {

            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            // error handling -> cerca traduzione 
            img.addEventListener('error', () => {
                img.style.display = 'none';
                console.warn(`Failed to load image: ${img.src}`);
            });
        });
    }

    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const lazyElements = document.querySelectorAll('[data-src], .lazy');
            const lazyObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        
                        if (element.dataset.src) {
                            element.src = element.dataset.src;
                            element.removeAttribute('data-src');
                        }
                        
                        if (element.classList.contains('lazy')) {
                            element.classList.remove('lazy');
                            element.classList.add('loaded');
                        }
                        
                        lazyObserver.unobserve(element);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            lazyElements.forEach(element => lazyObserver.observe(element));
        }
    }

    optimizeScrollEvents() {
        const header = document.querySelector('.header-nav');
        if (!header) return;

        const handleScroll = MobileUtils.throttle(() => {
            const scrollY = window.pageYOffset;
            
            if (scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        }, 16); // ~60fps

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    preloadCriticalResources() {
        const criticalResources = [
            'assets/images/bee.png',
            'css/style.css',
            'css/responsive.css'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            
            if (resource.endsWith('.css')) {
                link.as = 'style';
            } else if (resource.endsWith('.js')) {
                link.as = 'script';
            } else {
                link.as = 'image';
            }
            
            document.head.appendChild(link);
        });
    }
}

// scrolling fluido
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.handleAnchorClick.bind(this));
        });
    }

    handleAnchorClick(e) {
        e.preventDefault();
        
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (!targetElement) return;

        const headerHeight = document.querySelector('.header-nav')?.offsetHeight || 0;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Cchiusura menu se aperto
        const mobileNav = window.mobileNavigation;
        if (mobileNav && mobileNav.isOpen) {
            mobileNav.close();
        }
    }
}

//  funzione touch gesture
class TouchGestureHandler {
    constructor() {
        this.init();
    }

    init() {
        if (!MobileUtils.isTouchDevice()) return;

        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            this.handleSwipe(touchStartX, touchStartY, touchEndX, touchEndY);
        }, { passive: true });
    }

    handleSwipe(startX, startY, endX, endY) {
        const deltaX = Math.abs(endX - startX);
        const deltaY = Math.abs(endY - startY);
        const minSwipeDistance = 50;

        if (deltaX < minSwipeDistance && deltaY < minSwipeDistance) return;

        const mobileNav = window.mobileNavigation;
        if (!mobileNav) return;


        if (deltaX > deltaY) {
            if (startX > endX && deltaX > minSwipeDistance) {
                // apertura meny swipe sx
                if (!mobileNav.isOpen) {
                    mobileNav.open();
                }
            } else if (startX < endX && deltaX > minSwipeDistance) {
                // chiusura menu swipe dx

                    mobileNav.close();
                }
            }
        }
    }


// inizializzazione delle funzionalità mobile
document.addEventListener('DOMContentLoaded', () => {
    // Initialize mobile navigation
    window.mobileNavigation = new MobileNavigation();
    

    new PerformanceOptimizer();
    

    new SmoothScroll();
    

    new TouchGestureHandler();
    

    window.toggleMenu = () => {
        window.mobileNavigation.toggle();
    };
    

    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', MobileUtils.debounce(setVH, 250));
    

    if (MobileUtils.isMobile()) {
        document.body.classList.add('mobile-device');
        
        // disabilita l'hover
        const style = document.createElement('style');
        style.textContent = `
            @media (hover: none) {
                .group:hover .group-hover\\:opacity-100 {
                    opacity: 1 !important;
                }
                .hover\\:scale-105:hover {
                    transform: none !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    console.log('Biologika mobile utilities initialized successfully');
});