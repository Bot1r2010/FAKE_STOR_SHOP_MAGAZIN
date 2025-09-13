document.addEventListener('DOMContentLoaded', () => {
  // Create falling stars
  const starsContainer = document.getElementById('stars');
  const createStar = () => {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}vw`;
    star.style.animationDuration = `${Math.random() * 3 + 2}s`; // Random duration between 2-5s
    starsContainer.appendChild(star);
    setTimeout(() => star.remove(), 5000); // Remove star after animation
  };
  setInterval(createStar, 200); // Generate stars every 200ms

  // Fetch products
  const API = 'https://fakestoreapi.com/products';
  const productGrid = document.getElementById('product-grid');
  const loading = document.querySelector('.loading');

  fetch(API)
    .then(res => res.json())
    .then(products => {
      loading.classList.add('hidden');
      products.forEach(item => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
          <img src="${item.image}" alt="${item.title}">
          <h3>${item.title}</h3>
          <p class="category">${item.category}</p>
          <p class="description">${item.description}</p>
          <p class="price">$${item.price}</p>
          <p class="rating">Рейтинг: ${item.rating.rate} (${item.rating.count} отзывов)</p>
          <button data-id="${item.id}">Купить</button>
        `;
        productGrid.appendChild(productCard);
      });

      // Add click event listeners to Buy buttons
      document.querySelectorAll('.product-card button').forEach(button => {
        button.addEventListener('click', () => {
          const productId = button.getAttribute('data-id');
          console.log(`Added product ${productId} to cart`);
          // Add cart functionality here
        });
      });

      // Add click event listeners to Delivery buttons (placeholder)
      document.querySelectorAll('.delivery-card button').forEach(button => {
        button.addEventListener('click', () => {
          const deliveryType = button.parentElement.querySelector('h3').textContent;
          console.log(`Selected delivery option: ${deliveryType}`);
          // Add delivery selection functionality here
        });
      });
    })
    .catch(error => {
      console.error('Error fetching products:', error);
      loading.textContent = 'Ошибка загрузки продуктов';
      loading.classList.remove('hidden');
    });
});