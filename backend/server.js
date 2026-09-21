const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { getPool, isFallback, memoryStore } = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Pre-seeded authorized accounts for Luméa project
if (!memoryStore.users) {
  memoryStore.users = [
    { id: 1, name: 'Kichu Khoirom', email: 'kichuKhoirom@gmail.com', role: 'admin', created_at: new Date().toISOString() },
    { id: 2, name: 'Pardeep Singh', email: 'pardeepsign@gmail.com', role: 'subadmin', created_at: new Date().toISOString() },
    { id: 3, name: 'James', email: 'james@gmail.com', role: 'customer', created_at: new Date().toISOString() }
  ];
}

if (!memoryStore.tickets) {
  memoryStore.tickets = [
    { id: 1, ticket_code: '#TCK-101', customer_email: 'james@gmail.com', order_code: '#LM1022', subject: 'Shade Exchange Request', message: 'Hello! Can I exchange my Nude Glow tint for Rose Petal?', status: 'Open', created_at: new Date(Date.now() - 86400000).toISOString() },
    { id: 2, ticket_code: '#TCK-102', customer_email: 'pardeepsign@gmail.com', order_code: '#LM1021', subject: 'Delivery Confirmation', message: 'Received my Peach Bloom tint today, love it!', status: 'Resolved', created_at: new Date(Date.now() - 172800000).toISOString() }
  ];
}

// Active token session map
const activeSessions = new Map();

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const inputEmail = (email || '').trim().toLowerCase();

  // Find authorized account
  let existingUser = memoryStore.users.find(u => u.email.toLowerCase() === inputEmail);

  if (!existingUser) {
    let role = 'customer';
    if (inputEmail.includes('admin')) {
      role = inputEmail.includes('subadmin') ? 'subadmin' : 'admin';
    }
    existingUser = {
      id: memoryStore.users.length + 1,
      name: inputEmail ? inputEmail.split('@')[0] : 'Customer User',
      email: email || 'james@gmail.com',
      role: role
    };
    memoryStore.users.push(existingUser);
  }

  const token = 'lumea_token_' + existingUser.id + '_' + Date.now();
  activeSessions.set(token, existingUser);

  res.json({ success: true, token, user: existingUser });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email } = req.body;
  const newUser = {
    id: memoryStore.users.length + 1,
    name: name || 'Customer',
    email: email,
    role: 'customer',
    created_at: new Date().toISOString()
  };
  memoryStore.users.push(newUser);
  const token = 'lumea_token_' + newUser.id + '_' + Date.now();
  activeSessions.set(token, newUser);
  res.json({ success: true, token, user: newUser });
});

app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.replace('Bearer ', '') : null;
  const sessionUser = activeSessions.get(token);

  if (sessionUser) {
    return res.json({ success: true, user: sessionUser });
  }

  // Fallback to token ID parsing if applicable
  if (token && token.startsWith('lumea_token_')) {
    const parts = token.split('_');
    const userId = parseInt(parts[2]);
    const found = memoryStore.users.find(u => u.id === userId);
    if (found) return res.json({ success: true, user: found });
  }

  res.json({ success: true, user: memoryStore.users[2] }); // Default customer James
});

app.get('/api/users', (req, res) => {
  res.json(memoryStore.users);
});

app.put('/api/users/:id/role', (req, res) => {
  const userId = parseInt(req.params.id);
  const { role } = req.body;
  const user = memoryStore.users.find(u => u.id === userId);
  if (user) {
    user.role = role;
    return res.json({ success: true, user });
  }
  res.status(404).json({ message: 'User not found' });
});

app.post('/api/users', (req, res) => {
  const { name, email, role } = req.body;
  const newUser = {
    id: memoryStore.users.length + 1,
    name,
    email,
    role: role || 'customer',
    created_at: new Date().toISOString()
  };
  memoryStore.users.push(newUser);
  res.json({ success: true, user: newUser });
});

app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  memoryStore.users = memoryStore.users.filter(u => u.id !== userId);
  res.json({ success: true });
});

// ----------------------------------------------------
// 2. SUPPORT TICKETS ENDPOINTS
// ----------------------------------------------------

app.get('/api/tickets', (req, res) => {
  res.json(memoryStore.tickets);
});

app.post('/api/tickets', (req, res) => {
  const { customer_email, order_code, subject, message } = req.body;
  const newTicket = {
    id: memoryStore.tickets.length + 1,
    ticket_code: '#TCK-' + Math.floor(100 + Math.random() * 900),
    customer_email,
    order_code,
    subject,
    message,
    status: 'Open',
    created_at: new Date().toISOString()
  };
  memoryStore.tickets.unshift(newTicket);
  res.json({ success: true, ticket: newTicket });
});

app.put('/api/tickets/:id/status', (req, res) => {
  const ticketId = parseInt(req.params.id);
  const { status } = req.body;
  const ticket = memoryStore.tickets.find(t => t.id === ticketId);
  if (ticket) {
    ticket.status = status;
    return res.json({ success: true, ticket });
  }
  res.status(404).json({ message: 'Ticket not found' });
});

// ----------------------------------------------------
// 3. PRODUCTS & VARIANTS ENDPOINTS
// ----------------------------------------------------

app.get('/api/products', async (req, res) => {
  try {
    if (isFallback()) {
      return res.json({
        ...memoryStore.product,
        variants: memoryStore.variants
      });
    }

    const pool = getPool();
    const [productRows] = await pool.query('SELECT * FROM products LIMIT 1');
    if (productRows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const product = productRows[0];
    const [variantRows] = await pool.query('SELECT * FROM product_variants WHERE product_id = ?', [product.id]);
    
    res.json({
      ...product,
      price: parseFloat(product.price),
      variants: variantRows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  const { price, description, name } = req.body;
  if (isFallback()) {
    if (price !== undefined) memoryStore.product.price = parseFloat(price);
    if (description) memoryStore.product.description = description;
    if (name) memoryStore.product.name = name;
    return res.json({ success: true, product: memoryStore.product });
  }
  res.json({ success: true });
});

app.put('/api/variants/:id', async (req, res) => {
  const { stock, name, color_hex } = req.body;
  const variantId = parseInt(req.params.id);
  if (isFallback()) {
    const variant = memoryStore.variants.find(v => v.id === variantId);
    if (!variant) return res.status(404).json({ message: 'Variant not found' });
    if (stock !== undefined) variant.stock = parseInt(stock);
    if (name) variant.name = name;
    if (color_hex) variant.color_hex = color_hex;
    return res.json({ success: true, variant });
  }
  res.json({ success: true });
});

// ----------------------------------------------------
// 4. ORDERS ENDPOINTS
// ----------------------------------------------------

app.get('/api/orders', async (req, res) => {
  if (isFallback()) {
    return res.json(memoryStore.orders);
  }
  const pool = getPool();
  const query = `
    SELECT 
      o.id,
      o.order_code,
      c.name as customer_name,
      c.email as customer_email,
      c.phone as customer_phone,
      pv.name as shade_name,
      oi.quantity,
      o.total_amount,
      o.status,
      o.payment_method,
      o.created_at
    FROM orders o
    JOIN customers c ON o.customer_id = c.id
    JOIN order_items oi ON o.id = oi.order_id
    JOIN product_variants pv ON oi.variant_id = pv.id
    ORDER BY o.created_at DESC
  `;
  const [rows] = await pool.query(query);
  res.json(rows);
});

app.post('/api/orders', async (req, res) => {
  const { customer, items, payment_method } = req.body;
  const orderCode = '#LM' + Math.floor(1000 + Math.random() * 9000);
  const item = items[0];

  if (isFallback()) {
    const newCustId = memoryStore.customers.length + 1;
    const newCust = {
      id: newCustId,
      name: customer.name,
      email: customer.email,
      phone: customer.phone || '',
      address: customer.address || '',
      city: customer.city || '',
      postal_code: customer.postal_code || '',
      created_at: new Date().toISOString()
    };
    memoryStore.customers.push(newCust);

    const variant = memoryStore.variants.find(v => v.id === parseInt(item.variant_id)) || memoryStore.variants[0];
    const totalAmount = parseFloat((item.price * item.quantity).toFixed(2));

    if (variant.stock >= item.quantity) {
      variant.stock -= item.quantity;
    }

    const newOrder = {
      id: memoryStore.orders.length + 101,
      order_code: orderCode,
      customer_id: newCustId,
      customer_name: customer.name,
      shade_name: variant.name,
      quantity: item.quantity,
      total_amount: totalAmount,
      status: 'Pending',
      payment_method: payment_method || 'UPI / Demo Payment',
      created_at: new Date().toISOString()
    };
    memoryStore.orders.unshift(newOrder);

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order: newOrder
    });
  }

  res.json({ success: true });
});

app.put('/api/orders/:id/status', async (req, res) => {
  const { status } = req.body;
  const orderId = parseInt(req.params.id);

  if (isFallback()) {
    const order = memoryStore.orders.find(o => o.id === orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    
    // Restock variant if order is cancelled
    if (status === 'Cancelled' && order.status !== 'Cancelled') {
      const variant = memoryStore.variants.find(v => v.name === order.shade_name);
      if (variant) variant.stock += order.quantity;
    }

    order.status = status;
    return res.json({ success: true, order });
  }

  const pool = getPool();
  await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, orderId]);
  res.json({ success: true });
});

// ----------------------------------------------------
// 5. CUSTOMERS & DASHBOARD STATS
// ----------------------------------------------------

app.get('/api/customers', async (req, res) => {
  if (isFallback()) {
    const result = memoryStore.customers.map(cust => {
      const custOrders = memoryStore.orders.filter(o => o.customer_id === cust.id);
      const totalSpent = custOrders.reduce((sum, o) => sum + o.total_amount, 0);
      return {
        ...cust,
        order_count: custOrders.length,
        total_spent: totalSpent
      };
    });
    return res.json(result);
  }
  res.json([]);
});

app.get('/api/admin/stats', async (req, res) => {
  const orders = memoryStore.orders;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total_amount, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;

  res.json({
    total_revenue: totalRevenue,
    total_orders: totalOrders,
    pending_orders: pendingOrders,
    delivered_orders: deliveredOrders,
    top_shade: 'Rose Petal'
  });
});

app.listen(PORT, () => {
  console.log(`Luméa REST API Server running on port ${PORT}`);
});
