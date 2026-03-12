document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("nav");
  hamburger.addEventListener("click", function () {
    nav.classList.toggle("active");
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
  produkInput.value = id;
  const textInput = document.getElementById("productInput");
  if (textInput) {
    textInput.value = name + " (" + price + ")";
  }
  closeMenu();
}

function handleSubmit(event) {
  event.preventDefault();
  const produkInput = document.getElementById("produk");
  if (!produkInput.value) {
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

document.addEventListener("DOMContentLoaded", function () {

  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("nav");

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      nav.classList.toggle("active");
    });
  }

  // katalog halaman koleksi
  const menuGrid = document.getElementById("koleksibuket");

  if (menuGrid) {

    products.forEach((product) => {
      const article = document.createElement("article");
      article.classList.add("menu-item");

      article.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">${product.price}</p>
        <div class="article-buttons">
          <a href="/pages/pemesanan/">Pesan Sekarang</a>
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

});