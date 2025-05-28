// js/includeFooter.js
document.addEventListener('DOMContentLoaded', () => {
  fetch('footer.html')
    .then(res => res.text())
    .then(html => {
      const placeholder = document.getElementById('footer-placeholder');
      if (placeholder) placeholder.innerHTML = html;
    })
    .catch(err => console.error('Could not load footer:', err));
});