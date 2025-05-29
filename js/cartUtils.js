
// cartUtils.js: update del careello



document.addEventListener('DOMContentLoaded', () => {
  console.log('cartUtils: DOMContentLoaded fired');
  const cartItems = JSON.parse(localStorage.getItem('biologika-cart')) || [];
  console.log('cartUtils: loaded cartItems:', cartItems);
  const indicators = document.querySelectorAll('#cart-count');

  let totalQuantity = 0;
  cartItems.forEach(item => {
    totalQuantity += item.quantity || 1;
  });
  console.log('cartUtils: totalQuantity =', totalQuantity);

  indicators.forEach(indicator => {
    indicator.textContent = totalQuantity;
    indicator.style.display = totalQuantity > 0 ? 'flex' : 'none';
  });
});