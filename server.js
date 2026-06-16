const express = require('express');
const cors    = require('cors');
const fs      = require('fs');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;
const DATA = path.join(__dirname, 'orders.json');

// ── Middleware ────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));   // serves index.html, styles.css, app.js

// ── Helpers ───────────────────────────────────────────────────
function loadOrders() {
  if (!fs.existsSync(DATA)) return [];
  try { return JSON.parse(fs.readFileSync(DATA, 'utf8')); }
  catch { return []; }
}

function saveOrders(orders) {
  fs.writeFileSync(DATA, JSON.stringify(orders, null, 2), 'utf8');
}

const STATUS_LABELS = {
  pending:    'Chờ xác nhận',
  confirmed:  'Đã xác nhận',
  processing: 'Đang xử lý',
  shipping:   'Đang giao hàng',
  delivered:  'Đã giao',
  cancelled:  'Đã huỷ'
};

// ── API: Create Order ─────────────────────────────────────────
app.post('/api/orders', (req, res) => {
  const body = req.body;
  if (!body || !body.customer || !body.items || !body.items.length) {
    return res.status(400).json({ error: 'Dữ liệu đơn hàng không hợp lệ' });
  }

  const orders = loadOrders();
  const order = {
    id:        body.id || `#TH${Date.now().toString().slice(-8)}`,
    createdAt: new Date().toISOString(),
    customer:  body.customer,
    items:     body.items,
    payment:   body.payment || { method: 'unknown', label: 'Không xác định' },
    subtotal:  body.subtotal || 0,
    shipping:  body.shipping || 0,
    total:     body.total    || 0,
    status:    'pending',
    note:      body.customer.note || ''
  };

  orders.unshift(order);
  saveOrders(orders);

  console.log(`[${new Date().toLocaleString('vi-VN')}] Đơn mới: ${order.id} — ${order.customer.name} — ${order.total.toLocaleString('vi-VN')}đ`);
  res.status(201).json({ success: true, order });
});

// ── API: List Orders ──────────────────────────────────────────
app.get('/api/orders', (req, res) => {
  let orders = loadOrders();
  const { status, search, limit = 50, offset = 0 } = req.query;

  if (status && status !== 'all') orders = orders.filter(o => o.status === status);
  if (search) {
    const q = search.toLowerCase();
    orders = orders.filter(o =>
      o.id.toLowerCase().includes(q) ||
      o.customer.name.toLowerCase().includes(q) ||
      o.customer.phone.includes(q)
    );
  }

  const total = orders.length;
  orders = orders.slice(Number(offset), Number(offset) + Number(limit));

  res.json({ total, orders });
});

// ── API: Get Single Order ─────────────────────────────────────
app.get('/api/orders/:id', (req, res) => {
  const orders = loadOrders();
  const order  = orders.find(o => o.id === decodeURIComponent(req.params.id));
  if (!order) return res.status(404).json({ error: 'Không tìm thấy đơn hàng' });
  res.json(order);
});

// ── API: Update Status ────────────────────────────────────────
app.patch('/api/orders/:id/status', (req, res) => {
  const { status } = req.body;
  if (!STATUS_LABELS[status]) return res.status(400).json({ error: 'Trạng thái không hợp lệ' });

  const orders = loadOrders();
  const idx    = orders.findIndex(o => o.id === decodeURIComponent(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Không tìm thấy đơn hàng' });

  orders[idx].status    = status;
  orders[idx].updatedAt = new Date().toISOString();
  saveOrders(orders);

  console.log(`[${new Date().toLocaleString('vi-VN')}] Cập nhật ${orders[idx].id} → ${STATUS_LABELS[status]}`);
  res.json({ success: true, order: orders[idx] });
});

// ── API: Delete Order ─────────────────────────────────────────
app.delete('/api/orders/:id', (req, res) => {
  let orders = loadOrders();
  const id   = decodeURIComponent(req.params.id);
  const len  = orders.length;
  orders     = orders.filter(o => o.id !== id);
  if (orders.length === len) return res.status(404).json({ error: 'Không tìm thấy đơn hàng' });
  saveOrders(orders);
  res.json({ success: true });
});

// ── API: Stats ────────────────────────────────────────────────
app.get('/api/stats', (req, res) => {
  const orders = loadOrders();
  const stats  = {
    total:     orders.length,
    pending:   orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    shipping:  orders.filter(o => o.status === 'shipping').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    revenue:   orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.total, 0)
  };
  res.json(stats);
});

// ── Admin Dashboard ───────────────────────────────────────────
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'admin.html')));

// ── Start ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('');
  console.log('  🛒  Tạp Hóa Online — Server đang chạy');
  console.log(`  🌐  Cửa hàng  : http://localhost:${PORT}`);
  console.log(`  📊  Admin     : http://localhost:${PORT}/admin`);
  console.log(`  📦  API       : http://localhost:${PORT}/api/orders`);
  console.log('');
});
