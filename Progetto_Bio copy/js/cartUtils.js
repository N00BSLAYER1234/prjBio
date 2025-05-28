

document.addEventListener('DOMContentLoaded', () => {
  const cartItems = JSON.parse(localStorage.getItem('biologika-cart')) || [];
  const indicators = document.querySelectorAll('#cart-count');

  let totalQuantity = 0;
  cartItems.forEach(item => {
    totalQuantity += item.quantity || 1;
  });

  indicators.forEach(indicator => {
    indicator.textContent = totalQuantity;
    indicator.style.display = totalQuantity > 0 ? 'flex' : 'none';
  });
});