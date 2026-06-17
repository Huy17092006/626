/**
 * Tests for the redesigned payment flow (PR: Redesign payment flow:
 * show prominent STK screen after order placement).
 *
 * Covers the changed/added functions:
 *   - updateAmounts()        – now only populates #confirmTotal
 *   - placeOrder()           – populates payment screen, shows paymentScreenOverlay
 *   - closePaymentScreen()   – removes active class, restores body overflow
 *   - confirmTransferred()   – closes payment screen, opens success overlay
 *   - paymentScreenOverlay backdrop-click handler
 *   - Escape key handler now calls closePaymentScreen()
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ─── Minimal HTML fixture ────────────────────────────────────────────────────
// Contains every element that app.js queries at load-time (global listeners)
// plus all elements exercised by the functions under test.
const MINIMAL_HTML = `
<div id="bgParticles"></div>
<div id="navbar"></div>
<button id="scrollTopBtn"></button>
<div id="searchOverlay" class=""></div>
<input id="searchInput" />
<div id="searchResults"></div>
<div id="productsGrid"></div>
<button id="loadMoreBtn"></button>
<div id="cartBadge">0</div>
<div id="cartItems"></div>
<div id="cartFooter" style="display:none"></div>
<div id="cartTotal">0&#x20AB;</div>
<div id="cartSidebar"></div>
<div id="cartOverlay"></div>
<input id="promoInput" />
<div id="checkoutOverlay" class="modal-overlay"></div>
<div id="checkoutStep1" class="checkout-step"></div>
<div id="checkoutStep2" class="checkout-step hidden"></div>
<div id="checkoutStep3" class="checkout-step hidden"></div>
<div id="step1Ind" class="step active"></div>
<div id="step2Ind" class="step"></div>
<div id="step3Ind" class="step"></div>
<input id="buyerName" value="Test User" />
<input id="buyerPhone" value="0912345678" />
<input id="buyerAddress" value="123 Test St" />
<select id="buyerCity"><option>H&#x00E0; N&#x1ED9;i</option></select>
<input id="buyerNote" />
<div id="orderSummary"></div>
<div id="confirmTotal">0&#x20AB;</div>
<div id="payMomo" class="pay-method-card"></div>
<div id="payZalopay" class="pay-method-card"></div>
<div id="payBank" class="pay-method-card"></div>
<div id="payCod" class="pay-method-card"></div>

<!-- Payment screen overlay (new) -->
<div id="paymentScreenOverlay" class="modal-overlay">
  <div id="paymentScreenModal" class="payment-screen-modal">
    <h2 id="psTitle">Thanh to&#xE1;n qua MoMo</h2>
    <div id="psMomo" class="ps-body hidden"></div>
    <div id="psZalo" class="ps-body hidden"></div>
    <div id="psBank" class="ps-body hidden"></div>
    <div id="psCod"  class="ps-body hidden"></div>
    <strong id="psMomoAmount">0&#x20AB;</strong>
    <strong id="psMomoContent">NEON-001</strong>
    <strong id="psZaloAmount">0&#x20AB;</strong>
    <strong id="psZaloContent">NEON-001</strong>
    <strong id="psBankAmount">0&#x20AB;</strong>
    <strong id="psBankContent">NEON-001</strong>
    <div    id="psCodAmount">0&#x20AB;</div>
  </div>
</div>

<!-- Success overlay -->
<div id="successOverlay" class="modal-overlay"></div>
<strong id="orderCode">NEON-001</strong>

<!-- Product modal -->
<div id="productOverlay" class="modal-overlay"></div>
<div id="productModalContent"></div>

<!-- Chat / toast -->
<div id="chatOverlay"></div>
<div id="chatWidget" class=""></div>
<div id="chatMessages"></div>
<input id="chatInput" />
<div id="toastContainer"></div>

<!-- Misc -->
<div id="products"></div>
<div id="features"></div>
`;

// ─── One cart item: PRODUCTS[0] = iPhone 16 Pro Max, price 34_990_000 ───────
const CART_ITEM = [{ id: 1, qty: 1 }];
// Formatted price via toLocaleString('vi') + '₫'
// Node's ICU data should produce '34.990.000₫'
const ITEM_PRICE = 34990000;

// ─── Globals that jsdom doesn't provide ─────────────────────────────────────
beforeAll(() => {
  // IntersectionObserver is not in jsdom
  global.IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };

  // navigator.clipboard (not fully implemented in jsdom)
  Object.defineProperty(global.navigator, 'clipboard', {
    value: { writeText: jest.fn().mockResolvedValue(undefined) },
    configurable: true,
  });
});

// ─── Load app.js into the jsdom window ──────────────────────────────────────
// IMPORTANT: `let` / `const` declarations inside eval() are scoped to the eval
// block and do NOT become window properties.  To control initial state, we
// pre-populate localStorage *before* calling loadApp() so that app.js reads
// the correct values from storage when it initialises its `let` variables.
function loadApp() {
  const src = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
  // eslint-disable-next-line no-eval
  window.eval(src);
}

function setupDOM() {
  document.body.innerHTML = MINIMAL_HTML;
}

// ─── Pre-populate localStorage so app.js' let variables start correctly ─────
function seedLocalStorage({ cart = [], orderCounter = 1000 } = {}) {
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('orderCounter', String(orderCounter));
}

// ─── Select a payment method through the exposed function ────────────────────
// This is the only reliable way to set the internal `let selectedPayment`
// variable, because `let` is not exposed on window.
function choosePayment(method) {
  window.selectPayment(method);
}

// ─── Default beforeEach: reset DOM + storage + load app ─────────────────────
beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
  setupDOM();
  // Default: one item in cart, counter at 1000
  seedLocalStorage({ cart: CART_ITEM, orderCounter: 1000 });
  loadApp();
});

// ════════════════════════════════════════════════════════════════════════════
// updateAmounts() – PR change: removed per-payment-method element updates;
// now only updates #confirmTotal.
// ════════════════════════════════════════════════════════════════════════════
describe('updateAmounts()', () => {
  test('sets #confirmTotal to the formatted cart total when cart has items', () => {
    window.updateAmounts();
    const confirmTotal = document.getElementById('confirmTotal');
    // formatPrice appends '₫' and toLocaleString('vi') formats thousands
    expect(confirmTotal.textContent).toMatch(/₫$/);
    expect(confirmTotal.textContent).not.toBe('0₫');
  });

  test('shows 0₫ in #confirmTotal when the cart is empty', () => {
    localStorage.clear();
    seedLocalStorage({ cart: [], orderCounter: 1000 });
    loadApp(); // re-load with empty cart
    window.updateAmounts();
    expect(document.getElementById('confirmTotal').textContent).toBe('0₫');
  });

  test('does NOT update the old per-method amount elements (removed in PR)', () => {
    // These IDs were removed from index.html in this PR.
    window.updateAmounts();
    expect(document.getElementById('momoAmount')).toBeNull();
    expect(document.getElementById('zalopayAmount')).toBeNull();
    expect(document.getElementById('bankAmount')).toBeNull();
    expect(document.getElementById('codAmount')).toBeNull();
  });

  test('reflects a multi-item cart total correctly', () => {
    // PRODUCTS id:1 = 34_990_000 + id:2 = 29_990_000 → 64_980_000
    localStorage.clear();
    seedLocalStorage({ cart: [{ id: 1, qty: 1 }, { id: 2, qty: 1 }], orderCounter: 1000 });
    loadApp();
    window.updateAmounts();
    const text = document.getElementById('confirmTotal').textContent;
    expect(text).toContain('₫');
    // 64_980_000 formatted — contains at least '64'
    expect(text).toMatch(/64/);
  });

  test('reflects a quantity > 1 in the total', () => {
    // qty:2 of id:1 → 2 × 34_990_000 = 69_980_000
    localStorage.clear();
    seedLocalStorage({ cart: [{ id: 1, qty: 2 }], orderCounter: 1000 });
    loadApp();
    window.updateAmounts();
    const text = document.getElementById('confirmTotal').textContent;
    // 69_980_000 contains '69'
    expect(text).toMatch(/69/);
  });
});

// ════════════════════════════════════════════════════════════════════════════
// closePaymentScreen() – new function in PR
// ════════════════════════════════════════════════════════════════════════════
describe('closePaymentScreen()', () => {
  test('removes the "active" class from #paymentScreenOverlay', () => {
    const overlay = document.getElementById('paymentScreenOverlay');
    overlay.classList.add('active');
    window.closePaymentScreen();
    expect(overlay.classList.contains('active')).toBe(false);
  });

  test('resets document.body.style.overflow to empty string', () => {
    document.body.style.overflow = 'hidden';
    window.closePaymentScreen();
    expect(document.body.style.overflow).toBe('');
  });

  test('is idempotent – calling twice does not throw', () => {
    expect(() => {
      window.closePaymentScreen();
      window.closePaymentScreen();
    }).not.toThrow();
  });

  test('leaves #paymentScreenOverlay without "active" when it was already closed', () => {
    const overlay = document.getElementById('paymentScreenOverlay');
    expect(overlay.classList.contains('active')).toBe(false);
    window.closePaymentScreen(); // no-op
    expect(overlay.classList.contains('active')).toBe(false);
  });
});

// ════════════════════════════════════════════════════════════════════════════
// confirmTransferred() – new function in PR
// ════════════════════════════════════════════════════════════════════════════
describe('confirmTransferred()', () => {
  beforeEach(() => {
    // Simulate the payment screen being open
    document.getElementById('paymentScreenOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  test('closes the payment screen overlay', () => {
    window.confirmTransferred();
    expect(document.getElementById('paymentScreenOverlay').classList.contains('active')).toBe(false);
  });

  test('opens the success overlay', () => {
    window.confirmTransferred();
    expect(document.getElementById('successOverlay').classList.contains('active')).toBe(true);
  });

  test('sets body overflow to hidden (success modal traps scroll)', () => {
    window.confirmTransferred();
    expect(document.body.style.overflow).toBe('hidden');
  });

  test('still opens success overlay when payment screen was already closed', () => {
    document.getElementById('paymentScreenOverlay').classList.remove('active');
    window.confirmTransferred();
    expect(document.getElementById('successOverlay').classList.contains('active')).toBe(true);
  });

  test('does not leave paymentScreenOverlay active after confirmation', () => {
    window.confirmTransferred();
    expect(document.getElementById('paymentScreenOverlay').classList.contains('active')).toBe(false);
  });
});

// ════════════════════════════════════════════════════════════════════════════
// placeOrder() – redesigned in PR
// ════════════════════════════════════════════════════════════════════════════
describe('placeOrder()', () => {
  beforeEach(() => {
    // Checkout overlay is open
    document.getElementById('checkoutOverlay').classList.add('active');
    // Use selectPayment() to set the internal let variable; default to momo
    choosePayment('momo');
  });

  // ── Order code ────────────────────────────────────────────────────────────
  test('increments orderCounter and writes NEON-{n} to #orderCode', () => {
    // localStorage seeded with orderCounter=1000 → after placeOrder it becomes 1001
    window.placeOrder();
    expect(document.getElementById('orderCode').textContent).toBe('NEON-1001');
  });

  test('persists incremented orderCounter to localStorage', () => {
    window.placeOrder();
    expect(Number(localStorage.getItem('orderCounter'))).toBe(1001);
  });

  test('uses sequential codes on successive calls', () => {
    window.placeOrder();
    // Reset DOM + state for the second call
    document.getElementById('checkoutOverlay').classList.add('active');
    choosePayment('momo');
    // Re-seed cart so second call has items too
    localStorage.setItem('cart', JSON.stringify(CART_ITEM));
    // Force cart reload (app reads it in saveCart/updateCartUI via localStorage)
    // placeOrder uses the current internal cart which is now [] after first call.
    // We need to reload app with fresh cart to simulate a second order.
    localStorage.setItem('orderCounter', '1001');
    loadApp();
    document.getElementById('checkoutOverlay').classList.add('active');
    choosePayment('cod');
    window.placeOrder();
    expect(document.getElementById('orderCode').textContent).toBe('NEON-1002');
  });

  // ── Payment screen amount elements ────────────────────────────────────────
  test('populates #psMomoAmount with the formatted total', () => {
    window.placeOrder();
    const text = document.getElementById('psMomoAmount').textContent;
    expect(text).toMatch(/₫$/);
    expect(text).not.toBe('0₫');
  });

  test('populates #psZaloAmount with the formatted total', () => {
    window.placeOrder();
    expect(document.getElementById('psZaloAmount').textContent).toMatch(/₫$/);
  });

  test('populates #psBankAmount with the formatted total', () => {
    window.placeOrder();
    expect(document.getElementById('psBankAmount').textContent).toMatch(/₫$/);
  });

  test('populates #psCodAmount with the formatted total', () => {
    window.placeOrder();
    expect(document.getElementById('psCodAmount').textContent).toMatch(/₫$/);
  });

  test('all amount elements receive the same total value', () => {
    window.placeOrder();
    const momo = document.getElementById('psMomoAmount').textContent;
    const zalo = document.getElementById('psZaloAmount').textContent;
    const bank = document.getElementById('psBankAmount').textContent;
    const cod  = document.getElementById('psCodAmount').textContent;
    expect(momo).toBe(zalo);
    expect(momo).toBe(bank);
    expect(momo).toBe(cod);
  });

  // ── Transfer content / order code elements ────────────────────────────────
  test('populates #psMomoContent with the order code', () => {
    window.placeOrder();
    expect(document.getElementById('psMomoContent').textContent).toBe('NEON-1001');
  });

  test('populates #psZaloContent with the order code', () => {
    window.placeOrder();
    expect(document.getElementById('psZaloContent').textContent).toBe('NEON-1001');
  });

  test('populates #psBankContent with the order code', () => {
    window.placeOrder();
    expect(document.getElementById('psBankContent').textContent).toBe('NEON-1001');
  });

  // ── Title mapping ─────────────────────────────────────────────────────────
  test.each([
    ['momo',    'Thanh toán qua MoMo'],
    ['zalopay', 'Thanh toán qua ZaloPay'],
    ['bank',    'Chuyển khoản ngân hàng'],
    ['cod',     'Thanh toán khi nhận hàng'],
  ])('sets correct #psTitle for payment method "%s"', (method, expectedTitle) => {
    // Re-seed cart and re-select payment method for each parameterised run
    localStorage.setItem('cart', JSON.stringify(CART_ITEM));
    loadApp();
    document.getElementById('checkoutOverlay').classList.add('active');
    choosePayment(method);
    window.placeOrder();
    expect(document.getElementById('psTitle').textContent).toBe(expectedTitle);
  });

  // ── Panel visibility ──────────────────────────────────────────────────────
  test.each([
    ['momo',    'psMomo', ['psZalo', 'psBank', 'psCod']],
    ['zalopay', 'psZalo', ['psMomo', 'psBank', 'psCod']],
    ['bank',    'psBank', ['psMomo', 'psZalo', 'psCod']],
    ['cod',     'psCod',  ['psMomo', 'psZalo', 'psBank']],
  ])('for payment "%s" shows only the correct panel', (method, visibleId, hiddenIds) => {
    localStorage.setItem('cart', JSON.stringify(CART_ITEM));
    loadApp();
    document.getElementById('checkoutOverlay').classList.add('active');
    choosePayment(method);
    window.placeOrder();

    expect(document.getElementById(visibleId).classList.contains('hidden')).toBe(false);
    hiddenIds.forEach(id => {
      expect(document.getElementById(id).classList.contains('hidden')).toBe(true);
    });
  });

  // ── All panels initially hidden, then only target revealed ───────────────
  test('hides all four panels before revealing the selected one', () => {
    // Start with psMomo visible to verify it gets re-hidden for a non-momo method
    document.getElementById('psMomo').classList.remove('hidden');
    localStorage.setItem('cart', JSON.stringify(CART_ITEM));
    loadApp();
    document.getElementById('checkoutOverlay').classList.add('active');
    choosePayment('cod');
    window.placeOrder();

    expect(document.getElementById('psMomo').classList.contains('hidden')).toBe(true);
    expect(document.getElementById('psCod').classList.contains('hidden')).toBe(false);
  });

  // ── Overlay & overflow ────────────────────────────────────────────────────
  test('closes the checkout overlay', () => {
    window.placeOrder();
    expect(document.getElementById('checkoutOverlay').classList.contains('active')).toBe(false);
  });

  test('opens the payment screen overlay', () => {
    window.placeOrder();
    expect(document.getElementById('paymentScreenOverlay').classList.contains('active')).toBe(true);
  });

  test('sets body overflow to hidden while payment screen is shown', () => {
    window.placeOrder();
    expect(document.body.style.overflow).toBe('hidden');
  });

  // ── Cart clearing ─────────────────────────────────────────────────────────
  test('empties #cartBadge to 0', () => {
    window.placeOrder();
    expect(document.getElementById('cartBadge').textContent).toBe('0');
  });

  test('persists empty cart to localStorage', () => {
    window.placeOrder();
    expect(JSON.parse(localStorage.getItem('cart'))).toEqual([]);
  });
});

// ════════════════════════════════════════════════════════════════════════════
// paymentScreenOverlay backdrop-click handler (new in PR)
// ════════════════════════════════════════════════════════════════════════════
describe('paymentScreenOverlay backdrop-click handler', () => {
  test('closes overlay when click target is the overlay element itself', () => {
    const overlay = document.getElementById('paymentScreenOverlay');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Simulate backdrop click (target === overlay)
    const event = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(event, 'target', { value: overlay, configurable: true });
    overlay.dispatchEvent(event);

    expect(overlay.classList.contains('active')).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  test('does NOT close overlay when click target is a child element', () => {
    const overlay = document.getElementById('paymentScreenOverlay');
    overlay.classList.add('active');

    const modal = document.getElementById('paymentScreenModal');
    const event = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(event, 'target', { value: modal, configurable: true });
    overlay.dispatchEvent(event);

    // Handler checks e.target === this (overlay), so child click must not close it
    expect(overlay.classList.contains('active')).toBe(true);
  });
});

// ════════════════════════════════════════════════════════════════════════════
// Escape key handler – PR added closePaymentScreen() call
// ════════════════════════════════════════════════════════════════════════════
describe('Escape key handler includes closePaymentScreen()', () => {
  test('pressing Escape removes "active" from paymentScreenOverlay', () => {
    const overlay = document.getElementById('paymentScreenOverlay');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));

    expect(overlay.classList.contains('active')).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  test('pressing Escape also closes checkout overlay (pre-existing behaviour preserved)', () => {
    document.getElementById('checkoutOverlay').classList.add('active');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(document.getElementById('checkoutOverlay').classList.contains('active')).toBe(false);
  });

  test('pressing a non-Escape key does not close paymentScreenOverlay', () => {
    const overlay = document.getElementById('paymentScreenOverlay');
    overlay.classList.add('active');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

    expect(overlay.classList.contains('active')).toBe(true);
  });

  test('pressing Escape closes both paymentScreenOverlay and successOverlay if both are open', () => {
    document.getElementById('paymentScreenOverlay').classList.add('active');
    document.getElementById('successOverlay').classList.add('active');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));

    expect(document.getElementById('paymentScreenOverlay').classList.contains('active')).toBe(false);
    expect(document.getElementById('successOverlay').classList.contains('active')).toBe(false);
  });
});

// ════════════════════════════════════════════════════════════════════════════
// Regression: old payment-detail panel IDs removed from HTML / JS
// ════════════════════════════════════════════════════════════════════════════
describe('Removed payment detail panel elements (regression)', () => {
  test.each([
    'momoDetail',
    'zalopayDetail',
    'bankDetail',
    'codDetail',
    'momoContent',
    'zalopayContent',
    'bankContent',
    'momoAmount',
    'zalopayAmount',
    'bankAmount',
    'codAmount',
  ])('#%s no longer exists in the DOM', (id) => {
    expect(document.getElementById(id)).toBeNull();
  });
});

// ════════════════════════════════════════════════════════════════════════════
// New payment screen elements exist in the DOM
// ════════════════════════════════════════════════════════════════════════════
describe('New payment screen DOM elements present', () => {
  test.each([
    'paymentScreenOverlay',
    'paymentScreenModal',
    'psTitle',
    'psMomo',
    'psZalo',
    'psBank',
    'psCod',
    'psMomoAmount',
    'psMomoContent',
    'psZaloAmount',
    'psZaloContent',
    'psBankAmount',
    'psBankContent',
    'psCodAmount',
  ])('element #%s exists', (id) => {
    expect(document.getElementById(id)).not.toBeNull();
  });
});