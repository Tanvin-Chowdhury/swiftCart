const API = "https://fakestoreapi.com/products";
const categoryAPI = "https://fakestoreapi.com/products/categories";

const productGrid = document.getElementById("productGrid");
const categoriesDiv = document.getElementById("categories");
const spinner = document.getElementById("spinner");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");
const cartSidebar = document.getElementById("cartSidebar");
const trendingGrid = document.getElementById("trendingGrid");


let cart = JSON.parse(localStorage.getItem("cart")) || [];

/*INIT*/
document.addEventListener("DOMContentLoaded", () => {
  loadCategories();
  loadTrending();   
  updateCart();
});

/*FETCH PRODUCTS*/
async function loadProducts(url = API) {
  spinner.classList.remove("hidden");
  productGrid.innerHTML = "";

  const res = await fetch(url);
  const data = await res.json();

  spinner.classList.add("hidden");

  data.forEach(product => {
    productGrid.innerHTML += productCard(product);
  });
}

/* TRENDING */
async function loadTrending() {
  trendingGrid.innerHTML = "";

  const res = await fetch(API);
  const data = await res.json();

  data.slice(0, 3).forEach(product => {
    trendingGrid.innerHTML += productCard(product);
  });
}

/* PAGE TOGGLE */
function showHome() {
  document.getElementById("homeSection").classList.remove("hidden");
  document.getElementById("productsSection").classList.add("hidden");
}

function showProducts() {
  document.getElementById("homeSection").classList.add("hidden");
  document.getElementById("productsSection").classList.remove("hidden");

  loadProducts(); 
}


/*FETCH CATEGORIES*/
async function loadCategories() {
  const res = await fetch(categoryAPI);
  const data = await res.json();

  categoriesDiv.innerHTML =
    `<button onclick="loadProducts()" class="category-btn bg-indigo-600 text-white px-4 py-2 rounded">All</button>`;

  data.forEach(cat => {
    categoriesDiv.innerHTML += `
      <button onclick="filterCategory('${cat}', this)"
        class="category-btn bg-gray-200 px-4 py-2 rounded">
        ${cat}
      </button>`;
  });
}

/*FILTER*/
function filterCategory(category, btn) {
  document.querySelectorAll(".category-btn")
    .forEach(b => b.classList.remove("bg-indigo-600","text-white"));

  btn.classList.add("bg-indigo-600","text-white");

  loadProducts(`https://fakestoreapi.com/products/category/${category}`);
}

/*CARD*/
function productCard(product) {
  return `
    <div class="bg-white p-4 rounded-xl shadow">
      <div class="bg-gray-100 mb-[15px] rounded">
        <img src="${product.image}" class="h-[250px] mx-auto object-contain"/>
      </div>
      <div class="flex justify-between">
        <span class="text-xs bg-indigo-100 text-[#0000D1] px-2 py-1 rounded">
          ${product.category}
        </span>
        <p class="text-yellow-500 text-sm"><i class="fa-solid fa-star"></i> ${product.rating.rate} (${product.rating.count})</p>
      </div>
      <h3 class="font-bold mt-2 text-sm mb-[5px] mt-[8px]">
        ${product.title.substring(0,40)}...
      </h3>
      <p class="text-black font-bold">$${product.price}</p>

      <div class="flex justify-between mt-3">
        <button onclick="showDetails(${product.id})"
          class="text-sm bg-gray-100 border-1 px-3 py-1 rounded w-[175px] h-[35px] hover:bg-gray-300 shadow"><i class="fa-regular fa-eye"></i>
          Details
        </button>
        <button onclick="addToCart(${product.id})"
          class="text-sm bg-[#0000D1] text-white px-3 py-1 rounded w-[175px] h-[35px] hover:bg-[#2E2EFF]">
          <i class="fa-solid fa-cart-shopping mr-[5px]"></i>
          Add
        </button>
      </div>
    </div>
  `;
}

/* TOAST NOTIFICATION */
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;

  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 2000);
}


/*DETAILS MODAL*/
async function showDetails(id) {
  const res = await fetch(`${API}/${id}`);
  const product = await res.json();

  document.getElementById("modalContent").innerHTML = `
    <img src="${product.image}" class="h-40 mx-auto object-contain"/>
    <h3 class="font-bold mt-2">${product.title}</h3>
    <p class="text-sm text-gray-600 mt-2">${product.description}</p>
    <div class="flex justify-between">
      <p class="font-bold mt-2 mb-2">$${product.price}</p>
      <p class="text-yellow-500 text-sm"><i class="fa-solid fa-star"></i>${product.rating.rate}</p>
    </div>
    <button onclick="addToCart(${product.id})"
      class="bg-[#0000D1] text-white px-4 py-2 rounded mt-3">
      Add to Cart
    </button>
  `;

  document.getElementById("modal").classList.remove("hidden");
  document.getElementById("modal").classList.add("flex");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

/*CART*/
async function addToCart(id) {
  const res = await fetch(`${API}/${id}`);
  const product = await res.json();

  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
  showToast("Item added to cart");
}

function updateCart() {
  cartCount.innerText = cart.length;
  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    cartItems.innerHTML += `
      <div class="flex justify-between items-center mb-2">
        <span class="text-sm">${item.title.substring(0,20)}</span>
        <button onclick="removeItem(${index})" class="text-red-500">X</button>
      </div>
    `;
  });

  totalPriceEl.innerText = total.toFixed(2);
}

function removeItem(index) {
  cart.splice(index,1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

/*TOGGLE CART*/
document.getElementById("cartBtn").addEventListener("click", () => {
  cartSidebar.classList.toggle("translate-x-full");
});


