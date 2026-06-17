// ─── PRODUCT DATA ───
const PRODUCTS = [
  { id:1, name:'iPhone 16 Pro Max', category:'phone', price:34990000, oldPrice:38000000, emoji:'📱', badge:'hot', rating:4.9, reviews:2341, desc:'Chip A18 Pro, camera 48MP, màn hình ProMotion 120Hz siêu đỉnh.', specs:[['Màn hình','6.9" Super Retina XDR'],['Chip','A18 Pro Bionic'],['RAM','8GB'],['Bộ nhớ','256GB / 512GB / 1TB'],['Pin','4685mAh'],['Camera','48MP + 12MP + 12MP']] },
  { id:2, name:'Samsung Galaxy S25 Ultra', category:'phone', price:29990000, oldPrice:33000000, emoji:'📱', badge:'new', rating:4.8, reviews:1876, desc:'Bút S Pen tích hợp, AI Galaxy cực mạnh, màn hình Dynamic AMOLED 6.9".', specs:[['Màn hình','6.9" Dynamic AMOLED 2X'],['Chip','Snapdragon 8 Elite'],['RAM','12GB'],['Bộ nhớ','256GB-1TB'],['Pin','5000mAh'],['Camera','200MP + 50MP + 10MP + 12MP']] },
  { id:3, name:'MacBook Pro M4 Pro 14"', category:'laptop', price:52990000, oldPrice:56000000, emoji:'💻', badge:'top', rating:4.9, reviews:987, desc:'Chip M4 Pro mạnh mẽ, màn hình Liquid Retina XDR, pin 22 giờ.', specs:[['Màn hình','14.2" Liquid Retina XDR'],['Chip','Apple M4 Pro'],['RAM','24GB'],['SSD','512GB'],['Pin','~22 giờ'],['Trọng lượng','1.6 kg']] },
  { id:4, name:'Sony WH-1000XM6', category:'audio', price:8990000, oldPrice:10500000, emoji:'🎧', badge:'sale', rating:4.8, reviews:3210, desc:'Chống ồn AI hàng đầu thế giới, âm thanh Hi-Res, pin 30 giờ.', specs:[['Loại','Over-ear Wireless'],['ANC','AI-Adaptive'],['Pin','30 giờ'],['Driver','40mm'],['Kết nối','Bluetooth 5.3'],['Multipoint','3 thiết bị']] },
  { id:5, name:'Apple Watch Ultra 3', category:'watch', price:21990000, oldPrice:24000000, emoji:'⌚', badge:'new', rating:4.7, reviews:654, desc:'Đồng hồ thể thao đỉnh cao, vỏ titanium, GPS chính xác tuyệt đối.', specs:[['Case','49mm Titanium'],['Màn hình','Micro-LED LTPO4'],['Pin','72 giờ'],['Chống nước','100m'],['Chip','S11'],['Kết nối','GPS, Cellular, Wi-Fi 6E']] },
  { id:6, name:'ASUS ROG Zephyrus G16', category:'gaming', price:46990000, oldPrice:52000000, emoji:'🎮', badge:'hot', rating:4.8, reviews:432, desc:'RTX 4080 Laptop, màn hình 240Hz QHD, thiết kế mỏng nhẹ siêu ấn tượng.', specs:[['CPU','Intel Core Ultra 9'],['GPU','RTX 4080 Laptop 12GB'],['RAM','32GB DDR5'],['SSD','2TB NVMe'],['Màn hình','16" 240Hz QHD'],['Pin','90Wh']] },
  { id:7, name:'iPad Pro M4 13"', category:'phone', price:31990000, oldPrice:35000000, emoji:'📱', badge:'new', rating:4.9, reviews:1243, desc:'Màn hình OLED siêu mỏng đầu tiên, chip M4 mạnh mẽ, hỗ trợ Apple Pencil Pro.', specs:[['Màn hình','13" Ultra Retina XDR OLED'],['Chip','Apple M4'],['RAM','16GB'],['Bộ nhớ','256GB-2TB'],['Pin','~10 giờ'],['Kết nối','WiFi 6E / 5G']] },
  { id:8, name:'Dell XPS 15 OLED', category:'laptop', price:39990000, oldPrice:44000000, emoji:'💻', badge:'top', rating:4.7, reviews:567, desc:'Màn hình OLED 3.5K tuyệt đẹp, Intel Core Ultra 7, thiết kế sang trọng.', specs:[['Màn hình','15.6" 3.5K OLED 120Hz'],['CPU','Intel Core Ultra 7'],['RAM','16GB/32GB'],['SSD','512GB-2TB'],['GPU','RTX 4060 8GB'],['Pin','86Wh']] },
  { id:9, name:'JBL Quantum 910 Wireless', category:'gaming', price:4990000, oldPrice:5990000, emoji:'🎮', badge:'sale', rating:4.6, reviews:876, desc:'Tai nghe gaming không dây, 2.4GHz + Bluetooth, ANC, âm trường 360°.', specs:[['Kết nối','2.4GHz + Bluetooth 5.3'],['ANC','Hybrid ANC'],['Pin','34 giờ'],['Driver','50mm'],['Âm trường','QuantumSphere 360°'],['Mic','Beamforming']] },
  { id:10, name:'Samsung Galaxy Watch Ultra', category:'watch', price:14990000, oldPrice:17000000, emoji:'⌚', badge:'hot', rating:4.7, reviews:432, desc:'Đồng hồ premium titanium, theo dõi sức khỏe toàn diện, chống nước 10ATM.', specs:[['Case','47mm Titanium'],['Màn hình','1.47" Super AMOLED'],['Pin','60 giờ'],['Chống nước','10ATM'],['Chip','Exynos W1000'],['OS','Wear OS 5']] },
  { id:11, name:'AirPods Pro 3', category:'audio', price:7490000, oldPrice:8500000, emoji:'🎧', badge:'new', rating:4.9, reviews:2876, desc:'ANC 40% tốt hơn, Transparency Mode nâng cấp, chip H2 Pro mới nhất.', specs:[['ANC','Adaptive ANC'],['Pin','8h (30h với case)'],['Chip','H2 Pro'],['Kết nối','Bluetooth 5.4'],['Chống nước','IPX4'],['Audio','Spatial Audio']] },
  { id:12, name:'Lenovo Legion Pro 7i', category:'gaming', price:42990000, oldPrice:48000000, emoji:'💻', badge:'top', rating:4.8, reviews:321, desc:'Intel Core i9-14900HX, RTX 4090 Laptop, màn hình Mini-LED 240Hz, RGB hoành tráng.', specs:[['CPU','Intel Core i9-14900HX'],['GPU','RTX 4090 Laptop 16GB'],['RAM','32GB DDR5'],['SSD','2TB NVMe'],['Màn hình','16" Mini-LED 240Hz 2K'],['Pin','99.9Wh']] },
];

// ─── STATE ───
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let currentFilter = 'all';
let currentSort = 'default';
let displayedCount = 8;
let selectedPayment = null;
let orderCounter = parseInt(localStorage.getItem('orderCounter') || '1000');
const PROMO_CODES = { 'NEON10': 10, 'SHOP20': 20, 'VIP30': 30, 'FSHIP': 0 };

// ─── INIT ───
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  renderProducts();
  updateCartUI();
  animateCounters();
  initScrollEffects();
  initNavHighlight();
});

// ─── PARTICLES ───
function createParticles() {
  const container = document.getElementById('bgParticles');
  const colors = ['#00f5ff', '#ff00aa', '#bf00ff', '#00ff88', '#0088ff'];
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 1;
    const color = colors[Math.floor(Math.random() * colors.length)];
    Object.assign(p.style, {
      width: size + 'px',
      height: size + 'px',
      left: Math.random() * 100 + '%',
      background: color,
      boxShadow: `0 0 ${size * 3}px ${color}`,
      animationDuration: (Math.random() * 20 + 15) + 's',
      animationDelay: (Math.random() * -25) + 's',
    });
    container.appendChild(p);
  }
}

// ─── COUNTER ANIMATION ───
function animateCounters() {
  const nums = document.querySelectorAll('.stat-num');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        let current = 0;
        const step = target / 80;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = Math.floor(current).toLocaleString('vi');
        }, 20);
        observer.unobserve(el);
      }
    });
  });
  nums.forEach(n => observer.observe(n));
}

// ─── SCROLL EFFECTS ───
function initScrollEffects() {
  const navbar = document.getElementById('navbar');
  const scrollBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    scrollBtn.classList.toggle('visible', window.scrollY > 400);
  });

  // Fade-in on scroll
  const cards = document.querySelectorAll('.feature-card');
  const io = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.style.animationDelay = (i * 0.1) + 's';
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  cards.forEach(c => io.observe(c));
}

// ─── NAV HIGHLIGHT ───
function initNavHighlight() {
  const sections = ['home', 'products', 'features', 'contact'];
  const links = document.querySelectorAll('.nav-link');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
}

// ─── PRODUCTS ───
function getFilteredProducts() {
  let list = currentFilter === 'all' ? [...PRODUCTS] : PRODUCTS.filter(p => p.category === currentFilter);
  switch (currentSort) {
    case 'price-asc': list.sort((a,b) => a.price - b.price); break;
    case 'price-desc': list.sort((a,b) => b.price - a.price); break;
    case 'name': list.sort((a,b) => a.name.localeCompare(b.name, 'vi')); break;
  }
  return list;
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const list = getFilteredProducts().slice(0, displayedCount);
  const loadBtn = document.getElementById('loadMoreBtn');
  loadBtn.style.display = getFilteredProducts().length > displayedCount ? 'inline-flex' : 'none';

  grid.innerHTML = list.map((p, i) => `
    <div class="product-card" style="animation-delay:${i*0.07}s" onclick="openProductModal(${p.id})">
      <span class="product-badge badge-${p.badge}">${badgeLabel(p.badge)}</span>
      <button class="product-wishlist" id="wish-${p.id}" onclick="toggleWishlist(event,${p.id})">♡</button>
      <div class="product-thumb">${p.emoji}</div>
      <div class="product-info">
        <div class="product-cat">${catLabel(p.category)}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-rating">
          <span class="stars">${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5-Math.floor(p.rating))}</span>
          <span class="rating-count">${p.rating} (${p.reviews.toLocaleString('vi')})</span>
        </div>
        <div class="product-prices">
          <span class="price-current">${formatPrice(p.price)}</span>
          <span class="price-old">${formatPrice(p.oldPrice)}</span>
          <span class="price-discount">-${Math.round((1-p.price/p.oldPrice)*100)}%</span>
        </div>
        <div class="product-actions">
          <button class="btn-add-cart" onclick="addToCart(event,${p.id})">+ Giỏ Hàng</button>
          <button class="btn-buy-now" onclick="buyNow(event,${p.id})">Mua Ngay</button>
        </div>
      </div>
    </div>
  `).join('');
}

function filterProducts(cat, btn) {
  currentFilter = cat;
  displayedCount = 8;
  document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  renderProducts();
}

function sortProducts(val) {
  currentSort = val;
  renderProducts();
}

function loadMoreProducts() {
  displayedCount += 4;
  renderProducts();
}

function badgeLabel(b) {
  return { new:'MỚI', hot:'HOT', sale:'SALE', top:'TOP' }[b] || b.toUpperCase();
}

function catLabel(c) {
  return { phone:'ĐIỆN THOẠI & TABLET', laptop:'LAPTOP', audio:'ÂM THANH', watch:'ĐỒNG HỒ', gaming:'GAMING' }[c] || c.toUpperCase();
}

function formatPrice(n) {
  return n.toLocaleString('vi') + '₫';
}

// ─── WISHLIST ───
const wishlist = new Set(JSON.parse(localStorage.getItem('wishlist') || '[]'));

function toggleWishlist(e, id) {
  e.stopPropagation();
  const btn = document.getElementById('wish-' + id);
  if (wishlist.has(id)) {
    wishlist.delete(id);
    btn.textContent = '♡';
    btn.classList.remove('liked');
    showToast('Đã xóa khỏi yêu thích', 'info', '💔');
  } else {
    wishlist.add(id);
    btn.textContent = '♥';
    btn.classList.add('liked');
    showToast('Đã thêm vào yêu thích!', 'success', '❤️');
  }
  localStorage.setItem('wishlist', JSON.stringify([...wishlist]));
}

// ─── PRODUCT MODAL ───
function openProductModal(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const content = document.getElementById('productModalContent');
  content.innerHTML = `
    <div class="product-modal-thumb">${p.emoji}</div>
    <div class="product-modal-info">
      <div class="product-modal-cat">${catLabel(p.category)}</div>
      <h2 class="product-modal-name">${p.name}</h2>
      <div class="product-rating">
        <span class="stars">${'★'.repeat(Math.floor(p.rating))}</span>
        <span class="rating-count">${p.rating} (${p.reviews.toLocaleString('vi')} đánh giá)</span>
      </div>
      <div class="product-modal-price">${formatPrice(p.price)}</div>
      <p class="product-modal-desc">${p.desc}</p>
      <div class="product-modal-specs">
        ${p.specs.map(([k,v]) => `<div class="spec-row"><span>${k}</span><span>${v}</span></div>`).join('')}
      </div>
      <div class="product-modal-btns">
        <button class="btn-primary" onclick="addToCart(null,${p.id}); closeProductModal()">+ Thêm Vào Giỏ Hàng</button>
        <button class="btn-ghost" onclick="buyNow(null,${p.id}); closeProductModal()">⚡ Mua Ngay</button>
      </div>
    </div>
  `;
  document.getElementById('productOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  document.getElementById('productOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('productOverlay').addEventListener('click', function(e) {
  if (e.target === this) closeProductModal();
});

// ─── SEARCH ───
function toggleSearch() {
  const overlay = document.getElementById('searchOverlay');
  overlay.classList.toggle('active');
  if (overlay.classList.contains('active')) {
    document.getElementById('searchInput').focus();
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

function handleSearch(val) {
  const results = document.getElementById('searchResults');
  if (!val.trim()) { results.innerHTML = ''; return; }
  const found = PRODUCTS.filter(p => p.name.toLowerCase().includes(val.toLowerCase()) || catLabel(p.category).toLowerCase().includes(val.toLowerCase()));
  if (!found.length) {
    results.innerHTML = '<p style="color:var(--text-secondary);width:100%;text-align:center;">Không tìm thấy sản phẩm nào</p>';
    return;
  }
  results.innerHTML = found.map(p => `
    <div class="product-card" style="cursor:pointer;width:220px" onclick="toggleSearch();openProductModal(${p.id})">
      <div class="product-thumb" style="height:120px;font-size:48px">${p.emoji}</div>
      <div class="product-info">
        <div class="product-name" style="font-size:13px">${p.name}</div>
        <div class="price-current">${formatPrice(p.price)}</div>
      </div>
    </div>
  `).join('');
}

// ─── CART ───
function addToCart(e, id) {
  if (e) e.stopPropagation();
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const item = cart.find(c => c.id === id);
  if (item) item.qty++;
  else cart.push({ id, qty: 1 });
  saveCart();
  updateCartUI();
  showToast(`Đã thêm "${p.name}" vào giỏ!`, 'success', '🛒');
}

function buyNow(e, id) {
  if (e) e.stopPropagation();
  addToCart(null, id);
  openCheckout();
}

function updateCartUI() {
  const total = cart.reduce((s,c) => s + c.qty, 0);
  document.getElementById('cartBadge').textContent = total;
  renderCartItems();
  localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCartItems() {
  const container = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  if (!cart.length) {
    container.innerHTML = `<div class="cart-empty"><div class="empty-icon">🛒</div><p>Giỏ hàng trống</p><button class="btn-primary" onclick="toggleCart();scrollToProducts()">Mua Sắm Ngay</button></div>`;
    footer.style.display = 'none';
    return;
  }
  container.innerHTML = cart.map(c => {
    const p = PRODUCTS.find(x => x.id === c.id);
    if (!p) return '';
    return `
      <div class="cart-item">
        <div class="cart-item-thumb">${p.emoji}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-price">${formatPrice(p.price * c.qty)}</div>
          <div class="cart-item-controls">
            <button class="qty-btn" onclick="changeQty(${c.id},-1)">−</button>
            <span class="qty-display">${c.qty}</span>
            <button class="qty-btn" onclick="changeQty(${c.id},1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${c.id})">✕</button>
      </div>
    `;
  }).join('');
  footer.style.display = 'block';
  document.getElementById('cartTotal').textContent = formatPrice(getCartTotal());
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else { saveCart(); updateCartUI(); }
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  updateCartUI();
  showToast('Đã xóa sản phẩm khỏi giỏ hàng', 'info', '🗑️');
}

function getCartTotal() {
  return cart.reduce((s,c) => {
    const p = PRODUCTS.find(x => x.id === c.id);
    return s + (p ? p.price * c.qty : 0);
  }, 0);
}

function saveCart() { localStorage.setItem('cart', JSON.stringify(cart)); }

function toggleCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  const isOpen = sidebar.classList.toggle('active');
  overlay.classList.toggle('active', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function applyPromo() {
  const code = document.getElementById('promoInput').value.trim().toUpperCase();
  if (!code) return;
  if (PROMO_CODES[code] !== undefined) {
    const disc = PROMO_CODES[code];
    if (disc === 0) {
      showToast('Áp dụng miễn phí vận chuyển thành công!', 'success', '🎉');
    } else {
      const saved = getCartTotal() * disc / 100;
      showToast(`Giảm ${disc}% – Tiết kiệm ${formatPrice(saved)}!`, 'success', '🎉');
    }
  } else {
    showToast('Mã giảm giá không hợp lệ hoặc đã hết hạn', 'error', '❌');
  }
}

// ─── CHECKOUT ───
function openCheckout() {
  if (!cart.length) { showToast('Giỏ hàng trống!', 'error', '🛒'); return; }
  toggleCart();
  goToStep(1);
  document.getElementById('checkoutOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
  updateAmounts();
}

function closeCheckout() {
  document.getElementById('checkoutOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('checkoutOverlay').addEventListener('click', function(e) {
  if (e.target === this) closeCheckout();
});

function goToStep(num) {
  if (num === 2) {
    const name = document.getElementById('buyerName').value.trim();
    const phone = document.getElementById('buyerPhone').value.trim();
    const addr = document.getElementById('buyerAddress').value.trim();
    if (!name || !phone || !addr) { showToast('Vui lòng điền đầy đủ thông tin!', 'error', '⚠️'); return; }
  }
  if (num === 3 && !selectedPayment) { showToast('Vui lòng chọn phương thức thanh toán!', 'error', '⚠️'); return; }

  [1,2,3].forEach(n => {
    document.getElementById('checkoutStep'+n).classList.toggle('hidden', n !== num);
    const ind = document.getElementById('step'+n+'Ind');
    ind.classList.toggle('active', n === num);
    ind.classList.toggle('done', n < num);
  });

  if (num === 3) renderOrderSummary();
}

function selectPayment(method) {
  selectedPayment = method;
  ['momo','zalopay','bank','cod'].forEach(m => {
    document.getElementById('pay'+m.charAt(0).toUpperCase()+m.slice(1))?.classList.toggle('selected', m === method);
    const detailEl = document.getElementById(m === 'cod' ? 'codDetail' : m+'Detail');
    if (detailEl) detailEl.classList.toggle('hidden', m !== method);
  });
  updateAmounts();
}

function updateAmounts() {
  const fmt = formatPrice(getCartTotal());
  if (document.getElementById('confirmTotal')) document.getElementById('confirmTotal').textContent = fmt;
}

function renderOrderSummary() {
  const summary = document.getElementById('orderSummary');
  const payName = { momo:'Ví MoMo', zalopay:'ZaloPay', bank:'Chuyển khoản', cod:'Thanh toán khi nhận' };
  const items = cart.map(c => {
    const p = PRODUCTS.find(x => x.id === c.id);
    return `<div class="order-summary-item"><span>${p.emoji} ${p.name} × ${c.qty}</span><span>${formatPrice(p.price * c.qty)}</span></div>`;
  }).join('');
  const name = document.getElementById('buyerName').value;
  const phone = document.getElementById('buyerPhone').value;
  const addr = document.getElementById('buyerAddress').value;
  const city = document.getElementById('buyerCity').value;
  summary.innerHTML = `
    ${items}
    <div class="order-summary-item"><span>Người nhận</span><span>${name}</span></div>
    <div class="order-summary-item"><span>Điện thoại</span><span>${phone}</span></div>
    <div class="order-summary-item"><span>Địa chỉ</span><span>${addr}, ${city}</span></div>
    <div class="order-summary-item"><span>Thanh toán</span><span>${payName[selectedPayment] || ''}</span></div>
  `;
  updateAmounts();
}

function placeOrder() {
  orderCounter++;
  localStorage.setItem('orderCounter', orderCounter);
  const code = 'NEON-' + orderCounter;
  const total = formatPrice(getCartTotal());

  // Populate payment screen values
  document.getElementById('psMomoAmount').textContent    = total;
  document.getElementById('psMomoContent').textContent   = code;
  document.getElementById('psZaloAmount').textContent    = total;
  document.getElementById('psZaloContent').textContent   = code;
  document.getElementById('psBankAmount').textContent    = total;
  document.getElementById('psBankContent').textContent   = code;
  document.getElementById('psCodAmount').textContent     = total;

  // Set title
  const titles = { momo:'Thanh toán qua MoMo', zalopay:'Thanh toán qua ZaloPay', bank:'Chuyển khoản ngân hàng', cod:'Thanh toán khi nhận hàng' };
  document.getElementById('psTitle').textContent = titles[selectedPayment] || 'Thanh toán';

  // Show correct body panel
  ['psMomo','psZalo','psBank','psCod'].forEach(id => document.getElementById(id).classList.add('hidden'));
  const panelMap = { momo:'psMomo', zalopay:'psZalo', bank:'psBank', cod:'psCod' };
  document.getElementById(panelMap[selectedPayment]).classList.remove('hidden');

  // Save order info for success screen
  document.getElementById('orderCode').textContent = code;

  // Close checkout, open payment screen
  closeCheckout();
  document.getElementById('paymentScreenOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';

  // Clear cart now
  cart = [];
  saveCart();
  updateCartUI();
}

function closePaymentScreen() {
  document.getElementById('paymentScreenOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

function confirmTransferred() {
  closePaymentScreen();
  document.getElementById('successOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSuccess() {
  document.getElementById('successOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('successOverlay').addEventListener('click', function(e) {
  if (e.target === this) closeSuccess();
});

// ─── CHATBOT ───
const BOT_REPLIES = {
  greet: ['Xin chào! Tôi là NeonBot, có thể giúp gì cho bạn hôm nay? 😊', 'Chào mừng đến với NeonShop! Tôi sẵn sàng hỗ trợ bạn 24/7 ✨'],
  product: [
    'NeonShop có hơn 500 sản phẩm công nghệ chính hãng: điện thoại, laptop, tai nghe, đồng hồ thông minh và gaming gear. Bạn quan tâm đến loại nào?',
    'Chúng tôi có đầy đủ các thương hiệu hot: Apple, Samsung, Sony, ASUS, Dell... Sản phẩm nào bạn muốn tìm hiểu?'
  ],
  payment: [
    `Bạn có thể thanh toán qua:\n• 💜 MoMo: 0968 679 993\n• 💙 ZaloPay: 0968 679 993\n• 🏦 Chuyển khoản STK: 0968 679 993\n• 💵 COD (tiền mặt khi nhận hàng)`,
    'Chúng tôi hỗ trợ nhiều hình thức thanh toán linh hoạt. Ví điện tử và chuyển khoản sẽ được xử lý ngay lập tức!'
  ],
  order: ['Bạn có thể kiểm tra đơn hàng qua hotline 0968 679 993 hoặc để lại SĐT, chúng tôi sẽ báo trạng thái ngay!', 'Đơn hàng thường được xử lý trong 30-60 phút sau khi xác nhận thanh toán. Bạn muốn kiểm tra đơn nào?'],
  shipping: ['Giao hàng nội thành trong 2 giờ, toàn quốc 1-2 ngày. Miễn phí vận chuyển đơn từ 500.000₫!', 'Chúng tôi hợp tác với GHTK, GHN và J&T Express để đảm bảo giao hàng nhanh nhất!'],
  warranty: ['Tất cả sản phẩm có bảo hành chính hãng 12-24 tháng. Bảo hành 1 đổi 1 trong 7 ngày nếu lỗi nhà sản xuất!', 'Chính sách bảo hành: 1 đổi 1 trong 7 ngày, bảo hành tại TTBH chính hãng toàn quốc.'],
  hot: ['Sản phẩm hot nhất hiện tại: iPhone 16 Pro Max, Samsung S25 Ultra, Sony WH-1000XM6 và MacBook Pro M4 🔥', 'TOP bán chạy: AirPods Pro 3, Apple Watch Ultra 3, ASUS ROG Zephyrus G16! Tất cả đang có giá tốt.'],
  return: ['Đổi trả trong 7 ngày, hoàn tiền 100% nếu lỗi nhà sản xuất. Miễn phí thu hồi hàng!', 'Chính sách: đổi hàng mới trong 7 ngày, hoàn tiền trong 3-5 ngày làm việc qua phương thức gốc.'],
  default: ['Cảm ơn bạn đã liên hệ! Để được hỗ trợ nhanh nhất, vui lòng gọi hotline 0968 679 993 hoặc để lại câu hỏi cụ thể hơn nhé! 😊', 'Tôi đang học thêm để trả lời câu hỏi này! Trong lúc đó, bạn có thể liên hệ 0968 679 993 để được tư vấn trực tiếp.', 'Câu hỏi hay đấy! Hãy để lại thông tin, nhân viên tư vấn sẽ liên hệ bạn trong vòng 5 phút! 🚀']
};

function toggleChat() {
  const widget = document.getElementById('chatWidget');
  const overlay = document.getElementById('chatOverlay');
  const isOpen = widget.classList.toggle('active');
  overlay.classList.toggle('active', isOpen);
  if (isOpen) document.getElementById('chatInput').focus();
}

function getBotReply(msg) {
  const m = msg.toLowerCase();
  if (m.includes('xin chào') || m.includes('chào') || m.includes('hi') || m.includes('hello')) return getRandom(BOT_REPLIES.greet);
  if (m.includes('sản phẩm') || m.includes('mua') || m.includes('điện thoại') || m.includes('laptop') || m.includes('tai nghe')) return getRandom(BOT_REPLIES.product);
  if (m.includes('thanh toán') || m.includes('momo') || m.includes('zalopay') || m.includes('chuyển khoản') || m.includes('trả tiền')) return getRandom(BOT_REPLIES.payment);
  if (m.includes('đơn hàng') || m.includes('order') || m.includes('kiểm tra')) return getRandom(BOT_REPLIES.order);
  if (m.includes('giao hàng') || m.includes('vận chuyển') || m.includes('ship')) return getRandom(BOT_REPLIES.shipping);
  if (m.includes('bảo hành') || m.includes('lỗi') || m.includes('hỏng')) return getRandom(BOT_REPLIES.warranty);
  if (m.includes('hot') || m.includes('bán chạy') || m.includes('nổi bật') || m.includes('hay')) return getRandom(BOT_REPLIES.hot);
  if (m.includes('đổi') || m.includes('trả') || m.includes('hoàn tiền') || m.includes('refund')) return getRandom(BOT_REPLIES.return);
  return getRandom(BOT_REPLIES.default);
}

function getRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function sendQuickReply(text) {
  document.getElementById('chatInput').value = text;
  sendChatMessage();
}

function handleChatKey(e) { if (e.key === 'Enter') sendChatMessage(); }

function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';

  appendMessage(msg, 'user');
  const typing = appendTyping();

  setTimeout(() => {
    typing.remove();
    appendMessage(getBotReply(msg), 'bot');
  }, 800 + Math.random() * 700);
}

function appendMessage(text, who) {
  const container = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'chat-msg ' + who;
  const now = new Date();
  const time = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');
  div.innerHTML = `<div class="msg-bubble">${text.replace(/\n/g, '<br/>')}</div><span class="msg-time">${time}</span>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  return div;
}

function appendTyping() {
  const container = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'chat-msg bot typing-indicator';
  div.innerHTML = '<div class="msg-bubble"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>';
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  return div;
}

// ─── CONTACT FORM ───
function submitContact(e) {
  e.preventDefault();
  showToast('Tin nhắn đã gửi! Chúng tôi sẽ liên hệ trong vòng 30 phút.', 'success', '✉️');
  e.target.reset();
}

// ─── TOAST ───
function showToast(msg, type = 'info', icon = 'ℹ️') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toast-out 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ─── COPY TEXT ───
function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Đã sao chép: ${text}`, 'success', '📋');
  }).catch(() => {
    showToast(`Số: ${text}`, 'info', '📋');
  });
}

// ─── HELPERS ───
function scrollToProducts() { document.getElementById('products').scrollIntoView({ behavior: 'smooth' }); }
function scrollToFeatures() { document.getElementById('features').scrollIntoView({ behavior: 'smooth' }); }

// Close payment screen on backdrop click
document.getElementById('paymentScreenOverlay').addEventListener('click', function(e) {
  if (e.target === this) closePaymentScreen();
});

// Close modals on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeProductModal();
    closeCheckout();
    closePaymentScreen();
    closeSuccess();
    if (document.getElementById('searchOverlay').classList.contains('active')) toggleSearch();
    if (document.getElementById('chatWidget').classList.contains('active')) toggleChat();
  }
});
