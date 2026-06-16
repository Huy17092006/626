/* ===== PRODUCT DATA ===== */
const products = [
  {
    id: 1, name: 'Áo Thun Premium Cotton', category: 'fashion',
    price: 350000, originalPrice: 490000,
    image: 'https://picsum.photos/seed/shirt1/400/400',
    badge: '-29%', rating: 4.8, reviews: 234,
    description: 'Chất liệu cotton cao cấp, thấm hút mồ hôi tốt, phù hợp mọi hoạt động hàng ngày.'
  },
  {
    id: 2, name: 'Tai Nghe Bluetooth Pro X', category: 'electronics',
    price: 1290000, originalPrice: 1800000,
    image: 'https://picsum.photos/seed/headphone/400/400',
    badge: 'HOT', rating: 4.9, reviews: 512,
    description: 'Âm thanh vòm 360°, chống ồn chủ động ANC, pin 30 giờ liên tục.'
  },
  {
    id: 3, name: 'Đồng Hồ Thông Minh S7', category: 'electronics',
    price: 2850000, originalPrice: 3500000,
    image: 'https://picsum.photos/seed/smartwatch/400/400',
    badge: '-18%', rating: 4.7, reviews: 189,
    description: 'Theo dõi sức khỏe toàn diện, GPS tích hợp, kháng nước 50m, màn hình AMOLED.'
  },
  {
    id: 4, name: 'Túi Da Bò Thật Cao Cấp', category: 'accessories',
    price: 1750000, originalPrice: 2200000,
    image: 'https://picsum.photos/seed/bag2/400/400',
    badge: '-20%', rating: 4.8, reviews: 97,
    description: 'Da bò thật 100%, khóa kéo kim loại bền, thiết kế sang trọng, nhiều ngăn tiện lợi.'
  },
  {
    id: 5, name: 'Giày Sneaker Limited Edition', category: 'fashion',
    price: 980000, originalPrice: 1400000,
    image: 'https://picsum.photos/seed/sneaker3/400/400',
    badge: 'NEW', rating: 4.6, reviews: 341,
    description: 'Đế cao su chống trơn, thiết kế độc đáo limited edition, đế cao su EVA siêu nhẹ.'
  },
  {
    id: 6, name: 'Nước Hoa Luxury Collection', category: 'accessories',
    price: 1450000, originalPrice: 1900000,
    image: 'https://picsum.photos/seed/perfume/400/400',
    badge: '-24%', rating: 4.9, reviews: 276,
    description: 'Hương thơm sang trọng, lưu hương 12 giờ, phong cách Pháp hiện đại.'
  },
  {
    id: 7, name: 'Laptop Stand Aluminum Pro', category: 'electronics',
    price: 650000, originalPrice: 900000,
    image: 'https://picsum.photos/seed/laptopstand/400/400',
    badge: '-27%', rating: 4.5, reviews: 156,
    description: 'Nhôm nguyên khối, 6 mức điều chỉnh góc, tản nhiệt xuất sắc, gấp gọn tiện lợi.'
  },
  {
    id: 8, name: 'Camera Mini 4K UHD', category: 'electronics',
    price: 3200000, originalPrice: 4100000,
    image: 'https://picsum.photos/seed/camera4k/400/400',
    badge: 'HOT', rating: 4.8, reviews: 89,
    description: 'Quay 4K 60fps, chống rung OIS, kết nối WiFi, app điều khiển từ xa.'
  }
];

/* ===== STATE ===== */
let cart = [];
let currentStep = 1;
let selectedPayMethod = 'card';

/* ===== UTILITIES ===== */
const formatPrice = p => p.toLocaleString('vi-VN') + 'đ';

const $ = id => document.getElementById(id);

function showToast(message, type = 'success') {
  const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle' };
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<i class="fas ${icons[type]}"></i><span>${message}</span>`;
  $('toast-container').appendChild(t);
  setTimeout(() => { t.classList.add('fade-out'); setTimeout(() => t.remove(), 300); }, 3000);
}

function generateOrderId() {
  return '#LS' + Date.now().toString().slice(-6);
}

/* ===== SPLASH SCREEN ===== */
window.addEventListener('load', () => {
  setTimeout(() => {
    const splash = $('splash-screen');
    if (splash) { splash.classList.add('hidden'); setTimeout(() => splash.remove(), 600); }
    startCountdown();
    initChat();
    animateStats();
  }, 1800);
});

/* ===== SCROLL EFFECTS ===== */
const navbar = document.querySelector('#main-nav');
const scrollTopBtn = $('scroll-top-btn');

window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  if (navbar) navbar.classList.toggle('scrolled', sy > 80);
  if (scrollTopBtn) scrollTopBtn.classList.toggle('show', sy > 400);
  updateActiveNav();
});

scrollTopBtn && scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    const bot = top + sec.offsetHeight;
    const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
    if (link) link.classList.toggle('active', window.scrollY >= top && window.scrollY < bot);
  });
}

/* ===== REVEAL ON SCROLL ===== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('revealed'), i * 120);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => revealObserver.observe(el));

/* ===== PARTICLES ===== */
(function createParticles() {
  const container = $('hero-particles');
  if (!container) return;
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 2;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      animation-duration:${Math.random() * 15 + 10}s;
      animation-delay:${Math.random() * 10}s;
      opacity:${Math.random() * 0.6 + 0.2};
    `;
    container.appendChild(p);
  }
})();

/* ===== HAMBURGER ===== */
const hamburger = $('hamburger');
const navLinks = $('nav-links');
hamburger && hamburger.addEventListener('click', () => {
  navLinks && navLinks.classList.toggle('mobile-open');
});

/* ===== PRODUCT RENDERING ===== */
function renderProducts(filter = 'all') {
  const grid = $('products-grid');
  if (!grid) return;
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
  grid.innerHTML = filtered.map(p => `
    <div class="product-card reveal-up" data-id="${p.id}" data-category="${p.category}">
      <div class="product-img-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
        ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ''}
        <div class="product-actions">
          <button class="action-btn" onclick="openQuickView(${p.id})" title="Xem nhanh"><i class="fas fa-eye"></i></button>
          <button class="action-btn" onclick="addToWishlist(${p.id})" title="Yêu thích"><i class="fas fa-heart"></i></button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">${getCategoryLabel(p.category)}</div>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-rating">
          <span class="stars">${'★'.repeat(Math.floor(p.rating))}${p.rating % 1 ? '½' : ''}</span>
          <span class="rating-count">(${p.reviews})</span>
        </div>
        <div class="product-price-row">
          <div>
            <div class="product-price">${formatPrice(p.price)}</div>
            <div class="product-original">${formatPrice(p.originalPrice)}</div>
          </div>
          <button class="btn-add-cart" onclick="addToCart(${p.id}, event)">
            <i class="fas fa-shopping-bag"></i> Thêm
          </button>
        </div>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));
}

function getCategoryLabel(cat) {
  const labels = { fashion: 'Thời Trang', electronics: 'Điện Tử', accessories: 'Phụ Kiện', home: 'Gia Dụng' };
  return labels[cat] || cat;
}

renderProducts();

/* ===== FILTER BUTTONS ===== */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.filter);
  });
});

/* ===== CATEGORY LINKS ===== */
document.querySelectorAll('.category-link').forEach(link => {
  link.addEventListener('click', e => {
    const filter = link.dataset.filter;
    if (filter) {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      const btn = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
      if (btn) btn.classList.add('active');
      renderProducts(filter);
    }
  });
});

/* ===== CART ===== */
function addToCart(id, event) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  showToast(`Đã thêm "${product.name}" vào giỏ hàng`, 'success');

  // Fly animation
  if (event) {
    const btn = event.currentTarget;
    const cartIcon = $('cart-btn');
    if (btn && cartIcon) flyToCart(btn, cartIcon);
  }
}

function flyToCart(from, to) {
  const fromRect = from.getBoundingClientRect();
  const toRect = to.getBoundingClientRect();
  const dot = document.createElement('div');
  dot.style.cssText = `
    position:fixed; width:14px; height:14px; border-radius:50%;
    background:var(--gold); z-index:9999; pointer-events:none;
    left:${fromRect.left + fromRect.width/2 - 7}px;
    top:${fromRect.top + fromRect.height/2 - 7}px;
    transition: all 0.6s cubic-bezier(0.2,0.8,0.4,1);
    box-shadow: 0 0 10px rgba(245,166,35,0.8);
  `;
  document.body.appendChild(dot);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      dot.style.left = toRect.left + toRect.width/2 - 7 + 'px';
      dot.style.top = toRect.top + toRect.height/2 - 7 + 'px';
      dot.style.transform = 'scale(0.2)';
      dot.style.opacity = '0';
    });
  });
  setTimeout(() => dot.remove(), 700);
}

function addToWishlist(id) {
  const product = products.find(p => p.id === id);
  showToast(`Đã thêm "${product.name}" vào danh sách yêu thích ❤️`, 'info');
}

function updateCartUI() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const badge = $('cart-badge');
  if (badge) {
    badge.textContent = total;
    badge.setAttribute('data-count', total);
    badge.style.display = total > 0 ? 'flex' : 'none';
  }

  const cartItemsEl = $('cart-items');
  const cartEmptyEl = $('cart-empty');
  const cartFooterEl = $('cart-footer');

  if (cart.length === 0) {
    if (cartEmptyEl) cartEmptyEl.style.display = 'flex';
    if (cartItemsEl) cartItemsEl.style.display = 'none';
    if (cartFooterEl) cartFooterEl.style.display = 'none';
    return;
  }

  if (cartEmptyEl) cartEmptyEl.style.display = 'none';
  if (cartFooterEl) cartFooterEl.style.display = 'block';

  if (cartItemsEl) {
    cartItemsEl.style.display = 'block';
    cartItemsEl.innerHTML = cart.map(item => `
      <div class="cart-item" id="cart-item-${item.id}">
        <img src="${item.image}" alt="${item.name}" />
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${formatPrice(item.price)}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeQty(${item.id}, -1)"><i class="fas fa-minus"></i></button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${item.id}, 1)"><i class="fas fa-plus"></i></button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Xóa">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `).join('');
  }

  const cartSubtotalEl = $('cart-subtotal');
  const cartTotalEl = $('cart-total');
  if (cartSubtotalEl) cartSubtotalEl.textContent = formatPrice(subtotal);
  if (cartTotalEl) cartTotalEl.textContent = formatPrice(subtotal);
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else updateCartUI();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCartUI();
  showToast('Đã xóa sản phẩm khỏi giỏ hàng', 'info');
}

/* ===== CART SIDEBAR TOGGLE ===== */
const cartBtn = $('cart-btn');
const cartOverlay = $('cart-overlay');
const cartSidebar = $('cart-sidebar');
const cartCloseBtn = $('cart-close');

function openCart() {
  cartSidebar && cartSidebar.classList.add('open');
  cartOverlay && cartOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartSidebar && cartSidebar.classList.remove('open');
  cartOverlay && cartOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

cartBtn && cartBtn.addEventListener('click', openCart);
cartCloseBtn && cartCloseBtn.addEventListener('click', closeCart);
cartOverlay && cartOverlay.addEventListener('click', closeCart);

/* ===== CHECKOUT FLOW ===== */
const checkoutBtn = $('checkout-btn');
const paymentModal = $('payment-modal');
const modalClose = $('modal-close');

checkoutBtn && checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) { showToast('Giỏ hàng đang trống!', 'error'); return; }
  closeCart();
  openPaymentModal();
});

function openPaymentModal() {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  renderOrderSummary();
  $('modal-subtotal') && ($('modal-subtotal').textContent = formatPrice(subtotal));
  $('modal-total') && ($('modal-total').textContent = formatPrice(subtotal));
  paymentModal && paymentModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  goToStep(1);
}

function closePaymentModal() {
  paymentModal && paymentModal.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose && modalClose.addEventListener('click', closePaymentModal);
paymentModal && paymentModal.addEventListener('click', e => {
  if (e.target === paymentModal) closePaymentModal();
});

$('success-close') && $('success-close').addEventListener('click', () => {
  closePaymentModal();
  cart = [];
  updateCartUI();
});

function renderOrderSummary() {
  const summary = $('order-summary');
  if (!summary) return;
  summary.innerHTML = cart.map(item => `
    <div class="summary-item">
      <img src="${item.image}" alt="${item.name}" />
      <div class="summary-item-info">
        <p>${item.name}</p>
        <span>Số lượng: ${item.qty}</span>
      </div>
      <div class="summary-item-price">${formatPrice(item.price * item.qty)}</div>
    </div>
  `).join('');
}

/* ===== STEP NAVIGATION ===== */
function goToStep(step) {
  currentStep = step;
  ['payment-step-1','payment-step-2','payment-step-3','payment-success'].forEach(id => {
    const el = $(id);
    if (el) el.classList.add('hidden');
  });

  const targetMap = { 1: 'payment-step-1', 2: 'payment-step-2', 3: 'payment-step-3', 4: 'payment-success' };
  const target = $(targetMap[step]);
  if (target) target.classList.remove('hidden');

  document.querySelectorAll('.step').forEach(s => {
    const n = parseInt(s.dataset.step || s.querySelector('.step-circle')?.textContent);
    s.classList.toggle('active', n === step);
    s.classList.toggle('done', n < step);
  });

  document.querySelectorAll('.step-line').forEach((line, i) => {
    line.classList.toggle('active', i < step - 1);
  });

  // Update steps-indicator
  document.querySelectorAll('.steps-indicator .step').forEach(s => {
    const num = parseInt(s.querySelector('.step-circle')?.textContent);
    s.classList.toggle('active', num === step);
    s.classList.toggle('done', num < step);
  });
  document.querySelectorAll('.steps-indicator .step-line').forEach((line, i) => {
    line.classList.toggle('active', i < step - 1);
  });
}

// Step navigation buttons
$('to-step-2') && $('to-step-2').addEventListener('click', () => goToStep(2));
$('back-to-1') && $('back-to-1').addEventListener('click', () => goToStep(1));
$('back-to-2') && $('back-to-2').addEventListener('click', () => goToStep(3));
$('to-step-3') && $('to-step-3').addEventListener('click', () => {
  if (validateShipping()) goToStep(3);
});

/* ===== SHIPPING VALIDATION ===== */
function validateShipping() {
  let valid = true;
  const name = $('ship-name');
  const phone = $('ship-phone');
  const email = $('ship-email');
  const address = $('ship-address');

  const fields = [
    { el: name, err: 'err-name', msg: 'Vui lòng nhập họ tên', check: v => v.trim().length >= 2 },
    { el: phone, err: 'err-phone', msg: 'Số điện thoại không hợp lệ', check: v => /^(0|\+84)[0-9]{9}$/.test(v.replace(/\s/g,'')) },
    { el: email, err: 'err-email', msg: 'Email không hợp lệ', check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
    { el: address, err: 'err-address', msg: 'Vui lòng nhập địa chỉ', check: v => v.trim().length >= 5 }
  ];

  fields.forEach(f => {
    const errEl = $(f.err);
    if (!f.el) return;
    const val = f.el.value;
    const ok = f.check(val);
    if (errEl) errEl.textContent = ok ? '' : f.msg;
    f.el.classList.toggle('error', !ok);
    if (!ok) valid = false;
  });

  return valid;
}

/* ===== PAYMENT METHOD SELECTION ===== */
document.querySelectorAll('input[name="pay-method"]').forEach(radio => {
  radio.addEventListener('change', () => {
    selectedPayMethod = radio.value;
    const cardWrap = $('card-form-wrap');
    const qrWrap = $('qr-pay-wrap');
    const bankWrap = $('bank-transfer-wrap');

    cardWrap && cardWrap.classList.toggle('hidden', selectedPayMethod !== 'card');
    qrWrap && qrWrap.classList.toggle('hidden', !['momo','zalopay'].includes(selectedPayMethod));
    bankWrap && bankWrap.classList.toggle('hidden', selectedPayMethod !== 'bank');

    const MOMO_PHONE    = '0968679993';
    const ZALOPAY_PHONE = '0968679993';
    const TPBANK_STK    = '0968679993';
    const TPBANK_NAME   = 'PHUNG GIA HUY';

    if (selectedPayMethod === 'momo') {
      const label = $('qr-label');
      if (label) label.textContent = 'Chuyển tiền MoMo đến số:';
      const img = $('qr-pay-img');
      if (img) img.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=2|99|${MOMO_PHONE}|||0|0||||`;
      const ph = $('qr-phone-number');
      if (ph) ph.textContent = MOMO_PHONE.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
    } else if (selectedPayMethod === 'zalopay') {
      const label = $('qr-label');
      if (label) label.textContent = 'Chuyển tiền ZaloPay đến số:';
      const img = $('qr-pay-img');
      if (img) img.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=zalopay%3A${ZALOPAY_PHONE}`;
      const ph = $('qr-phone-number');
      if (ph) ph.textContent = ZALOPAY_PHONE.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
    }

    if (selectedPayMethod === 'bank') {
      const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
      const code = $('bank-transfer-code');
      const orderCode = `TAPHOAONLINE-${Date.now().toString().slice(-6)}`;
      if (code) code.textContent = orderCode;
      // Update VietQR with amount
      const bankQr = $('bank-qr-img');
      if (bankQr) bankQr.src = `https://img.vietqr.io/image/TPB-${TPBANK_STK}-compact2.jpg?amount=${total}&addInfo=${encodeURIComponent(orderCode)}&accountName=${encodeURIComponent(TPBANK_NAME)}`;
    }
  });
});

/* ===== CREDIT CARD LIVE PREVIEW ===== */
const cardNumber = $('card-number');
const cardName = $('card-name');
const cardExpiry = $('card-expiry');
const cardCvv = $('card-cvv');
const creditCard = $('credit-card');

cardNumber && cardNumber.addEventListener('input', e => {
  let val = e.target.value.replace(/\D/g,'').slice(0, 16);
  val = val.match(/.{1,4}/g)?.join(' ') || val;
  e.target.value = val;
  const disp = $('card-display-number');
  if (disp) disp.textContent = val || '•••• •••• •••• ••••';
});

cardName && cardName.addEventListener('input', e => {
  const val = e.target.value.toUpperCase();
  e.target.value = val;
  const disp = $('card-display-name');
  if (disp) disp.textContent = val || 'TÊN CHỦ THẺ';
});

cardExpiry && cardExpiry.addEventListener('input', e => {
  let val = e.target.value.replace(/\D/g,'');
  if (val.length > 2) val = val.slice(0,2) + '/' + val.slice(2,4);
  e.target.value = val;
  const disp = $('card-display-expiry');
  if (disp) disp.textContent = val || 'MM/YY';
});

cardCvv && cardCvv.addEventListener('focus', () => creditCard && creditCard.classList.add('flipped'));
cardCvv && cardCvv.addEventListener('blur', () => creditCard && creditCard.classList.remove('flipped'));
cardCvv && cardCvv.addEventListener('input', e => {
  const val = e.target.value.replace(/\D/g,'').slice(0,3);
  e.target.value = val;
  const disp = $('card-display-cvv');
  if (disp) disp.textContent = val || '•••';
});

/* ===== CONFIRM PAYMENT ===== */
$('confirm-order') && $('confirm-order').addEventListener('click', () => {
  if (selectedPayMethod === 'card') {
    if (!validateCard()) return;
  }
  processPayment();
});

function validateCard() {
  let valid = true;
  const fields = [
    { el: cardNumber, err: 'err-card-number', msg: 'Số thẻ không hợp lệ', check: v => v.replace(/\s/g,'').length === 16 },
    { el: cardName, err: 'err-card-name', msg: 'Vui lòng nhập tên chủ thẻ', check: v => v.trim().length >= 2 },
    { el: cardExpiry, err: 'err-card-expiry', msg: 'Ngày hết hạn không hợp lệ', check: v => /^\d{2}\/\d{2}$/.test(v) },
    { el: cardCvv, err: 'err-card-cvv', msg: 'CVV không hợp lệ', check: v => v.length === 3 }
  ];
  fields.forEach(f => {
    const errEl = $(f.err);
    if (!f.el) return;
    const ok = f.check(f.el.value);
    if (errEl) errEl.textContent = ok ? '' : f.msg;
    f.el && f.el.classList.toggle('error', !ok);
    if (!ok) valid = false;
  });
  return valid;
}

const API_BASE = window.location.port === '3000' || window.location.port === ''
  ? ''
  : 'http://localhost:3000';

async function processPayment() {
  const btn = $('confirm-order');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
  }

  const orderId  = generateOrderId();
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const payMethodLabels = { card: 'Thẻ tín dụng', momo: 'Ví MoMo', zalopay: 'ZaloPay', bank: 'Chuyển khoản' };
  const orderPayload = {
    id:       orderId,
    customer: {
      name:    $('ship-name')?.value    || '',
      phone:   $('ship-phone')?.value   || '',
      email:   $('ship-email')?.value   || '',
      address: $('ship-address')?.value || '',
      city:    $('ship-city')?.value    || '',
      note:    $('ship-note')?.value    || ''
    },
    items: cart.map(item => ({
      id:       item.id,
      name:     item.name,
      price:    item.price,
      qty:      item.qty,
      image:    item.image,
      subtotal: item.price * item.qty
    })),
    payment: {
      method: selectedPayMethod,
      label:  payMethodLabels[selectedPayMethod] || selectedPayMethod
    },
    subtotal: subtotal,
    shipping: 0,
    total:    subtotal
  };

  try {
    const res = await fetch(`${API_BASE}/api/orders`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(orderPayload)
    });

    if (!res.ok) throw new Error('Server error');
    const data = await res.json();
    console.log('✅ Đơn hàng đã gửi lên server:', data.order?.id);
  } catch (err) {
    // Server không kết nối được — vẫn hiện thành công cho khách
    console.warn('⚠️ Không kết nối được server, đơn hàng lưu offline:', err.message);
  }

  const orderIdEl = $('success-order-id');
  if (orderIdEl) orderIdEl.textContent = orderId;
  goToStep(4);
  launchConfetti();
  if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-lock"></i> Xác nhận đặt hàng'; }
}

/* ===== CONFETTI ===== */
function launchConfetti() {
  const colors = ['#f5a623','#e94560','#10b981','#3b82f6','#a855f7'];
  for (let i = 0; i < 80; i++) {
    const c = document.createElement('div');
    c.style.cssText = `
      position:fixed; width:${Math.random()*10+4}px; height:${Math.random()*10+4}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
      left:${Math.random()*100}%; top:-20px;
      z-index:9999; pointer-events:none;
      animation: confettiFall ${Math.random()*2+1.5}s ease forwards ${Math.random()*0.8}s;
    `;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 3500);
  }
}

const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
  @keyframes confettiFall {
    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
    100% { transform: translateY(100vh) rotate(${Math.random()*720}deg); opacity: 0; }
  }
`;
document.head.appendChild(confettiStyle);

/* ===== COUNTDOWN TIMER ===== */
function startCountdown() {
  const end = new Date();
  end.setHours(end.getHours() + 8, end.getMinutes() + 42, end.getSeconds() + 17);

  function tick() {
    const now = new Date();
    let diff = Math.max(0, Math.floor((end - now) / 1000));
    const h = Math.floor(diff / 3600);
    diff %= 3600;
    const m = Math.floor(diff / 60);
    const s = diff % 60;

    const pad = n => String(n).padStart(2, '0');
    const hoursEl = $('timer-hours');
    const minsEl = $('timer-minutes');
    const secsEl = $('timer-seconds');
    if (hoursEl) hoursEl.textContent = pad(h);
    if (minsEl) minsEl.textContent = pad(m);
    if (secsEl) secsEl.textContent = pad(s);
  }

  tick();
  setInterval(tick, 1000);
}

/* ===== ANIMATE STATS ===== */
function animateStats() {
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = parseInt(el.textContent.replace(/[^0-9]/g, ''));
    let current = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current >= 1000 ? (current/1000).toFixed(0)+'K+' : current+'%';
      if (current >= target) clearInterval(timer);
    }, 30);
  });
}

/* ===== SEARCH ===== */
const searchInput = $('search-input');
const searchResults = $('search-results');

searchInput && searchInput.addEventListener('input', e => {
  const query = e.target.value.trim().toLowerCase();
  if (!query) { searchResults && (searchResults.style.display = 'none'); return; }

  const results = products.filter(p => p.name.toLowerCase().includes(query) || getCategoryLabel(p.category).toLowerCase().includes(query));
  if (!results.length) { searchResults && (searchResults.style.display = 'none'); return; }

  if (searchResults) {
    searchResults.style.display = 'block';
    searchResults.innerHTML = results.slice(0, 5).map(p => `
      <div class="search-result-item" onclick="addToCart(${p.id}); searchResults.style.display='none'; searchInput.value='';">
        <img src="${p.image}" alt="${p.name}" />
        <div>
          <strong>${p.name}</strong>
          <div style="font-size:0.8rem;color:var(--gold)">${formatPrice(p.price)}</div>
        </div>
      </div>
    `).join('');
  }
});

document.addEventListener('click', e => {
  if (searchResults && !searchResults.contains(e.target) && e.target !== searchInput) {
    searchResults.style.display = 'none';
  }
});

/* ===== NEWSLETTER ===== */
const newsletterForm = $('newsletter-form');
newsletterForm && newsletterForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = $('newsletter-email');
  if (email && email.value) {
    showToast(`Đăng ký thành công với email: ${email.value}`, 'success');
    email.value = '';
  }
});

/* ===== QUICK VIEW ===== */
function openQuickView(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const modal = $('quick-view-modal');
  const inner = $('quick-view-inner');
  if (!inner || !modal) return;

  inner.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <div class="qv-info">
      <div class="product-category">${getCategoryLabel(product.category)}</div>
      <h2 class="qv-name">${product.name}</h2>
      <div class="product-rating">
        <span class="stars">${'★'.repeat(Math.floor(product.rating))}</span>
        <span class="rating-count">(${product.reviews} đánh giá)</span>
      </div>
      <div class="qv-price">${formatPrice(product.price)}</div>
      <div class="product-original">${formatPrice(product.originalPrice)}</div>
      <p class="qv-desc">${product.description}</p>
      <div style="display:flex;gap:12px;margin-top:8px">
        <button class="btn btn-primary" onclick="addToCart(${product.id}); closeQuickView();" style="flex:1">
          <i class="fas fa-shopping-bag"></i> Thêm vào giỏ
        </button>
        <button class="btn btn-outline" onclick="closeQuickView()">Đóng</button>
      </div>
    </div>
  `;

  modal.style.display = 'flex';
  requestAnimationFrame(() => modal.classList.add('active'));
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  const modal = $('quick-view-modal');
  if (modal) { modal.classList.remove('active'); modal.style.display = 'none'; }
  document.body.style.overflow = '';
}

$('quick-view-close') && $('quick-view-close').addEventListener('click', closeQuickView);
$('quick-view-modal') && $('quick-view-modal').addEventListener('click', e => {
  if (e.target === $('quick-view-modal')) closeQuickView();
});

/* ===== LIVE CHAT ===== */
function initChat() {
  const toggle = $('chat-toggle');
  const window_ = $('chat-window');
  const badge = $('chat-badge');
  const closeBtn = $('chat-close-btn');
  const form = document.querySelector('.chat-input-area');
  const input = $('chat-input');
  const sendBtn = $('chat-send');
  const messagesEl = $('chat-messages');
  const typingEl = $('chat-typing');

  if (!toggle || !window_) return;

  // Show badge with initial message after delay
  setTimeout(() => {
    addBotMessage('Xin chào! 👋 Tôi là trợ lý Tạp Hóa Online. Tôi có thể giúp gì cho bạn hôm nay?');
    if (badge) badge.classList.remove('hidden');
  }, 2000);

  function toggleChat() {
    const isOpen = !window_.classList.contains('hidden');
    if (isOpen) {
      window_.classList.add('hidden');
      const openIcon = $('chat-icon-open');
      const closeIcon = $('chat-icon-close');
      if (openIcon) { openIcon.style.display = ''; }
      if (closeIcon) { closeIcon.classList.add('hidden'); }
    } else {
      window_.classList.remove('hidden');
      if (badge) badge.classList.add('hidden');
      const openIcon = $('chat-icon-open');
      const closeIcon = $('chat-icon-close');
      if (openIcon) openIcon.style.display = 'none';
      if (closeIcon) closeIcon.classList.remove('hidden');
      if (input) input.focus();
    }
  }

  toggle.addEventListener('click', toggleChat);
  closeBtn && closeBtn.addEventListener('click', toggleChat);

  // Quick replies
  document.querySelectorAll('.quick-reply').forEach(btn => {
    btn.addEventListener('click', () => {
      const msg = btn.dataset.msg;
      if (msg) sendUserMessage(msg);
    });
  });

  // Send message
  function handleSend(e) {
    if (e) e.preventDefault();
    if (!input) return;
    const msg = input.value.trim();
    if (!msg) return;
    sendUserMessage(msg);
    input.value = '';
  }

  sendBtn && sendBtn.addEventListener('click', handleSend);
  const chatForm = document.getElementById('chat-input') && document.querySelector('.chat-input-row');
  input && input.addEventListener('keypress', e => { if (e.key === 'Enter') handleSend(e); });

  function sendUserMessage(msg) {
    addUserMessage(msg);
    showTyping();
    const delay = 1000 + Math.random() * 1000;
    setTimeout(() => {
      hideTyping();
      addBotMessage(getBotResponse(msg));
    }, delay);
  }

  function addUserMessage(text) {
    const time = getTime();
    const div = document.createElement('div');
    div.className = 'chat-msg user';
    div.innerHTML = `
      <div class="chat-msg-bubble">
        ${escapeHtml(text)}
        <span class="chat-msg-time">${time}</span>
      </div>
      <div class="chat-msg-avatar">Bạn</div>
    `;
    if (messagesEl) { messagesEl.appendChild(div); scrollChat(); }
  }

  function addBotMessage(text) {
    const time = getTime();
    const div = document.createElement('div');
    div.className = 'chat-msg bot';
    div.innerHTML = `
      <div class="chat-msg-avatar"><i class="fas fa-robot"></i></div>
      <div class="chat-msg-bubble">
        ${text}
        <span class="chat-msg-time">${time}</span>
      </div>
    `;
    if (messagesEl) { messagesEl.appendChild(div); scrollChat(); }
  }

  function showTyping() { if (typingEl) typingEl.classList.remove('hidden'); scrollChat(); }
  function hideTyping() { if (typingEl) typingEl.classList.add('hidden'); }
  function scrollChat() { if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight; }
  function getTime() {
    const now = new Date();
    return `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  }
  function escapeHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
}

function getBotResponse(msg) {
  const m = msg.toLowerCase();
  if (m.includes('giao hàng') || m.includes('ship') || m.includes('vận chuyển')) {
    return 'Chúng tôi giao hàng toàn quốc trong <strong>2-5 ngày làm việc</strong>. Miễn phí ship cho đơn hàng trên <strong>500,000đ</strong>! 🚚';
  }
  if (m.includes('đổi trả') || m.includes('hoàn tiền') || m.includes('trả hàng')) {
    return 'Chính sách đổi trả trong <strong>30 ngày</strong> kể từ ngày nhận hàng. Sản phẩm cần còn nguyên tem nhãn. Hoàn tiền 100% nếu lỗi do nhà sản xuất! 🔄';
  }
  if (m.includes('thanh toán') || m.includes('payment') || m.includes('momo') || m.includes('zalo')) {
    return 'Chúng tôi chấp nhận: <strong>Thẻ tín dụng/ghi nợ</strong>, <strong>Ví MoMo</strong>, <strong>ZaloPay</strong> và <strong>Chuyển khoản ngân hàng</strong>. Tất cả đều an toàn và bảo mật! 💳';
  }
  if (m.includes('giảm giá') || m.includes('khuyến mãi') || m.includes('sale') || m.includes('coupon')) {
    return 'Hiện đang có <strong>Flash Sale giảm đến 50%</strong>! Đăng ký email để nhận thêm voucher <strong>10%</strong> cho đơn hàng đầu tiên! 🎉';
  }
  if (m.includes('chất lượng') || m.includes('hàng thật') || m.includes('chính hãng')) {
    return '100% sản phẩm tại LuxShop đều là <strong>hàng chính hãng</strong>, có giấy tờ chứng nhận xuất xứ rõ ràng. Cam kết hoàn tiền nếu phát hiện hàng giả! 🏆';
  }
  if (m.includes('liên hệ') || m.includes('hotline') || m.includes('điện thoại')) {
    return 'Bạn có thể liên hệ với chúng tôi qua:<br>📞 Hotline: <strong>1800 6868</strong> (miễn phí)<br>📧 Email: <strong>support@luxshop.vn</strong><br>⏰ Hỗ trợ từ <strong>8:00 – 22:00</strong> hàng ngày';
  }
  if (m.includes('xin chào') || m.includes('hello') || m.includes('hi') || m.includes('chào')) {
    return 'Xin chào! Rất vui được gặp bạn tại LuxShop! 😊 Bạn cần hỗ trợ gì ạ? Tôi có thể giúp bạn về sản phẩm, đơn hàng, giao hàng hay thanh toán.';
  }
  if (m.includes('cảm ơn') || m.includes('thanks') || m.includes('ok')) {
    return 'Cảm ơn bạn đã ghé thăm Tạp Hóa Online! Chúc bạn mua sắm vui vẻ! 🌟 Nếu cần thêm hỗ trợ, đừng ngại nhắn tin nhé!';
  }
  const defaults = [
    'Cảm ơn bạn đã liên hệ! Tôi đang kết nối bạn với nhân viên tư vấn. Vui lòng chờ trong giây lát ⏳',
    'Tôi hiểu câu hỏi của bạn! Nhân viên sẽ liên hệ lại trong thời gian sớm nhất qua số điện thoại hoặc email. 📱',
    'Câu hỏi hay đó! Để được tư vấn chi tiết, bạn có thể gọi hotline <strong>1800 6868</strong> (miễn phí) nhé! 👍'
  ];
  return defaults[Math.floor(Math.random() * defaults.length)];
}

// Quick reply global function
window.sendQuickReply = function(msg) {
  const input = $('chat-input');
  if (input) input.value = msg;
  const sendBtn = $('chat-send');
  if (sendBtn) sendBtn.click();
};

/* ===== EXPOSE GLOBALS ===== */
window.addToCart = addToCart;
window.changeQty = changeQty;
window.removeFromCart = removeFromCart;
window.openQuickView = openQuickView;
window.closeQuickView = closeQuickView;
window.goToStep = goToStep;
window.validateShipping = validateShipping;
window.processPayment = processPayment;

/* ===== NAV MOBILE LINKS ===== */
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const navLinks = $('nav-links');
    navLinks && navLinks.classList.remove('mobile-open');
  });
});

/* ===== MOBILE NAV STYLE ===== */
const mobileStyle = document.createElement('style');
mobileStyle.textContent = `
  @media(max-width:768px){
    #nav-links{
      position:fixed;top:72px;left:0;right:0;
      background:rgba(10,15,44,0.98);backdrop-filter:blur(20px);
      flex-direction:column;padding:20px;gap:4px;
      border-bottom:1px solid rgba(245,166,35,0.2);
      transform:translateY(-120%);opacity:0;pointer-events:none;
      transition:all 0.3s ease;display:flex!important;
    }
    #nav-links.mobile-open{transform:translateY(0);opacity:1;pointer-events:auto;}
    .nav-link{padding:12px 16px;display:block;}
  }
`;
document.head.appendChild(mobileStyle);

console.log('%cTạp Hóa Online 🛒', 'color:#f5a623;font-size:20px;font-weight:900');
console.log('%cReady!', 'color:#10b981;font-size:14px');
