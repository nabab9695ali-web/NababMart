/**
 * NababMart - Main Application Logic
 * Developer: Nabab (nabab9695ali@gmail.com)
 * High-performance, modular ES6+ JavaScript for portfolio & interview presentation
 */

// ==========================================================================
// Application State
// ==========================================================================
const AppState = {
  cart: JSON.parse(localStorage.getItem('nababmart_cart')) || [
    { id: 1, quantity: 1 },
    { id: 5, quantity: 1 }
  ],
  wishlist: JSON.parse(localStorage.getItem('nababmart_wishlist')) || [3, 6],
  theme: localStorage.getItem('nababmart_theme') || 'light',
  appliedCoupon: null,
  activeFilters: {
    category: 'all',
    maxPrice: 150000,
    brands: [],
    minRating: 0,
    minDiscount: 0,
    searchQuery: ''
  },
  sortBy: 'popularity',
  user: JSON.parse(localStorage.getItem('nababmart_user')) || {
    name: 'Nabab',
    email: 'nabab9695ali@gmail.com',
    isLoggedIn: true
  }
};

// ==========================================================================
// DOM Initialization
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initUserAuth();
  populateBrandFilters();
  initCategoryCounts();
  renderProducts();
  renderCart();
  renderWishlist();
  setupEventListeners();
  startFlashSaleTimer();
});

// ==========================================================================
// Theme Management (Dark / Light Mode with LocalStorage)
// ==========================================================================
function initTheme() {
  document.documentElement.setAttribute('data-bs-theme', AppState.theme);
  updateThemeIcon();
}

function toggleTheme() {
  AppState.theme = AppState.theme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-bs-theme', AppState.theme);
  localStorage.setItem('nababmart_theme', AppState.theme);
  updateThemeIcon();
  showToast(`Switched to ${AppState.theme.toUpperCase()} Mode`, 'bi-moon-stars');
}

function updateThemeIcon() {
  const icon = document.getElementById('themeIcon');
  if (!icon) return;
  if (AppState.theme === 'dark') {
    icon.className = 'bi bi-sun-fill text-warning';
  } else {
    icon.className = 'bi bi-moon-stars-fill text-white';
  }
}

// ==========================================================================
// User Authentication & Session
// ==========================================================================
function initUserAuth() {
  const userBtnText = document.getElementById('userAuthName');
  if (userBtnText && AppState.user && AppState.user.isLoggedIn) {
    userBtnText.textContent = AppState.user.name.split(' ')[0];
  }
}

function handleUserLogin() {
  const email = document.getElementById('loginEmail').value;
  const name = email.split('@')[0];
  AppState.user = { name: capitalize(name), email: email, isLoggedIn: true };
  localStorage.setItem('nababmart_user', JSON.stringify(AppState.user));
  initUserAuth();
  
  // Close modal
  const modalEl = document.getElementById('authModal');
  const modalInstance = bootstrap.Modal.getInstance(modalEl);
  if (modalInstance) modalInstance.hide();

  showToast(`Welcome back, ${AppState.user.name}!`, 'bi-person-check-fill');
}

function handleUserRegister() {
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  AppState.user = { name: name, email: email, isLoggedIn: true };
  localStorage.setItem('nababmart_user', JSON.stringify(AppState.user));
  initUserAuth();

  const modalEl = document.getElementById('authModal');
  const modalInstance = bootstrap.Modal.getInstance(modalEl);
  if (modalInstance) modalInstance.hide();

  showToast(`Account created! Welcome, ${name}`, 'bi-check-circle-fill');
}

// ==========================================================================
// Dynamic Filter Options Setup
// ==========================================================================
function populateBrandFilters() {
  const container = document.getElementById('brandFilterContainer');
  if (!container) return;

  // Extract unique brands
  const brands = [...new Set(PRODUCTS_DATA.map(p => p.brand))].sort();

  container.innerHTML = brands.map(brand => {
    const count = PRODUCTS_DATA.filter(p => p.brand === brand).length;
    return `
      <label class="filter-item">
        <span>
          <input type="checkbox" class="brand-checkbox" value="${brand}">
          ${brand}
        </span>
        <span class="filter-badge">${count}</span>
      </label>
    `;
  }).join('');

  // Add event listeners to newly generated brand checkboxes
  container.querySelectorAll('.brand-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      const selectedBrands = Array.from(container.querySelectorAll('.brand-checkbox:checked')).map(el => el.value);
      AppState.activeFilters.brands = selectedBrands;
      renderProducts();
    });
  });
}

function initCategoryCounts() {
  const counts = {
    all: PRODUCTS_DATA.length,
    mobiles: PRODUCTS_DATA.filter(p => p.category === 'mobiles').length,
    electronics: PRODUCTS_DATA.filter(p => p.category === 'electronics').length,
    fashion: PRODUCTS_DATA.filter(p => p.category === 'fashion').length,
    watches: PRODUCTS_DATA.filter(p => p.category === 'watches').length,
    home: PRODUCTS_DATA.filter(p => p.category === 'home').length
  };

  if (document.getElementById('countAll')) document.getElementById('countAll').textContent = counts.all;
  if (document.getElementById('countMobiles')) document.getElementById('countMobiles').textContent = counts.mobiles;
  if (document.getElementById('countElectronics')) document.getElementById('countElectronics').textContent = counts.electronics;
  if (document.getElementById('countFashion')) document.getElementById('countFashion').textContent = counts.fashion;
  if (document.getElementById('countWatches')) document.getElementById('countWatches').textContent = counts.watches;
  if (document.getElementById('countHome')) document.getElementById('countHome').textContent = counts.home;
}

// ==========================================================================
// Product Rendering & Filtering Engine
// ==========================================================================
function renderProducts() {
  const container = document.getElementById('productsGridContainer');
  const resultsCount = document.getElementById('resultsCount');
  const noProducts = document.getElementById('noProductsFound');
  if (!container) return;

  // 1. Filter products
  let filtered = PRODUCTS_DATA.filter(product => {
    // Category filter
    if (AppState.activeFilters.category !== 'all' && product.category !== AppState.activeFilters.category) {
      return false;
    }
    // Price filter
    if (product.price > AppState.activeFilters.maxPrice) {
      return false;
    }
    // Brand filter
    if (AppState.activeFilters.brands.length > 0 && !AppState.activeFilters.brands.includes(product.brand)) {
      return false;
    }
    // Rating filter
    if (product.rating < AppState.activeFilters.minRating) {
      return false;
    }
    // Discount filter
    if (product.discount < AppState.activeFilters.minDiscount) {
      return false;
    }
    // Search query filter
    if (AppState.activeFilters.searchQuery.trim() !== '') {
      const q = AppState.activeFilters.searchQuery.toLowerCase();
      const matchTitle = product.title.toLowerCase().includes(q);
      const matchBrand = product.brand.toLowerCase().includes(q);
      const matchCategory = product.category.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      if (!matchTitle && !matchBrand && !matchCategory && !matchDesc) {
        return false;
      }
    }
    return true;
  });

  // 2. Sort products
  switch (AppState.sortBy) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'discount':
      filtered.sort((a, b) => b.discount - a.discount);
      break;
    case 'popularity':
    default:
      filtered.sort((a, b) => b.ratingCount - a.ratingCount);
      break;
  }

  // Update counters & states
  resultsCount.textContent = `Showing ${filtered.length} of ${PRODUCTS_DATA.length} products`;
  renderActiveFilterChips();

  if (filtered.length === 0) {
    container.innerHTML = '';
    noProducts.classList.remove('d-none');
    return;
  } else {
    noProducts.classList.add('d-none');
  }

  // 3. Render Product Cards
  container.innerHTML = filtered.map(product => {
    const isWishlisted = AppState.wishlist.includes(product.id);
    return `
      <div class="col-12 col-sm-6 col-md-4 col-xl-4">
        <div class="product-card">
          <!-- Badge -->
          ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
          
          <!-- Wishlist Toggle -->
          <button 
            class="btn-wishlist ${isWishlisted ? 'active' : ''}" 
            onclick="toggleWishlist(${product.id})" 
            title="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}"
          >
            <i class="bi ${isWishlisted ? 'bi-heart-fill' : 'bi-heart'}"></i>
          </button>

          <!-- Product Image -->
          <div class="product-image-wrap" onclick="openQuickView(${product.id})">
            <img src="${product.image}" alt="${product.title}" loading="lazy">
          </div>

          <!-- Product Details -->
          <div class="product-brand">${product.brand}</div>
          <h3 class="product-title" onclick="openQuickView(${product.id})" title="${product.title}">
            ${product.title}
          </h3>

          <!-- Rating & Reviews -->
          <div class="d-flex align-items-center mb-1">
            <span class="rating-pill">
              ${product.rating} <i class="bi bi-star-fill"></i>
            </span>
            <span class="rating-count">(${product.ratingCount.toLocaleString()})</span>
          </div>

          <!-- Pricing -->
          <div class="pricing-wrap">
            <span class="current-price">₹${product.price.toLocaleString('en-IN')}</span>
            <span class="original-price">₹${product.originalPrice.toLocaleString('en-IN')}</span>
            <span class="discount-rate">${product.discount}% OFF</span>
          </div>

          <!-- Actions -->
          <div class="card-actions">
            <button class="btn-add-cart" onclick="addToCart(${product.id})">
              <i class="bi bi-cart-plus"></i> Add to Cart
            </button>
            <button class="btn-quick-view" onclick="openQuickView(${product.id})" title="Quick View">
              <i class="bi bi-eye"></i>
            </button>
          </div>

        </div>
      </div>
    `;
  }).join('');
}

// ==========================================================================
// Active Filter Chips
// ==========================================================================
function renderActiveFilterChips() {
  const container = document.getElementById('activeFilterChips');
  if (!container) return;

  const chips = [];

  if (AppState.activeFilters.category !== 'all') {
    chips.push({
      label: `Category: ${capitalize(AppState.activeFilters.category)}`,
      action: () => filterByCategory('all')
    });
  }

  if (AppState.activeFilters.maxPrice < 150000) {
    chips.push({
      label: `Under ₹${AppState.activeFilters.maxPrice.toLocaleString('en-IN')}`,
      action: () => {
        document.getElementById('priceRangeSlider').value = 150000;
        document.getElementById('priceRangeValue').textContent = 'Up to ₹1,50,000';
        AppState.activeFilters.maxPrice = 150000;
        renderProducts();
      }
    });
  }

  AppState.activeFilters.brands.forEach(brand => {
    chips.push({
      label: `Brand: ${brand}`,
      action: () => {
        const cb = document.querySelector(`.brand-checkbox[value="${brand}"]`);
        if (cb) cb.checked = false;
        AppState.activeFilters.brands = AppState.activeFilters.brands.filter(b => b !== brand);
        renderProducts();
      }
    });
  });

  if (AppState.activeFilters.minRating > 0) {
    chips.push({
      label: `${AppState.activeFilters.minRating}★ & above`,
      action: () => {
        document.querySelector('input[name="ratingFilter"][value="0"]').checked = true;
        AppState.activeFilters.minRating = 0;
        renderProducts();
      }
    });
  }

  if (AppState.activeFilters.minDiscount > 0) {
    chips.push({
      label: `${AppState.activeFilters.minDiscount}%+ Discount`,
      action: () => {
        document.querySelector('input[name="discountFilter"][value="0"]').checked = true;
        AppState.activeFilters.minDiscount = 0;
        renderProducts();
      }
    });
  }

  if (AppState.activeFilters.searchQuery.trim() !== '') {
    chips.push({
      label: `Search: "${AppState.activeFilters.searchQuery}"`,
      action: () => {
        document.getElementById('globalSearchInput').value = '';
        AppState.activeFilters.searchQuery = '';
        renderProducts();
      }
    });
  }

  if (chips.length === 0) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = chips.map((chip, idx) => `
    <span class="filter-chip">
      ${chip.label}
      <button onclick="removeFilterChip(${idx})" title="Remove Filter">&times;</button>
    </span>
  `).join('') + `<button class="btn btn-sm btn-link text-danger p-0 ms-2 text-decoration-none" onclick="resetAllFilters()">Clear All</button>`;

  window._activeChipActions = chips.map(c => c.action);
}

window.removeFilterChip = function(index) {
  if (window._activeChipActions && window._activeChipActions[index]) {
    window._activeChipActions[index]();
  }
};

// ==========================================================================
// Category Quick Navigation
// ==========================================================================
function filterByCategory(category) {
  AppState.activeFilters.category = category;

  // Update sidebar radio
  const radio = document.querySelector(`input[name="categoryFilter"][value="${category}"]`);
  if (radio) radio.checked = true;

  // Update ribbon pills
  document.querySelectorAll('.category-pill').forEach(pill => {
    if (pill.getAttribute('data-category') === category) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });

  renderProducts();

  // Scroll smoothly to products grid
  const target = document.querySelector('.store-container');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function applySpecialDiscountFilter() {
  document.querySelector('input[name="discountFilter"][value="30"]').checked = true;
  AppState.activeFilters.minDiscount = 30;
  renderProducts();
  const target = document.querySelector('.store-container');
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  showToast('Showing Deals of the Day (30%+ OFF)', 'bi-lightning-charge-fill');
}

// ==========================================================================
// Smart Search & Autocomplete
// ==========================================================================
function setupEventListeners() {
  // Theme Toggle
  const themeToggle = document.getElementById('themeToggleBtn');
  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

  // Brand Logo Click resets to home
  const homeLink = document.getElementById('homeBrandLink');
  if (homeLink) {
    homeLink.addEventListener('click', (e) => {
      e.preventDefault();
      resetAllFilters();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Category Ribbon Clicks
  document.querySelectorAll('.category-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const cat = pill.getAttribute('data-category');
      filterByCategory(cat);
    });
  });

  // Sidebar Category Radios
  document.querySelectorAll('input[name="categoryFilter"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      filterByCategory(e.target.value);
    });
  });

  // Price Slider
  const priceSlider = document.getElementById('priceRangeSlider');
  const priceLabel = document.getElementById('priceRangeValue');
  if (priceSlider && priceLabel) {
    priceSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      priceLabel.textContent = `Up to ₹${val.toLocaleString('en-IN')}`;
      AppState.activeFilters.maxPrice = val;
      renderProducts();
    });
  }

  // Rating Radios
  document.querySelectorAll('input[name="ratingFilter"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      AppState.activeFilters.minRating = parseFloat(e.target.value);
      renderProducts();
    });
  });

  // Discount Radios
  document.querySelectorAll('input[name="discountFilter"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      AppState.activeFilters.minDiscount = parseInt(e.target.value, 10);
      renderProducts();
    });
  });

  // Sort By Dropdown
  const sortSelect = document.getElementById('sortBySelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      AppState.sortBy = e.target.value;
      renderProducts();
    });
  }

  // Clear All Filters
  const resetBtn = document.getElementById('resetFiltersBtn');
  if (resetBtn) resetBtn.addEventListener('click', resetAllFilters);

  const clearEmptyBtn = document.getElementById('clearSearchFiltersBtn');
  if (clearEmptyBtn) clearEmptyBtn.addEventListener('click', resetAllFilters);

  // Search Input & Dropdown Suggestions
  const searchInput = document.getElementById('globalSearchInput');
  const searchSuggestions = document.getElementById('searchSuggestionsBox');
  const searchBtn = document.getElementById('searchSubmitBtn');

  if (searchInput && searchSuggestions) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      if (query.length < 2) {
        searchSuggestions.classList.remove('active');
        searchSuggestions.innerHTML = '';
        return;
      }

      const matches = PRODUCTS_DATA.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      ).slice(0, 5);

      if (matches.length > 0) {
        searchSuggestions.innerHTML = matches.map(m => `
          <div class="suggestion-item" onclick="selectSearchSuggestion(${m.id})">
            <img src="${m.image}" alt="${m.title}">
            <div class="suggestion-info">
              <div class="suggestion-title">${m.title}</div>
              <div class="suggestion-price">₹${m.price.toLocaleString('en-IN')}</div>
            </div>
            <span class="badge bg-light text-muted border">${m.category}</span>
          </div>
        `).join('');
        searchSuggestions.classList.add('active');
      } else {
        searchSuggestions.innerHTML = `<div class="p-3 text-muted text-center small">No matches found for "${query}"</div>`;
        searchSuggestions.classList.add('active');
      }
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        AppState.activeFilters.searchQuery = searchInput.value;
        searchSuggestions.classList.remove('active');
        renderProducts();
      }
    });

    // Close suggestions on outside click
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
        searchSuggestions.classList.remove('active');
      }
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      if (searchInput) {
        AppState.activeFilters.searchQuery = searchInput.value;
        if (searchSuggestions) searchSuggestions.classList.remove('active');
        renderProducts();
      }
    });
  }

  // Coupon Code Button
  const couponBtn = document.getElementById('applyCouponBtn');
  if (couponBtn) {
    couponBtn.addEventListener('click', applyCouponCode);
  }

  // Checkout Button
  const checkoutBtn = document.getElementById('proceedToCheckoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      // Close cart drawer
      const cartDrawerEl = document.getElementById('cartOffcanvas');
      const cartDrawer = bootstrap.Offcanvas.getInstance(cartDrawerEl);
      if (cartDrawer) cartDrawer.hide();

      // Open checkout modal
      goToCheckoutStep(1);
      const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
      checkoutModal.show();
    });
  }

  // Location / PIN Code
  const applyPinBtn = document.getElementById('applyPincodeBtn');
  if (applyPinBtn) {
    applyPinBtn.addEventListener('click', () => {
      const pin = document.getElementById('pincodeInput').value.trim();
      if (pin.length === 6 && /^\d+$/.test(pin)) {
        setQuickCity(`India ${pin}`);
      } else {
        alert('Please enter a valid 6-digit PIN code.');
      }
    });
  }
}

function selectSearchSuggestion(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;
  const searchInput = document.getElementById('globalSearchInput');
  const searchSuggestions = document.getElementById('searchSuggestionsBox');
  if (searchInput) searchInput.value = product.title;
  if (searchSuggestions) searchSuggestions.classList.remove('active');
  openQuickView(productId);
}

function resetAllFilters() {
  AppState.activeFilters = {
    category: 'all',
    maxPrice: 150000,
    brands: [],
    minRating: 0,
    minDiscount: 0,
    searchQuery: ''
  };

  // Reset form inputs
  const allCatRadio = document.querySelector('input[name="categoryFilter"][value="all"]');
  if (allCatRadio) allCatRadio.checked = true;

  document.querySelectorAll('.brand-checkbox').forEach(cb => cb.checked = false);

  const priceSlider = document.getElementById('priceRangeSlider');
  if (priceSlider) priceSlider.value = 150000;
  const priceLabel = document.getElementById('priceRangeValue');
  if (priceLabel) priceLabel.textContent = 'Up to ₹1,50,000';

  const anyRating = document.querySelector('input[name="ratingFilter"][value="0"]');
  if (anyRating) anyRating.checked = true;

  const anyDiscount = document.querySelector('input[name="discountFilter"][value="0"]');
  if (anyDiscount) anyDiscount.checked = true;

  const searchInput = document.getElementById('globalSearchInput');
  if (searchInput) searchInput.value = '';

  document.querySelectorAll('.category-pill').forEach(p => {
    if (p.getAttribute('data-category') === 'all') p.classList.add('active');
    else p.classList.remove('active');
  });

  renderProducts();
  showToast('All filters cleared', 'bi-arrow-counterclockwise');
}

// ==========================================================================
// Shopping Cart Operations
// ==========================================================================
function addToCart(productId, quantity = 1) {
  const existing = AppState.cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    AppState.cart.push({ id: productId, quantity: quantity });
  }

  saveCart();
  renderCart();

  const product = PRODUCTS_DATA.find(p => p.id === productId);
  showToast(`${product ? product.title.substring(0, 24) + '...' : 'Item'} added to Cart!`, 'bi-cart-check-fill');
}

function removeFromCart(productId) {
  AppState.cart = AppState.cart.filter(item => item.id !== productId);
  saveCart();
  renderCart();
  showToast('Item removed from cart', 'bi-trash-fill');
}

function updateCartQty(productId, delta) {
  const item = AppState.cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem('nababmart_cart', JSON.stringify(AppState.cart));
}

function renderCart() {
  const container = document.getElementById('cartItemsContainer');
  const cartBadge = document.getElementById('cartBadge');
  const drawerCount = document.getElementById('cartDrawerCount');
  const emptyState = document.getElementById('cartEmptyState');
  const checkoutSection = document.getElementById('cartCheckoutSection');
  if (!container) return;

  const totalItemsCount = AppState.cart.reduce((sum, i) => sum + i.quantity, 0);
  if (cartBadge) cartBadge.textContent = totalItemsCount;
  if (drawerCount) drawerCount.textContent = totalItemsCount;

  if (AppState.cart.length === 0) {
    container.innerHTML = '';
    emptyState.classList.remove('d-none');
    checkoutSection.classList.add('d-none');
    return;
  }

  emptyState.classList.add('d-none');
  checkoutSection.classList.remove('d-none');

  let grossPrice = 0;
  let regularDiscount = 0;

  container.innerHTML = AppState.cart.map(cartItem => {
    const product = PRODUCTS_DATA.find(p => p.id === cartItem.id);
    if (!product) return '';

    const itemTotal = product.price * cartItem.quantity;
    const itemOriginal = product.originalPrice * cartItem.quantity;
    grossPrice += itemOriginal;
    regularDiscount += (itemOriginal - itemTotal);

    return `
      <div class="cart-item">
        <img src="${product.image}" alt="${product.title}" class="cart-item-img">
        <div class="cart-item-details">
          <div class="cart-item-title">${product.title}</div>
          <div class="cart-item-price">₹${product.price.toLocaleString('en-IN')}</div>
          
          <div class="d-flex align-items-center">
            <div class="cart-qty-ctrl">
              <button class="qty-btn" onclick="updateCartQty(${product.id}, -1)">-</button>
              <span class="qty-val">${cartItem.quantity}</span>
              <button class="qty-btn" onclick="updateCartQty(${product.id}, 1)">+</button>
            </div>
            <button class="btn-remove-item" onclick="removeFromCart(${product.id})">
              <i class="bi bi-trash"></i> Remove
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Calculations
  const discountedSubtotal = grossPrice - regularDiscount;
  let couponDiscountAmount = 0;

  if (AppState.appliedCoupon) {
    couponDiscountAmount = Math.min(
      Math.round((discountedSubtotal * AppState.appliedCoupon.discountPercent) / 100),
      AppState.appliedCoupon.maxDiscount
    );
  }

  const totalSavings = regularDiscount + couponDiscountAmount;
  const deliveryFee = discountedSubtotal >= 499 ? 0 : 40;
  const finalTotal = discountedSubtotal - couponDiscountAmount + deliveryFee;

  // Update Summary UI
  document.getElementById('summaryTotalItems').textContent = totalItemsCount;
  document.getElementById('summaryGrossPrice').textContent = `₹${grossPrice.toLocaleString('en-IN')}`;
  document.getElementById('summaryDiscount').textContent = `- ₹${totalSavings.toLocaleString('en-IN')}`;
  document.getElementById('summaryDeliveryFee').innerHTML = deliveryFee === 0 
    ? '<span class="text-success fw-bold">FREE</span>' 
    : `₹${deliveryFee}`;
  document.getElementById('summaryNetPrice').textContent = `₹${finalTotal.toLocaleString('en-IN')}`;
  
  const checkoutAmt = document.getElementById('checkoutFinalAmount');
  if (checkoutAmt) checkoutAmt.textContent = `₹${finalTotal.toLocaleString('en-IN')}`;
}

// ==========================================================================
// Coupon Code System
// ==========================================================================
function applyCouponCode() {
  const input = document.getElementById('couponCodeInput');
  const msg = document.getElementById('couponStatusMessage');
  if (!input || !msg) return;

  const code = input.value.trim().toUpperCase();
  if (COUPON_CODES[code]) {
    AppState.appliedCoupon = COUPON_CODES[code];
    msg.innerHTML = `<span class="text-success fw-bold"><i class="bi bi-check-circle-fill"></i> Coupon "${code}" Applied: ${AppState.appliedCoupon.description}</span>`;
    renderCart();
    showToast(`Coupon ${code} applied successfully!`, 'bi-tag-fill');
  } else {
    msg.innerHTML = `<span class="text-danger"><i class="bi bi-x-circle-fill"></i> Invalid Coupon Code. Try <strong>NABAB50</strong></span>`;
  }
}

// ==========================================================================
// Wishlist Operations
// ==========================================================================
function toggleWishlist(productId) {
  const index = AppState.wishlist.indexOf(productId);
  let added = false;
  if (index > -1) {
    AppState.wishlist.splice(index, 1);
  } else {
    AppState.wishlist.push(productId);
    added = true;
  }

  localStorage.setItem('nababmart_wishlist', JSON.stringify(AppState.wishlist));
  renderWishlist();
  renderProducts(); // Refresh heart states

  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (added) {
    showToast(`${product ? product.title.substring(0, 20) + '...' : 'Item'} added to Wishlist!`, 'bi-heart-fill');
  } else {
    showToast('Removed from Wishlist', 'bi-heartbreak');
  }
}

function renderWishlist() {
  const container = document.getElementById('wishlistItemsContainer');
  const badge = document.getElementById('wishlistBadge');
  const drawerCount = document.getElementById('wishlistDrawerCount');
  const emptyState = document.getElementById('wishlistEmptyState');
  if (!container) return;

  const count = AppState.wishlist.length;
  if (badge) badge.textContent = count;
  if (drawerCount) drawerCount.textContent = count;

  if (count === 0) {
    container.innerHTML = '';
    emptyState.classList.remove('d-none');
    return;
  }

  emptyState.classList.add('d-none');

  container.innerHTML = AppState.wishlist.map(id => {
    const product = PRODUCTS_DATA.find(p => p.id === id);
    if (!product) return '';

    return `
      <div class="cart-item">
        <img src="${product.image}" alt="${product.title}" class="cart-item-img">
        <div class="cart-item-details">
          <div class="cart-item-title">${product.title}</div>
          <div class="cart-item-price">₹${product.price.toLocaleString('en-IN')}</div>
          <div class="d-flex gap-2 mt-2">
            <button class="btn btn-sm btn-warning fw-bold text-dark py-1 px-2" onclick="moveWishlistToCart(${product.id})">
              <i class="bi bi-cart-plus"></i> Move to Cart
            </button>
            <button class="btn btn-sm btn-outline-danger py-1 px-2" onclick="toggleWishlist(${product.id})">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function moveWishlistToCart(productId) {
  addToCart(productId, 1);
  toggleWishlist(productId);
  showToast('Item moved from Wishlist to Cart!', 'bi-cart-check-fill');
}

// ==========================================================================
// Product Quick View Modal
// ==========================================================================
function openQuickView(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  document.getElementById('qvCategory').textContent = capitalize(product.category);
  document.getElementById('qvBrand').textContent = product.brand;
  document.getElementById('qvTitle').textContent = product.title;
  document.getElementById('qvRating').innerHTML = `${product.rating} <i class="bi bi-star-fill"></i>`;
  document.getElementById('qvRatingCount').textContent = `(${product.ratingCount.toLocaleString()} ratings)`;
  document.getElementById('qvPrice').textContent = `₹${product.price.toLocaleString('en-IN')}`;
  document.getElementById('qvOriginalPrice').textContent = `₹${product.originalPrice.toLocaleString('en-IN')}`;
  document.getElementById('qvDiscount').textContent = `${product.discount}% OFF`;
  document.getElementById('qvDescription').textContent = product.description;

  // Main Image & Thumbnails
  const mainImg = document.getElementById('qvMainImage');
  const thumbsContainer = document.getElementById('qvThumbnails');
  mainImg.src = product.image;

  const allImages = [product.image, ...(product.additionalImages || [])];
  const uniqueImages = [...new Set(allImages)];

  thumbsContainer.innerHTML = uniqueImages.map((imgUrl, idx) => `
    <img 
      src="${imgUrl}" 
      class="qv-thumb ${idx === 0 ? 'active' : ''}" 
      onclick="switchQuickViewImage('${imgUrl}', this)"
      alt="Thumbnail ${idx + 1}"
    >
  `).join('');

  // Specs Table
  const specsTable = document.getElementById('qvSpecsTable');
  if (product.specs) {
    specsTable.innerHTML = Object.entries(product.specs).map(([k, v]) => `
      <tr>
        <td class="text-muted fw-bold" style="width: 35%;">${k}</td>
        <td>${v}</td>
      </tr>
    `).join('');
  } else {
    specsTable.innerHTML = `<tr><td colspan="2">Standard manufacturer specifications apply.</td></tr>`;
  }

  // Bind Buttons
  const addCartBtn = document.getElementById('qvAddToCartBtn');
  const buyNowBtn = document.getElementById('qvBuyNowBtn');

  addCartBtn.onclick = () => {
    addToCart(product.id, 1);
  };

  buyNowBtn.onclick = () => {
    addToCart(product.id, 1);
    const modalEl = document.getElementById('quickViewModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) modalInstance.hide();

    // Trigger checkout
    goToCheckoutStep(1);
    const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
    checkoutModal.show();
  };

  const modal = new bootstrap.Modal(document.getElementById('quickViewModal'));
  modal.show();
}

function switchQuickViewImage(url, thumbElement) {
  const mainImg = document.getElementById('qvMainImage');
  if (mainImg) mainImg.src = url;
  document.querySelectorAll('.qv-thumb').forEach(t => t.classList.remove('active'));
  if (thumbElement) thumbElement.classList.add('active');
}

// ==========================================================================
// Multi-Step Checkout Flow
// ==========================================================================
function goToCheckoutStep(stepNumber) {
  const step1 = document.getElementById('checkoutStep1');
  const step2 = document.getElementById('checkoutStep2');
  const step3 = document.getElementById('checkoutStep3');

  const ind1 = document.getElementById('stepIndicator1');
  const ind2 = document.getElementById('stepIndicator2');
  const ind3 = document.getElementById('stepIndicator3');

  // Hide all
  step1.classList.add('d-none');
  step2.classList.add('d-none');
  step3.classList.add('d-none');

  ind1.className = 'step-item';
  ind2.className = 'step-item';
  ind3.className = 'step-item';

  if (stepNumber === 1) {
    step1.classList.remove('d-none');
    ind1.classList.add('active');
  } else if (stepNumber === 2) {
    step2.classList.remove('d-none');
    ind1.classList.add('completed');
    ind2.classList.add('active');
  } else if (stepNumber === 3) {
    step3.classList.remove('d-none');
    ind1.classList.add('completed');
    ind2.classList.add('completed');
    ind3.classList.add('completed');
  }
}

function completeOrderPlacement() {
  const orderId = 'ORD-' + Math.floor(10000000 + Math.random() * 90000000);
  document.getElementById('confirmedOrderId').textContent = orderId;

  // Render order summary inside confirmation
  const confirmedDetailsBox = document.getElementById('orderConfirmedDetailsBox');
  const name = document.getElementById('shipFullName').value || 'Customer';
  const address = document.getElementById('shipAddress').value || 'New Delhi';
  const city = document.getElementById('shipCity').value || 'Delhi';
  const pincode = document.getElementById('shipPincode').value || '110001';
  const totalAmount = document.getElementById('summaryNetPrice').textContent;

  confirmedDetailsBox.innerHTML = `
    <h6 class="fw-bold mb-2">Order Summary</h6>
    <div class="row g-2">
      <div class="col-sm-6">
        <small class="text-muted d-block">Delivery Recipient:</small>
        <strong>${name}</strong>
      </div>
      <div class="col-sm-6">
        <small class="text-muted d-block">Delivery Destination:</small>
        <span>${address}, ${city} - ${pincode}</span>
      </div>
      <div class="col-sm-6 mt-2">
        <small class="text-muted d-block">Total Paid Amount:</small>
        <strong class="text-success fs-6">${totalAmount}</strong>
      </div>
      <div class="col-sm-6 mt-2">
        <small class="text-muted d-block">Payment Status:</small>
        <span class="badge bg-success">Confirmed (Safe & Verified)</span>
      </div>
    </div>
  `;

  // Advance to confirmation step
  goToCheckoutStep(3);

  // Clear Cart
  AppState.cart = [];
  saveCart();
  renderCart();

  showToast('Order confirmed! Tracking details sent to email.', 'bi-bag-check-fill');
}

// ==========================================================================
// Flash Sale 24h Countdown Timer
// ==========================================================================
function startFlashSaleTimer() {
  let totalSeconds = 8 * 3600 + 45 * 60 + 30; // 8 hours, 45 mins, 30 secs

  const hoursEl = document.getElementById('timerHours');
  const minutesEl = document.getElementById('timerMinutes');
  const secondsEl = document.getElementById('timerSeconds');

  setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
    } else {
      totalSeconds = 24 * 3600; // Reset to 24 hours
    }

    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(m).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(s).padStart(2, '0');
  }, 1000);
}

// ==========================================================================
// Location Selector Helper
// ==========================================================================
function setQuickCity(cityName) {
  const label = document.getElementById('currentLocationText');
  if (label) label.textContent = cityName;
  
  const modalEl = document.getElementById('locationModal');
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();

  showToast(`Delivery location set to ${cityName}`, 'bi-geo-alt-fill');
}

// ==========================================================================
// Toast Notification Utility
// ==========================================================================
function showToast(message, iconClass = 'bi-check-circle-fill') {
  const toastEl = document.getElementById('liveToast');
  const toastMsg = document.getElementById('toastMessage');
  const toastIcon = document.getElementById('toastIcon');

  if (!toastEl || !toastMsg) return;

  toastMsg.textContent = message;
  toastIcon.className = `bi ${iconClass} text-warning fs-5`;

  const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
  toast.show();
}

// Helper: capitalize string
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
