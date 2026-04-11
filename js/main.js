document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener("click", function (event) {
    event.stopPropagation();
    navMenu.classList.toggle("active");
  });

  // Tutup menu saat klik di luar
  document.addEventListener("click", function(event) {
    if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
      navMenu.classList.remove("active");
    }
  });
});

let selectedProductId = "";
let selectedProductName = "";
let selectedProductPrice = "";

function openMenu() {
  document.getElementById("menuModal").style.display = "block";
}

function closeMenu() {
  document.getElementById("menuModal").style.display = "none";
}

function selectFromCatalog(id, name, price) {
  selectedProductId = id;
  selectedProductName = name;
  selectedProductPrice = price;
  const produkInput = document.getElementById("produk");
  if (produkInput) produkInput.value = id;
  const textInput = document.getElementById("productInput");
  if (textInput) {
    textInput.value = name + " (" + price + ")";
  }
  closeMenu();
}

function handleSubmit(event) {
  event.preventDefault();
  const produkInput = document.getElementById("produk");
  if (!produkInput || !produkInput.value) {
    alert("Silakan pilih produk terlebih dahulu.");
    return;
  }
  alert("Pesanan Anda telah dikirim!");
  location.reload();
}

function handleKontakSubmit(event) {
  event.preventDefault();
  alert("Terima kasih! Pesan Anda telah dikirim.");
  location.reload();
}

window.onclick = function (event) {
  const menuModal = document.getElementById("menuModal");
  if (event.target == menuModal) {
    menuModal.style.display = "none";
  }
};

const products = [
  {
    id: 1,
    name: "Fresh Flower Buket",
    price: "Rp120.000",
    image: "/public/product/buket-fresh-flower.webp",
  },
  {
    id: 2,
    name: "Buket Kawat Bulu",
    price: "Rp150.000",
    image: "/public/buketdis.jpeg",
  },
  {
    id: 3,
    name: "Bunga Satin Coklat",
    price: "Rp180.000",
    image: "/public/product/buket-bunga-satin-coklat.webp",
  },
  {
    id: 4,
    name: "Buket Uang",
    price: "Rp200.000",
    image: "/public/product/buket-uang.webp",
  },
];

// Cart functionality
function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(productId) {
  const cart = getCart();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart(cart);
  updateCartBadge();
  alert(`${product.name} telah ditambahkan ke keranjang!`);
}

function updateCartBadge() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badges = document.querySelectorAll(".cart-badge");
  badges.forEach(badge => {
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? "inline" : "none";
  });
}

function showCartModal() {
  const cart = getCart();
  if (cart.length === 0) {
    alert("Keranjang kosong!");
    return;
  }

  let total = 0;
  const itemsHtml = cart.map(item => {
    const itemTotal = parseInt(item.price.replace(/[^\d]/g, "")) * item.quantity;
    total += itemTotal;
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" />
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p>${item.quantity} x ${item.price}</p>
        </div>
        <span class="item-total">Rp${itemTotal.toLocaleString()}</span>
      </div>
    `;
  }).join("");

  const modalContent = `
    <div class="cart-header">
      <div>
        <p class="cart-title">Keranjang Belanja</p>
        <p class="cart-count">${cart.reduce((sum, item) => sum + item.quantity, 0)} item</p>
      </div>
      <button class="close" onclick="closeCartModal()">&times;</button>
    </div>
    <div class="cart-items">
      ${itemsHtml}
    </div>
    <div class="cart-summary">
      <span>Total</span>
      <strong>Rp${total.toLocaleString()}</strong>
    </div>
    <button class="cart-checkout" onclick="checkout()">Checkout</button>
  `;

  // Create overlay
  const overlay = document.createElement("div");
  overlay.id = "cartOverlay";
  overlay.className = "cart-overlay";
  overlay.onclick = closeCartModal;

  // Create slide panel
  const panel = document.createElement("div");
  panel.id = "cartPanel";
  panel.className = "cart-panel";
  panel.innerHTML = `
    <div class="cart-content">
      ${modalContent}
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(panel);
  // Trigger slide in
  setTimeout(() => {
    panel.classList.add("active");
    overlay.classList.add("active");
  }, 10);
}

function closeCartModal() {
  const panel = document.getElementById("cartPanel");
  const overlay = document.getElementById("cartOverlay");
  if (panel) {
    panel.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
    setTimeout(() => {
      if (overlay) overlay.remove();
      panel.remove();
    }, 300); // Wait for animation
  }
}

function checkout() {
  alert("Terima kasih! Pesanan Anda akan diproses.");
  localStorage.removeItem("cart");
  updateCartBadge();
  closeCartModal();
}

document.addEventListener("DOMContentLoaded", function () {
  // katalog halaman koleksi
  const menuGrid = document.getElementById("koleksibuket");

  if (menuGrid) {
    const searchQuery = localStorage.getItem("searchQuery");
    let filteredProducts = products;

    if (searchQuery) {
      filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      // Hapus query setelah digunakan
      localStorage.removeItem("searchQuery");
    }

    filteredProducts.forEach((product) => {
      const article = document.createElement("article");
      article.classList.add("menu-item");

      article.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">${product.price}</p>
        <div class="article-buttons">
          <button type="button" class="btn-pesan" onclick="addToCart(${product.id})">Pesan Sekarang</button>
        </div>
      `;

      menuGrid.appendChild(article);
    });
  }

  // katalog di modal
  const modalList = document.getElementById("modalProductList");

  if (modalList) {
    products.forEach(product => {
      const article = document.createElement("article");
      article.classList.add("menu-item");

      article.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">${product.price}</p>
      `;

      article.addEventListener("click", function () {
        selectFromCatalog(product.id, product.name, product.price);
      });

      modalList.appendChild(article);
    });
  }

  const searchToggle = document.querySelector(".search-toggle");
  const searchInput = document.getElementById("searchInput");
  const searchWrapper = document.querySelector(".search-wrapper");

  function closeSearch() {
    if (searchWrapper) searchWrapper.classList.remove("active");
    if (searchInput) searchInput.value = "";
  }

  if (searchToggle && searchInput && searchWrapper) {
    searchToggle.addEventListener("click", function (event) {
      event.stopPropagation();
      searchWrapper.classList.add("active");
      searchInput.focus();
    });

    searchInput.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeSearch();
      } else if (event.key === "Enter") {
        const query = searchInput.value.trim();
        if (!query) return;
        const match = products.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );
        if (match.length) {
          // Simpan query pencarian untuk halaman koleksi
          localStorage.setItem("searchQuery", query);
          // Tutup search input
          closeSearch();
          // Tampilkan loading overlay
          const loadingOverlay = document.getElementById("loadingOverlay");
          if (loadingOverlay) {
            loadingOverlay.style.display = "flex";
          }
          // Redirect setelah 2 detik
          setTimeout(() => {
            window.location.href = "/pages/koleksi/";
          }, 2000);
        } else {
          alert(`Maaf, produk dengan kata "${query}" tidak ditemukan.`);
          closeSearch();
        }
      }
    });

    searchInput.addEventListener("blur", function () {
      if (!searchInput.value.trim()) {
        closeSearch();
      }
    });

    document.addEventListener("click", function (event) {
      if (
        searchWrapper.classList.contains("active") &&
        !searchWrapper.contains(event.target)
      ) {
        if (!searchInput.value.trim()) {
          closeSearch();
        }
      }
    });
  }

  const cartButton = document.querySelector(".cart-button");
  if (cartButton) {
    cartButton.addEventListener("click", function () {
      showCartModal();
    });
  }

  // Update cart badge on load
  updateCartBadge();
});