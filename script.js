const products = [
  { id: "luna", name: "Luna Shoulder", type: "Shoulder bag", style: "shoulder", color: "blush", colorName: "Dusty blush", price: 245, newest: 12, tone: "blush", bg: "blush", angle: "-4deg", description: "A softly structured shoulder bag with an easy, curved silhouette. Luna keeps the essentials close without ever feeling overdone.", sizes: ["Small", "Regular"], best: true, new: true },
  { id: "serein", name: "Serein Tote", type: "Tote", style: "tote", color: "olive", colorName: "Sage", price: 295, newest: 11, tone: "olive", bg: "olive", angle: "4deg", description: "Roomy, considered and quietly generous. Serein is the tote that turns a full day into a graceful one.", sizes: ["Regular", "Large"], best: true, new: true },
  { id: "noa", name: "Noa Mini", type: "Crossbody", style: "crossbody", color: "cocoa", colorName: "Cocoa", price: 185, newest: 10, tone: "cocoa", bg: "cocoa", angle: "-7deg", description: "The little bag with a point of view. Noa carries the essentials in a compact, softly rounded frame.", sizes: ["Mini"], best: false, new: true },
  { id: "celeste", name: "Céleste Clutch", type: "Clutch", style: "clutch", color: "cream", colorName: "Oat milk", price: 165, newest: 9, tone: "cream", bg: "cream", angle: "3deg", description: "An evening shape with an everyday spirit. Céleste folds neatly into the moments that deserve a little polish.", sizes: ["One size"], best: true, new: false },
  { id: "mara", name: "Mara Frame", type: "Shoulder bag", style: "shoulder", color: "black", colorName: "Ink", price: 320, newest: 8, tone: "black", bg: "black", angle: "-3deg", description: "A clean frame, a tactile finish and just enough room for your rituals. Mara is made for the hours after dark.", sizes: ["Regular"], best: false, new: false },
  { id: "alma", name: "Alma Carryall", type: "Tote", style: "tote", color: "tan", colorName: "Toasted almond", price: 340, newest: 7, tone: "tan", bg: "tan", angle: "6deg", description: "Alma is a generous carryall designed to hold the day without losing its shape or its sense of ease.", sizes: ["Large"], best: false, new: false },
  { id: "iris", name: "Iris Pouch", type: "Clutch", style: "clutch", color: "lilac", colorName: "Dusty lilac", price: 140, newest: 6, tone: "lilac", bg: "lilac", angle: "-5deg", description: "A small, softly padded pouch for evenings that begin with one plan and end somewhere better.", sizes: ["One size"], best: false, new: false },
  { id: "thea", name: "Théa Crossbody", type: "Crossbody", style: "crossbody", color: "rust", colorName: "Burnt sienna", price: 210, newest: 5, tone: "rust", bg: "rust", angle: "4deg", description: "Théa brings a warm note to the everyday. Wear it close, across, or however the day asks.", sizes: ["Regular"], best: true, new: false },
  { id: "nella", name: "Nella Soft Tote", type: "Tote", style: "tote", color: "cream", colorName: "Porcelain", price: 270, newest: 4, tone: "cream", bg: "cream", angle: "-4deg", description: "Supple enough to settle in, structured enough to keep up. Nella is a study in balance.", sizes: ["Regular"], best: false, new: false },
  { id: "ava", name: "Ava Half Moon", type: "Shoulder bag", style: "shoulder", color: "blush", colorName: "Rosewater", price: 230, newest: 3, tone: "blush", bg: "blush", angle: "5deg", description: "A moon-shaped shoulder bag with a soft edge and a surprisingly spacious interior.", sizes: ["Regular"], best: false, new: false },
  { id: "olive", name: "Olive Envelope", type: "Clutch", style: "clutch", color: "olive", colorName: "Moss", price: 155, newest: 2, tone: "olive", bg: "olive", angle: "-3deg", description: "The finishing touch. Olive slips under your arm with a quiet confidence that never needs to announce itself.", sizes: ["One size"], best: false, new: false },
  { id: "mila", name: "Mila Day Bag", type: "Crossbody", style: "crossbody", color: "cocoa", colorName: "Espresso", price: 255, newest: 1, tone: "cocoa", bg: "cocoa", angle: "3deg", description: "Mila is the one you reach for without thinking — a polished companion for all the in-between places.", sizes: ["Regular", "Large"], best: false, new: false },
];

const state = {
  cart: JSON.parse(localStorage.getItem("modele-cart") || "[]"),
  filters: { style: [], color: [], price: "all" },
  sort: "featured",
  selectedProduct: null,
  selectedSize: null,
  selectedColor: null,
};

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
const money = value => `$${value.toLocaleString("en-US")}`;
const findProduct = id => products.find(product => product.id === id);

function bagArt(product, extraClass = "") {
  return `<div class="product-image art-bg-${product.bg} ${extraClass}" data-open-product="${product.id}" style="--angle:${product.angle}">
    <div class="bag-visual tone-${product.tone}" style="--angle:${product.angle}"><i></i></div>
  </div>`;
}

function productCard(product) {
  return `<article class="product-card">
    ${bagArt(product)}
    <div class="product-info">
      <div><h3><a href="#product/${product.id}">${product.name}</a></h3><p>${product.type} · ${product.colorName}</p></div>
      <div><span class="product-price">${money(product.price)}</span><button class="wishlist" type="button" aria-label="Save ${product.name}">♡</button></div>
    </div>
  </article>`;
}

function renderHome() {
  $$('[data-product-grid="new"]').forEach(grid => {
    grid.innerHTML = products.filter(product => product.new).slice(0, 4).map(productCard).join("");
  });
  $$('[data-product-grid="best"]').forEach(grid => {
    grid.innerHTML = products.filter(product => product.best).slice(0, 4).map(productCard).join("");
  });
}

function renderShop() {
  const grid = $("#catalog-grid");
  if (!grid) return;
  let visible = [...products];
  const { style, color, price } = state.filters;
  if (style.length) visible = visible.filter(product => style.includes(product.style));
  if (color.length) visible = visible.filter(product => color.includes(product.color));
  if (price === "under-200") visible = visible.filter(product => product.price < 200);
  if (price === "200-300") visible = visible.filter(product => product.price >= 200 && product.price <= 300);
  if (price === "over-300") visible = visible.filter(product => product.price > 300);
  if (state.sort === "newest") visible.sort((a, b) => b.newest - a.newest);
  if (state.sort === "price-low") visible.sort((a, b) => a.price - b.price);
  if (state.sort === "price-high") visible.sort((a, b) => b.price - a.price);
  $(".results-count").textContent = `${visible.length} ${visible.length === 1 ? "piece" : "pieces"}`;
  const activeCount = style.length + color.length + (price === "all" ? 0 : 1);
  $(".filter-active-count").textContent = activeCount ? `(${activeCount})` : "";
  grid.innerHTML = visible.length ? visible.map(productCard).join("") : `<div class="no-results"><h3>Nothing quite yet.</h3><p>Try softening your filters to see more of the collection.</p></div>`;
}

function renderProduct(id) {
  const product = findProduct(id) || products[0];
  state.selectedProduct = product;
  state.selectedSize = product.sizes[0];
  state.selectedColor = product.color;
  const detail = $("#product-detail");
  const gallery = [product, { ...product, angle: "-8deg" }, { ...product, angle: "6deg" }];
  detail.innerHTML = `<div class="product-detail-grid">
    <div class="product-gallery">${gallery.map((item, index) => bagArt(item, index === 0 ? "product-main-image" : "")).join("")}</div>
    <div class="product-content">
      <a class="back-link" href="#shop">← Back to collection</a>
      <p class="eyebrow">${product.type} · Modèle studio</p>
      <h1>${product.name}</h1>
      <p class="detail-price">${money(product.price)}</p>
      <p class="detail-description">${product.description} Designed as a fictional demo piece with an easy interior and a shape that softens beautifully over time.</p>
      <div class="option-block"><span class="option-label">Color · ${product.colorName}</span><div class="option-buttons"><button class="color-choice selected" style="--swatch:${getSwatch(product.color)}" aria-label="${product.colorName}"></button></div></div>
      <div class="option-block"><span class="option-label">Size</span><div class="option-buttons">${product.sizes.map(size => `<button class="option-button ${size === state.selectedSize ? "selected" : ""}" data-size="${size}" type="button">${size}</button>`).join("")}</div></div>
      <div class="detail-actions"><button class="button button-dark add-detail" type="button">Add to bag <span>↗</span></button><button class="button button-outline detail-save" type="button">Save ♡</button></div>
    </div>
  </div>
  <div class="related-products"><div class="section-heading"><h2>You may also like</h2><a class="text-link" href="#shop">View all <span>↗</span></a></div><div class="product-grid">${products.filter(item => item.id !== product.id).slice(0, 4).map(productCard).join("")}</div></div>`;
}

function getSwatch(color) {
  return { blush: "#dfbebb", cocoa: "#56352c", cream: "#e9dfcd", olive: "#879076", black: "#252321", tan: "#b9906d", lilac: "#a99aa8", rust: "#9d5941" }[color] || "#c9b6a6";
}

function cartCount() {
  return state.cart.reduce((total, item) => total + item.quantity, 0);
}

function saveCart() {
  localStorage.setItem("modele-cart", JSON.stringify(state.cart));
  $$(".cart-count").forEach(element => element.textContent = cartCount());
}

function addToCart(product, size = product.sizes[0]) {
  const existing = state.cart.find(item => item.id === product.id && item.size === size);
  if (existing) existing.quantity += 1;
  else state.cart.push({ id: product.id, size, quantity: 1 });
  saveCart();
  showToast(`${product.name} added to your bag`);
}

function updateCart(id, size, change) {
  const item = state.cart.find(entry => entry.id === id && entry.size === size);
  if (!item) return;
  item.quantity += change;
  if (item.quantity < 1) state.cart = state.cart.filter(entry => !(entry.id === id && entry.size === size));
  saveCart();
  renderCart();
}

function cartSubtotal() {
  return state.cart.reduce((total, item) => total + (findProduct(item.id)?.price || 0) * item.quantity, 0);
}

function renderCart() {
  const view = $("#cart-view");
  if (!view) return;
  $(".cart-title-count").textContent = `(${cartCount()})`;
  if (!state.cart.length) {
    view.innerHTML = `<div class="cart-empty"><p class="eyebrow">A little empty here</p><h2>Your bag is waiting<br /><em>for something lovely.</em></h2><a href="#shop" class="button button-dark">Explore the collection <span>↗</span></a></div>`;
    return;
  }
  const itemMarkup = state.cart.map(item => {
    const product = findProduct(item.id);
    return `<div class="cart-item">${bagArt(product, "cart-item-image")}<div class="cart-item-info"><h3>${product.name}</h3><p>${product.colorName} · ${item.size}</p><div class="qty-control"><button type="button" data-cart-action="decrease" data-id="${item.id}" data-size="${item.size}">−</button><span>${item.quantity}</span><button type="button" data-cart-action="increase" data-id="${item.id}" data-size="${item.size}">+</button></div></div><div class="cart-item-end"><span class="cart-item-price">${money(product.price * item.quantity)}</span><button class="remove-item" type="button" data-cart-action="remove" data-id="${item.id}" data-size="${item.size}">Remove</button></div></div>`;
  }).join("");
  const subtotal = cartSubtotal();
  view.innerHTML = `<div class="cart-layout"><div class="cart-items">${itemMarkup}</div><aside class="cart-summary"><h3>Summary</h3><div class="summary-line"><span>Subtotal</span><span>${money(subtotal)}</span></div><div class="summary-line muted"><span>Delivery</span><span>${subtotal >= 250 ? "Complimentary" : money(12)}</span></div><div class="promo-row"><input id="promo-code" placeholder="Promo code" /><button type="button" id="apply-promo">Apply</button></div><div class="summary-line summary-total"><strong>Total</strong><strong>${money(subtotal >= 250 ? subtotal : subtotal + 12)}</strong></div><a href="#checkout" class="button button-dark">Checkout via WhatsApp <span>↗</span></a><p class="shipping-note">Demo only · no message will be sent</p></aside></div>`;
}

function renderCheckout() {
  const summary = $("#checkout-summary");
  if (!summary) return;
  const subtotal = cartSubtotal();
  if (!state.cart.length) {
    summary.innerHTML = `<h3>Your order</h3><p class="body-copy">Your bag is empty. <a href="#shop"><u>Choose a piece</u></a> to begin.</p>`;
    return;
  }
  const lines = state.cart.map(item => {
    const product = findProduct(item.id);
    return `<div class="mini-item"><div><div class="mini-thumb art-bg-${product.bg}"><div class="bag-visual tone-${product.tone}"></div></div><span>${product.name}<br /><small>${item.size} × ${item.quantity}</small></span></div><span>${money(product.price * item.quantity)}</span></div>`;
  }).join("");
  summary.innerHTML = `<h3>Your order</h3>${lines}<div class="summary-line"><span>Subtotal</span><span>${money(subtotal)}</span></div><div class="summary-line muted"><span>Delivery</span><span>${subtotal >= 250 ? "Complimentary" : money(12)}</span></div><div class="summary-line summary-total"><strong>Total</strong><strong>${money(subtotal >= 250 ? subtotal : subtotal + 12)}</strong></div>`;
}

function showToast(message) {
  const toast = $(".toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function showPage(route) {
  const [page, id] = route.split("/");
  const target = ["home", "shop", "product", "cart", "checkout", "about", "contact"].includes(page) ? page : "home";
  $$(".page").forEach(element => element.classList.toggle("active", element.dataset.page === target));
  $$("[data-route]").forEach(link => link.classList.toggle("active", link.dataset.route === target));
  if (target === "product") renderProduct(id);
  if (target === "shop") renderShop();
  if (target === "cart") renderCart();
  if (target === "checkout") renderCheckout();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openModal() {
  const formData = new FormData($("#checkout-form"));
  const customer = formData.get("name") || "Sofia Example";
  const summary = $("#modal-summary");
  summary.innerHTML = `<div class="modal-order-lines">${state.cart.map(item => { const product = findProduct(item.id); return `<p><span>${product.name} × ${item.quantity}</span><strong>${money(product.price * item.quantity)}</strong></p>`; }).join("")}<p><span>Delivery</span><strong>${cartSubtotal() >= 250 ? "Complimentary" : money(12)}</strong></p><p><span>For</span><strong>${customer}</strong></p></div>`;
  $(".modal-backdrop").classList.add("open");
  $(".modal-backdrop").setAttribute("aria-hidden", "false");
  document.body.classList.add("is-locked");
}

function closeModal() {
  $(".modal-backdrop").classList.remove("open");
  $(".modal-backdrop").setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-locked");
}

document.addEventListener("click", event => {
  const productTrigger = event.target.closest("[data-open-product]");
  if (productTrigger) window.location.hash = `#product/${productTrigger.dataset.openProduct}`;
  const wishlist = event.target.closest(".wishlist, .detail-save");
  if (wishlist) { wishlist.classList.toggle("saved"); showToast(wishlist.classList.contains("saved") ? "Saved to your edit" : "Removed from your edit"); }
  if (event.target.closest(".add-detail")) addToCart(state.selectedProduct, state.selectedSize);
  const cartAction = event.target.closest("[data-cart-action]");
  if (cartAction) {
    const { cartAction: action, id, size } = cartAction.dataset;
    if (action === "increase") updateCart(id, size, 1);
    if (action === "decrease") updateCart(id, size, -1);
    if (action === "remove") { state.cart = state.cart.filter(item => !(item.id === id && item.size === size)); saveCart(); renderCart(); showToast("Piece removed from your bag"); }
  }
  const sizeButton = event.target.closest("[data-size]");
  if (sizeButton) { state.selectedSize = sizeButton.dataset.size; $$(".option-button").forEach(button => button.classList.toggle("selected", button === sizeButton)); }
  if (event.target.closest(".filter-trigger")) $(".filter-drawer").classList.toggle("open");
  if (event.target.closest(".filter-close")) { state.filters = { style: [], color: [], price: "all" }; $$('input[name="style"], input[name="color"]').forEach(input => input.checked = false); $('input[name="price"][value="all"]').checked = true; renderShop(); }
  if (event.target.closest("#apply-promo")) {
    const code = $("#promo-code").value.trim().toUpperCase();
    showToast(code === "MODELE10" ? "Demo code applied: 10% off" : "Try MODELE10 for the demo");
  }
  if (event.target.closest(".modal-close") || event.target.closest(".modal-backdrop") === event.target) closeModal();
  if (event.target.closest(".mobile-close") || event.target.closest(".mobile-menu a")) { $(".mobile-menu").classList.remove("open"); document.body.classList.remove("is-locked"); }
  if (event.target.closest(".search-toggle")) { $(".search-panel").classList.toggle("open"); $(".search-panel").setAttribute("aria-hidden", $(".search-panel").classList.contains("open") ? "false" : "true"); if ($(".search-panel").classList.contains("open")) setTimeout(() => $("#site-search").focus(), 50); }
  if (event.target.closest(".search-submit")) {
    const query = $("#site-search").value.trim().toLowerCase();
    window.location.hash = "#shop";
    setTimeout(() => { state.filters = { style: [], color: [], price: "all" }; renderShop(); if (query) { const matches = products.filter(product => `${product.name} ${product.type} ${product.colorName}`.toLowerCase().includes(query)); $("#catalog-grid").innerHTML = matches.length ? matches.map(productCard).join("") : `<div class="no-results"><h3>No exact match yet.</h3><p>Try another word from our collection.</p></div>`; $(".results-count").textContent = `${matches.length} results`; } }, 50);
    $(".search-panel").classList.remove("open");
  }
});

document.addEventListener("change", event => {
  if (event.target.matches('input[name="style"], input[name="color"]')) {
    const name = event.target.name;
    state.filters[name] = $$(`input[name="${name}"]:checked`).map(input => input.value);
    renderShop();
  }
  if (event.target.matches('input[name="price"]')) { state.filters.price = event.target.value; renderShop(); }
  if (event.target.matches("#sort-products")) { state.sort = event.target.value; renderShop(); }
});

document.addEventListener("submit", event => {
  if (event.target.id === "checkout-form") { event.preventDefault(); if (!state.cart.length) { showToast("Your bag is empty"); return; } openModal(); }
  if (event.target.id === "contact-form") { event.preventDefault(); event.target.reset(); showToast("Your demo message is ready to send"); }
});

$(".menu-toggle").addEventListener("click", () => { $(".mobile-menu").classList.add("open"); document.body.classList.add("is-locked"); });
$(".modal-backdrop").addEventListener("click", event => { if (event.target === $(".modal-backdrop")) closeModal(); });
window.addEventListener("hashchange", () => showPage(window.location.hash.replace("#", "") || "home"));

renderHome();
saveCart();
showPage(window.location.hash.replace("#", "") || "home");