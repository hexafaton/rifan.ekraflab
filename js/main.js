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
  showNotification(`${product.name} telah ditambahkan ke keranjang!`, "success");
}

function showNotification(message, type = "success") {
  let container = document.getElementById("notificationContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "notificationContainer";
    container.className = "notification-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `notification-toast ${type}`;
  toast.innerHTML = `
    <div class="notification-body">
      <span class="notification-text">${message}</span>
      <button type="button" class="notification-close" aria-label="Tutup notifikasi">&times;</button>
    </div>
  `;

  const closeButton = toast.querySelector(".notification-close");
  closeButton.addEventListener("click", () => {
    toast.classList.remove("visible");
    setTimeout(() => toast.remove(), 250);
  });

  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("visible"));

  setTimeout(() => {
    toast.classList.remove("visible");
    setTimeout(() => toast.remove(), 250);
  }, 3800);
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

function buildCartContent(cart) {
  let total = 0;
  const itemsHtml = cart.map(item => {
    const itemTotal = parseInt(item.price.replace(/[^\d]/g, "")) * item.quantity;
    total += itemTotal;
    return `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" />
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p>${item.quantity} x ${item.price}</p>
          <button type="button" class="remove-button" onclick="removeCartItem(${item.id})">Hapus</button>
        </div>
        <span class="item-total">Rp${itemTotal.toLocaleString()}</span>
      </div>
    `;
  }).join("");

  return `
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
}

function renderCartContent() {
  const panel = document.getElementById("cartPanel");
  if (!panel) return;
  const cart = getCart();
  if (cart.length === 0) {
    closeCartModal();
    return;
  }
  panel.querySelector(".cart-content").innerHTML = buildCartContent(cart);
}

function showCartModal() {
  const cart = getCart();
  if (cart.length === 0) {
    showNotification("Keranjang kosong. Tambahkan produk terlebih dahulu.", "warning");
    return;
  }

  if (document.getElementById("cartPanel")) {
    renderCartContent();
    return;
  }

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
      ${buildCartContent(cart)}
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

function removeCartItem(productId) {
  const itemEl = document.querySelector(`.cart-item[data-id="${productId}"]`);
  if (itemEl) {
    itemEl.classList.add("removing");
  }

  setTimeout(() => {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== productId);
    saveCart(updatedCart);
    updateCartBadge();
    if (updatedCart.length === 0) {
      closeCartModal();
    } else {
      renderCartContent();
    }
  }, 250);
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
  const cart = getCart();
  if (cart.length === 0) {
    showNotification("Keranjang kosong. Tambahkan produk terlebih dahulu.", "warning");
    return;
  }
  window.location.href = "/pages/pemesanan/";
}

function togglePaymentInfo(method) {
  const qrisInfo = document.getElementById("qrisInfo");
  const cashInfo = document.getElementById("cashInfo");
  if (!qrisInfo || !cashInfo) return;

  if (method === "cash") {
    qrisInfo.classList.add("hidden");
    cashInfo.classList.remove("hidden");
  } else {
    qrisInfo.classList.remove("hidden");
    cashInfo.classList.add("hidden");
  }
}

function renderPaymentPage() {
  const checkoutSummary = document.getElementById("checkoutSummary");
  const paymentForm = document.getElementById("paymentForm");
  const paymentAmount = document.getElementById("paymentAmount");
  const orderTotal = document.getElementById("orderTotal");

  if (!checkoutSummary || !paymentForm || !paymentAmount || !orderTotal) return;

  const cart = getCart();
  if (cart.length === 0) {
    checkoutSummary.innerHTML = `<p class="empty-cart-message">Keranjang Anda kosong. <a href="/">Kembali belanja</a></p>`;
    paymentForm.style.display = "none";
    return;
  }

  const itemsHtml = cart.map(item => {
    const priceValue = parseInt(item.price.replace(/[^\d]/g, "")) || 0;
    const subtotal = priceValue * item.quantity;
    return `
      <div class="summary-item">
        <img class="summary-thumb" src="${item.image}" alt="${item.name}" />
        <div class="summary-item-left">
          <strong>${item.name}</strong>
          <span>${item.quantity} x ${item.price}</span>
        </div>
        <div class="summary-item-right">Rp${subtotal.toLocaleString()}</div>
      </div>
    `;
  }).join("");

  const totalAmount = cart.reduce((sum, item) => {
    const priceValue = parseInt(item.price.replace(/[^\d]/g, "")) || 0;
    return sum + priceValue * item.quantity;
  }, 0);

  checkoutSummary.innerHTML = `
    <div class="summary-list">${itemsHtml}</div>
    <div class="summary-total">
      <span>Total Pesanan</span>
      <strong>Rp${totalAmount.toLocaleString()}</strong>
    </div>
  `;

  paymentAmount.textContent = `Rp${totalAmount.toLocaleString()}`;
  orderTotal.value = totalAmount;
  paymentForm.style.display = "block";
}

function handlePaymentSubmit(event) {
  event.preventDefault();

  const cart = getCart();
  if (cart.length === 0) {
    alert("Keranjang kosong. Tambahkan produk terlebih dahulu.");
    window.location.href = "/";
    return;
  }

  const customerName = document.getElementById("customerName").value.trim();
  const customerPhone = document.getElementById("customerPhone").value.trim();
  const customerAddress = document.getElementById("customerAddress").value.trim();
  const orderNote = document.getElementById("orderNote").value.trim();
  const paymentMethod = document.querySelector("input[name='paymentMethod']:checked").value;

  if (!customerName || !customerPhone || !customerAddress) {
    alert("Silakan lengkapi semua data pelanggan sebelum melanjutkan.");
    return;
  }

  const totalAmount = parseInt(document.getElementById("orderTotal").value || "0", 10);
  const methodLabel = paymentMethod === "cash" ? "Cash" : "QRIS";
  const sellerPhone = "6282337445657";

  const items = cart.map(item => `${item.quantity}x ${item.name} (${item.price})`).join("\n");
  let message = `Halo Buket AE, saya ingin memesan:\n${items}\n\nNama: ${customerName}\nWA: ${customerPhone}\nAlamat: ${customerAddress}\nMetode: ${methodLabel}\nTotal: Rp${totalAmount.toLocaleString()}`;
  if (orderNote) {
    message += `\nCatatan: ${orderNote}`;
  }

  const encoded = encodeURIComponent(message);
  const waUrl = `https://wa.me/${sellerPhone}?text=${encoded}`;

  localStorage.removeItem("cart");
  updateCartBadge();
  window.location.href = waUrl;
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

  const headerSearchWrapper = document.querySelector(".header-icons .search-wrapper");
  const mobileSearchRow = document.querySelector(".search-row");

  function updateSearchPosition() {
    if (!headerSearchWrapper || !mobileSearchRow) return;
    const headerIcons = document.querySelector(".header-icons");

    if (window.innerWidth <= 500) {
      if (!mobileSearchRow.contains(headerSearchWrapper)) {
        mobileSearchRow.appendChild(headerSearchWrapper);
      }
    } else {
      if (headerIcons && !headerIcons.contains(headerSearchWrapper)) {
        headerIcons.insertBefore(headerSearchWrapper, headerIcons.firstChild);
      }
    }
  }

  updateSearchPosition();
  window.addEventListener("resize", updateSearchPosition);

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
  renderPaymentPage();
});