const productContainer = document.getElementById("productContainer");
const categoryContainer = document.getElementById("categories");
const trendingContainer = document.getElementById("trending");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ================= Fetch All Products ================= */
async function loadProducts() {
  showLoading();
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  displayProducts(data);
  loadTrending(data);
}
