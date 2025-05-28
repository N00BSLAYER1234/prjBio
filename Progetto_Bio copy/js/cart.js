let cart = JSON.parse(localStorage.getItem('biologika-cart')) || [];

function addToCart(product, price) {
  const existing = cart.find(item => item.product === product);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ product, price, quantity: 1 });
  }
  localStorage.setItem('biologika-cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const countElement = document.getElementById('cart-count');
  if (countElement) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    countElement.textContent = totalItems;
    countElement.classList.remove('pop');
    void countElement.offsetWidth;
    countElement.classList.add('pop');
  }
}

async function renderCartItems() {
  const container = document.getElementById('cart-items');
  const totalDisplay = document.getElementById('total-price');
  if (!container) return;

  // Fetch products.json to get images
  const productsData = await fetch('products.json').then(res => res.json());

  container.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = `<p class="text-center col-span-full text-gray-500">Il carrello è vuoto. Torna allo <a href=\"products.html\" class=\"text-blue-500 underline\">shop</a> 🛍️</p>`;
    totalDisplay.textContent = `Totale: €0.00`;
    return;
  }

  cart.forEach((item, index) => {
    const productData = productsData.find(p => p.name === item.product) || {};
    const imgSrc = productData.image || 'assets/images/placeholder.jpg';

    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const div = document.createElement('div');
    div.classList.add('bg-white','p-4','rounded-lg','shadow','flex','items-center','gap-4');

    div.innerHTML = `
      <img src="${imgSrc}" alt="${item.product}" class="w-20 h-20 object-cover rounded" />
      <div class="flex-1">
        <p class="font-bold mb-1">${item.product}</p>
        <p class="text-sm mb-1">Prezzo: €${item.price.toFixed(2)}</p>
        <p class="text-sm mb-1">Quantità: ${item.quantity}</p>
        <p class="text-sm font-semibold">Subtotale: €${itemTotal.toFixed(2)}</p>
      </div>
      <div class="flex flex-col gap-1">
        <button onclick="incrementItem(${index})" class="px-2 py-1 bg-blue-500 text-white rounded">+</button>
        <button onclick="decrementItem(${index})" class="px-2 py-1 bg-blue-500 text-white rounded">-</button>
        <button onclick="removeItem(${index})" class="px-2 py-1 bg-red-600 text-white rounded">Rimuovi</button>
      </div>
    `;

    container.appendChild(div);
  });

  totalDisplay.textContent = `Totale: €${total.toFixed(2)}`;
}

function incrementItem(index) {
  cart[index].quantity += 1;
  localStorage.setItem('biologika-cart', JSON.stringify(cart));
  renderCartItems();
  updateCartCount();
}

function decrementItem(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }
  localStorage.setItem('biologika-cart', JSON.stringify(cart));
  renderCartItems();
  updateCartCount();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem('biologika-cart', JSON.stringify(cart));
  renderCartItems();
  updateCartCount();
}

function emptyCart() {
  cart = [];
  localStorage.removeItem('biologika-cart');
  renderCartItems();
  updateCartCount();
}

function checkout() {
  if (cart.length === 0) {
    alert('Il carrello è vuoto!');
    return;
  }
  alert('Acquisto completato con successo! ');
  emptyCart();
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderCartItems();
});