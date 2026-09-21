const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

let pool = null;
let isUsingFallback = false;

// Seed data for fallback memory mode
let memoryStore = {
  product: {
    id: 1,
    name: 'Luméa Glow Tint',
    description: 'A silky cream tint that melts into your skin for a natural, buildable flush on cheeks and lips.',
    price: 799.00,
    image_url: '/images/lumea_hero_tint.jpg',
    stock: 240
  },
  variants: [
    { id: 1, product_id: 1, name: 'Rose Petal', color_hex: '#D9828B', stock: 40, image_url: '/images/lumea_rose_petal.png' },
    { id: 2, product_id: 1, name: 'Peach Bloom', color_hex: '#EFA07F', stock: 35, image_url: '/images/lumea_peach_bloom.png' },
    { id: 3, product_id: 1, name: 'Berry Kiss', color_hex: '#A94B68', stock: 30, image_url: '/images/lumea_berry_kiss.png' },
    { id: 4, product_id: 1, name: 'Soft Coral', color_hex: '#E87970', stock: 35, image_url: '/images/lumea_soft_coral.png' },
    { id: 5, product_id: 1, name: 'Nude Glow', color_hex: '#B97862', stock: 50, image_url: '/images/lumea_hero_tint.png' },
    { id: 6, product_id: 1, name: 'Pink Champagne', color_hex: '#E8A5B5', stock: 50, image_url: '/images/lumea_hero_tint.png' }
  ],
  customers: [
    { id: 1, name: 'Kichu Sharma', email: 'kichu@example.com', phone: '+91 98765 43210', address: '42 Rosewood Avenue', city: 'Mumbai', postal_code: '400001', created_at: '2026-09-01T10:00:00Z' },
    { id: 2, name: 'Ananya Rao', email: 'ananya@example.com', phone: '+91 98765 12345', address: '18 Marine Drive', city: 'Mumbai', postal_code: '400020', created_at: '2026-09-05T14:30:00Z' },
    { id: 3, name: 'Priya Shah', email: 'priya@example.com', phone: '+91 98123 45678', address: '7 Park Street', city: 'Kolkata', postal_code: '700016', created_at: '2026-09-10T11:15:00Z' },
    { id: 4, name: 'Aarav Patel', email: 'aarav@example.com', phone: '+91 97654 32109', address: '102 MG Road', city: 'Bengaluru', postal_code: '560001', created_at: '2026-09-15T16:45:00Z' }
  ],
  orders: [
    { id: 101, order_code: '#LM1024', customer_id: 1, customer_name: 'Kichu Sharma', shade_name: 'Rose Petal', quantity: 2, total_amount: 1598.00, status: 'Pending', payment_method: 'UPI / Demo Payment', created_at: '2026-09-20T09:12:00Z' },
    { id: 102, order_code: '#LM1023', customer_id: 2, customer_name: 'Ananya Rao', shade_name: 'Berry Kiss', quantity: 1, total_amount: 799.00, status: 'Processing', payment_method: 'Cash on Delivery', created_at: '2026-09-19T14:20:00Z' },
    { id: 103, order_code: '#LM1022', customer_id: 3, customer_name: 'Priya Shah', shade_name: 'Nude Glow', quantity: 2, total_amount: 1598.00, status: 'Shipped', payment_method: 'UPI / Demo Payment', created_at: '2026-09-18T18:05:00Z' },
    { id: 104, order_code: '#LM1021', customer_id: 4, customer_name: 'Aarav Patel', shade_name: 'Peach Bloom', quantity: 1, total_amount: 799.00, status: 'Delivered', payment_method: 'Cash on Delivery', created_at: '2026-09-15T11:30:00Z' }
  ]
};

async function initDB() {
  try {
    const config = {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'lumea_db',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    };
    
    pool = mysql.createPool(config);
    // Test connection
    const conn = await pool.getConnection();
    console.log('Successfully connected to MySQL database: ' + (process.env.DB_NAME || 'lumea_db'));
    conn.release();
    isUsingFallback = false;
  } catch (err) {
    console.log('MySQL server connection not available (' + err.message + '). Operating in Fallback Memory Mode.');
    isUsingFallback = true;
  }
}

// Execute initial check
initDB();

module.exports = {
  getPool: () => pool,
  isFallback: () => isUsingFallback,
  memoryStore
};
