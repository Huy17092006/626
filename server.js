const express    = require('express');
const cors       = require('cors');
const fs         = require('fs');
const path       = require('path');
const nodemailer = require('nodemailer');

const app  = express();
const PORT = process.env.PORT || 3000;
const DATA = path.join(__dirname, 'orders.json');

// ── Email config ─────────────────────────────────────────────
// Để nhận email đơn hàng: cung cấp GMAIL_PASS=<App Password của Gmail>
// Tạo App Password: https://myaccount.google.com/apppasswords
const SHOP_EMAIL  = 'phunggiahuy99999@gmail.com';
const GMAIL_PASS  = process.env.GMAIL_PASS || '';

let transporter = null;
if (GMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: SHOP_EMAIL, pass: GMAIL_PASS }
  });
  transporter.verify(err => {
    if (err) console.warn('⚠️  Gmail không kết nối được:', err.message);
    else     console.log('✅  Gmail sẵn sàng — Thông báo đơn hàng sẽ gửi đến', SHOP_EMAIL);
  });
} else {
  console.log('ℹ️   Email thông báo: chưa cấu hình (set GMAIL_PASS=... để bật)');
}

// ── Middleware ────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// ── Helpers ───────────────────────────────────────────────────
function loadOrders() {
  if (!fs.existsSync(DATA)) return [];
  try { return JSON.parse(fs.readFileSync(DATA, 'utf8')); }
  catch { return []; }
}

function saveOrders(orders) {
  fs.writeFileSync(DATA, JSON.stringify(orders, null, 2), 'utf8');
}

function fmt(n) { return Number(n).toLocaleString('vi-VN') + 'đ'; }

const STATUS_LABELS = {
  pending:    'Chờ xác nhận',
  confirmed:  'Đã xác nhận',
  processing: 'Đang xử lý',
  shipping:   'Đang giao hàng',
  delivered:  'Đã giao',
  cancelled:  'Đã huỷ'
};

const PAY_LABELS = {
  card:     'Thẻ tín dụng/Ghi nợ',
  momo:     'Ví MoMo (0968 679 993)',
  zalopay:  'ZaloPay (0968 679 993)',
  bank:     'Chuyển khoản TPBank (0968679993)',
  unknown:  'Không xác định'
};

// ── Email: Thông báo đơn mới ──────────────────────────────────
async function sendOrderEmail(order) {
  if (!transporter) return;
  const itemsHtml = order.items.map(i => `
    <tr>
      <td style="padding:10px 8px;border-bottom:1px solid #eee">${i.name}</td>
      <td style="padding:10px 8px;border-bottom:1px solid #eee;text-align:center">${i.qty}</td>
      <td style="padding:10px 8px;border-bottom:1px solid #eee;text-align:right">${fmt(i.price)}</td>
      <td style="padding:10px 8px;border-bottom:1px solid #eee;text-align:right;font-weight:bold;color:#e07b00">${fmt(i.price * i.qty)}</td>
    </tr>
  `).join('');

  const html = `
  <!DOCTYPE html>
  <html><head><meta charset="UTF-8"/></head>
  <body style="font-family:'Segoe UI',Arial,sans-serif;background:#f5f5f5;margin:0;padding:20px">
    <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1)">

      <!-- Header -->
      <div style="background:linear-gradient(135deg,#0a0f2c,#1a1a2e);padding:28px 32px;text-align:center">
        <h1 style="color:#f5a623;margin:0;font-size:1.6rem;letter-spacing:2px">🛒 Tạp Hóa Online</h1>
        <p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:0.9rem">Thông báo đơn hàng mới</p>
      </div>

      <!-- Order badge -->
      <div style="background:#fff8ed;border-left:4px solid #f5a623;padding:16px 32px;display:flex;justify-content:space-between;align-items:center">
        <div>
          <p style="margin:0;font-size:0.8rem;color:#666">Mã đơn hàng</p>
          <h2 style="margin:4px 0 0;color:#0a0f2c;font-size:1.2rem">${order.id}</h2>
        </div>
        <div style="text-align:right">
          <p style="margin:0;font-size:0.8rem;color:#666">Thời gian</p>
          <p style="margin:4px 0 0;font-weight:600;color:#0a0f2c">${new Date(order.createdAt).toLocaleString('vi-VN')}</p>
        </div>
      </div>

      <div style="padding:24px 32px">
        <!-- Customer -->
        <h3 style="color:#0a0f2c;border-bottom:2px solid #f5a623;padding-bottom:8px;margin-bottom:16px">👤 Thông tin khách hàng</h3>
        <table style="width:100%;border-collapse:collapse;font-size:0.9rem">
          <tr><td style="padding:6px 0;color:#666;width:130px">Họ tên:</td><td style="font-weight:600">${order.customer.name}</td></tr>
          <tr><td style="padding:6px 0;color:#666">Điện thoại:</td><td style="font-weight:600">${order.customer.phone}</td></tr>
          <tr><td style="padding:6px 0;color:#666">Email:</td><td>${order.customer.email || '—'}</td></tr>
          <tr><td style="padding:6px 0;color:#666">Địa chỉ:</td><td>${order.customer.address}</td></tr>
          <tr><td style="padding:6px 0;color:#666">Tỉnh/TP:</td><td>${order.customer.city || '—'}</td></tr>
          ${order.note ? `<tr><td style="padding:6px 0;color:#666">Ghi chú:</td><td style="color:#e07b00">${order.note}</td></tr>` : ''}
        </table>

        <!-- Products -->
        <h3 style="color:#0a0f2c;border-bottom:2px solid #f5a623;padding-bottom:8px;margin:24px 0 16px">📦 Sản phẩm đặt hàng</h3>
        <table style="width:100%;border-collapse:collapse;font-size:0.9rem">
          <thead>
            <tr style="background:#f0f0f0">
              <th style="padding:10px 8px;text-align:left">Sản phẩm</th>
              <th style="padding:10px 8px;text-align:center">SL</th>
              <th style="padding:10px 8px;text-align:right">Đơn giá</th>
              <th style="padding:10px 8px;text-align:right">Thành tiền</th>
            </tr>
          </thead>
          <tbody>${itemsHtml}</tbody>
        </table>

        <!-- Totals -->
        <div style="background:#f9f9f9;border-radius:8px;padding:16px;margin-top:16px">
          <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:0.9rem">
            <span style="color:#666">Tạm tính:</span><span>${fmt(order.subtotal)}</span>
          </div>
          <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:0.9rem">
            <span style="color:#666">Phí ship:</span><span style="color:#16a34a">Miễn phí</span>
          </div>
          <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:0.9rem">
            <span style="color:#666">Thanh toán:</span><span>${PAY_LABELS[order.payment?.method] || '—'}</span>
          </div>
          <div style="display:flex;justify-content:space-between;padding-top:12px;border-top:2px solid #e5e5e5">
            <strong style="font-size:1rem">Tổng cộng:</strong>
            <strong style="font-size:1.2rem;color:#e07b00">${fmt(order.total)}</strong>
          </div>
        </div>

        <!-- Action -->
        <div style="text-align:center;margin-top:24px">
          <a href="http://localhost:${PORT}/admin"
             style="background:linear-gradient(135deg,#f5a623,#e8950f);color:#0a0f2c;padding:12px 32px;border-radius:50px;text-decoration:none;font-weight:700;display:inline-block">
            📊 Xem trang Admin
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="background:#0a0f2c;padding:16px 32px;text-align:center">
        <p style="color:rgba(255,255,255,0.5);margin:0;font-size:0.78rem">
          © 2026 Tạp Hóa Online · support@taphoaonline.vn
        </p>
      </div>
    </div>
  </body></html>
  `;

  try {
    await transporter.sendMail({
      from:    `"Tạp Hóa Online" <${SHOP_EMAIL}>`,
      to:      SHOP_EMAIL,
      subject: `🛒 Đơn hàng mới ${order.id} — ${order.customer.name} — ${fmt(order.total)}`,
      html
    });
    console.log(`📧  Email thông báo đã gửi → ${SHOP_EMAIL}`);
  } catch (err) {
    console.warn('⚠️  Gửi email thất bại:', err.message);
  }
}

// ── API: Create Order ─────────────────────────────────────────
app.post('/api/orders', async (req, res) => {
  const body = req.body;
  if (!body || !body.customer || !body.items || !body.items.length) {
    return res.status(400).json({ error: 'Dữ liệu đơn hàng không hợp lệ' });
  }

  const orders = loadOrders();
  const order = {
    id:        body.id || `#THO${Date.now().toString().slice(-8)}`,
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

  const time = new Date().toLocaleString('vi-VN');
  console.log(`[${time}] 🆕 Đơn mới: ${order.id} — ${order.customer.name} — ${fmt(order.total)}`);

  // Gửi email thông báo bất đồng bộ (không block response)
  sendOrderEmail(order).catch(() => {});

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

  console.log(`[${new Date().toLocaleString('vi-VN')}] 🔄 ${orders[idx].id} → ${STATUS_LABELS[status]}`);
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
    processing:orders.filter(o => o.status === 'processing').length,
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
  console.log(`  📧  Gmail     : ${SHOP_EMAIL}`);
  console.log('');
  if (!GMAIL_PASS) {
    console.log('  💡  Để bật email thông báo đơn hàng, chạy:');
    console.log('      GMAIL_PASS=<app-password> npm start');
    console.log('      (Tạo App Password tại: myaccount.google.com/apppasswords)');
    console.log('');
  }
});
