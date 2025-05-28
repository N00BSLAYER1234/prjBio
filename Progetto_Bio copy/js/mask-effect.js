window.addEventListener('scroll', () => {
  const bg = document.querySelector('.scroll-background');
  const scrollY = window.scrollY;
  bg.style.transform = `translateY(${scrollY * 0.4}px)`;
});