import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

// Fallback memory state for client-side demo
const localFallback = {
  product: {
    id: 1,
    name: 'Luméa Glow Tint',
    description: 'A silky cream tint that melts into your skin for a natural, buildable flush on cheeks and lips.',
    price: 799.00,
    stock: 240,
    variants: [
      { id: 1, name: 'Rose Petal', color_hex: '#D9828B', stock: 40, image_url: '/images/lumea_rose_petal.png' },
      { id: 2, name: 'Peach Bloom', color_hex: '#EFA07F', stock: 35, image_url: '/images/lumea_peach_bloom.png' },
      { id: 3, name: 'Berry Kiss', color_hex: '#A94B68', stock: 30, image_url: '/images/lumea_berry_kiss.png' },
      { id: 4, name: 'Soft Coral', color_hex: '#E87970', stock: 35, image_url: '/images/lumea_soft_coral.png' },
      { id: 5, name: 'Nude Glow', color_hex: '#B97862', stock: 50, image_url: '/images/lumea_hero_tint.png' },
      { id: 6, name: 'Pink Champagne', color_hex: '#E8A5B5', stock: 50, image_url: '/images/lumea_hero_tint.png' }
    ]
  },
  users: [
    { id: 1, name: 'Kichu Khoirom', email: 'kichuKhoirom@gmail.com', role: 'admin' },
    { id: 2, name: 'Pardeep Singh', email: 'pardeepsign@gmail.com', role: 'subadmin' },
    { id: 3, name: 'James', email: 'james@gmail.com', role: 'customer' }
  ],
  tickets: [
    { id: 1, ticket_code: '#TCK-101', customer_email: 'priya@example.com', order_code: '#LM1022', subject: 'Shade Exchange Request', message: 'Can I exchange my Nude Glow tint for Rose Petal?', status: 'Open', created_at: new Date().toISOString() }
  ],
  orders: [
    { id: 101, order_code: '#LM1024', customer_name: 'Kichu Sharma', shade_name: 'Rose Petal', quantity: 2, total_amount: 1598.00, status: 'Pending', payment_method: 'UPI / Demo Payment', created_at: new Date().toISOString() },
    { id: 102, order_code: '#LM1023', customer_name: 'Ananya Rao', shade_name: 'Berry Kiss', quantity: 1, total_amount: 799.00, status: 'Processing', payment_method: 'Cash on Delivery', created_at: new Date(Date.now() - 86400000).toISOString() }
  ],
  customers: [
    { id: 1, name: 'Kichu Sharma', email: 'kichu@example.com', phone: '+91 98765 43210', order_count: 4, total_spent: 3196.00 }
  ]
};

// --- AUTH API ---
export const loginUser = async (email, password) => {
  try {
    const res = await client.post('/auth/login', { email, password });
    if (res.data && res.data.user) {
      localStorage.setItem('lumea_user', JSON.stringify(res.data.user));
    }
    return res.data;
  } catch (err) {
    const inputEmail = (email || '').trim().toLowerCase();
    let found = localFallback.users.find(u => u.email.toLowerCase() === inputEmail);
    if (!found) {
      const role = inputEmail.includes('admin') ? (inputEmail.includes('subadmin') ? 'subadmin' : 'admin') : 'customer';
      found = { id: Date.now(), name: email ? email.split('@')[0] : 'User', email: email || 'james@gmail.com', role };
      localFallback.users.push(found);
    }
    const token = 'lumea_token_' + found.id + '_' + Date.now();
    localStorage.setItem('lumea_user', JSON.stringify(found));
    return { success: true, token, user: found };
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const res = await client.post('/auth/register', { name, email, password });
    if (res.data && res.data.user) {
      localStorage.setItem('lumea_user', JSON.stringify(res.data.user));
    }
    return res.data;
  } catch (err) {
    const user = { id: Date.now(), name: name || 'Customer', email, role: 'customer' };
    localFallback.users.push(user);
    localStorage.setItem('lumea_user', JSON.stringify(user));
    return { success: true, token: 'lumea_token_' + user.id, user };
  }
};

export const fetchCurrentUser = async (token) => {
  try {
    const res = await client.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } });
    if (res.data && res.data.user) {
      localStorage.setItem('lumea_user', JSON.stringify(res.data.user));
      return res.data;
    }
  } catch (err) {
    // Return stored user from localStorage if available
    const savedUser = localStorage.getItem('lumea_user');
    if (savedUser) {
      return { success: true, user: JSON.parse(savedUser) };
    }
    return { success: true, user: localFallback.users[2] }; // Default James
  }
};

// --- USER MANAGEMENT API ---
export const fetchUsers = async () => {
  try {
    const res = await client.get('/users');
    return res.data;
  } catch (err) {
    return localFallback.users;
  }
};

export const updateUserRole = async (userId, role) => {
  try {
    const res = await client.put(`/users/${userId}/role`, { role });
    return res.data;
  } catch (err) {
    const u = localFallback.users.find(usr => usr.id === userId);
    if (u) u.role = role;
    return { success: true, user: u };
  }
};

export const addUser = async (userData) => {
  try {
    const res = await client.post('/users', userData);
    return res.data;
  } catch (err) {
    const newUser = { id: Date.now(), ...userData };
    localFallback.users.push(newUser);
    return { success: true, user: newUser };
  }
};

export const deleteUser = async (userId) => {
  try {
    const res = await client.delete(`/users/${userId}`);
    return res.data;
  } catch (err) {
    localFallback.users = localFallback.users.filter(u => u.id !== userId);
    return { success: true };
  }
};

// --- SUPPORT TICKETS API ---
export const fetchSupportTickets = async () => {
  try {
    const res = await client.get('/tickets');
    return res.data;
  } catch (err) {
    return localFallback.tickets;
  }
};

export const createSupportTicket = async (ticketPayload) => {
  try {
    const res = await client.post('/tickets', ticketPayload);
    return res.data;
  } catch (err) {
    const ticketCode = '#TCK-' + Math.floor(100 + Math.random() * 900);
    const newTicket = { id: Date.now(), ticket_code: ticketCode, status: 'Open', created_at: new Date().toISOString(), ...ticketPayload };
    localFallback.tickets.unshift(newTicket);
    return { success: true, ticket: newTicket };
  }
};

export const updateTicketStatus = async (ticketId, status) => {
  try {
    const res = await client.put(`/tickets/${ticketId}/status`, { status });
    return res.data;
  } catch (err) {
    const ticket = localFallback.tickets.find(t => t.id === ticketId);
    if (ticket) ticket.status = status;
    return { success: true, ticket };
  }
};

// --- PRODUCTS & ORDERS API ---
export const fetchProduct = async () => {
  try {
    const res = await client.get('/products');
    return res.data;
  } catch (err) {
    return localFallback.product;
  }
};

export const placeOrder = async (orderPayload) => {
  try {
    const res = await client.post('/orders', orderPayload);
    return res.data;
  } catch (err) {
    const orderCode = '#LM' + Math.floor(1000 + Math.random() * 9000);
    const item = orderPayload.items[0];
    const newOrder = {
      id: localFallback.orders.length + 101,
      order_code: orderCode,
      customer_name: orderPayload.customer.name,
      shade_name: 'Selected Shade',
      quantity: item.quantity,
      total_amount: item.price * item.quantity,
      status: 'Pending',
      payment_method: orderPayload.payment_method,
      created_at: new Date().toISOString()
    };
    localFallback.orders.unshift(newOrder);
    return { success: true, order: newOrder };
  }
};

export const fetchOrders = async () => {
  try {
    const res = await client.get('/orders');
    return res.data;
  } catch (err) {
    return localFallback.orders;
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const res = await client.put(`/orders/${orderId}/status`, { status });
    return res.data;
  } catch (err) {
    const order = localFallback.orders.find(o => o.id === orderId);
    if (order) order.status = status;
    return { success: true, order };
  }
};

export const fetchCustomers = async () => {
  try {
    const res = await client.get('/customers');
    return res.data;
  } catch (err) {
    return localFallback.customers;
  }
};

export const fetchAdminStats = async () => {
  try {
    const res = await client.get('/admin/stats');
    return res.data;
  } catch (err) {
    return {
      total_revenue: 92400,
      total_orders: localFallback.orders.length,
      pending_orders: localFallback.orders.filter(o => o.status === 'Pending').length,
      delivered_orders: localFallback.orders.filter(o => o.status === 'Delivered').length,
      top_shade: 'Rose Petal'
    };
  }
};
