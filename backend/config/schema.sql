-- Luméa Database Initialization Schema
CREATE DATABASE IF NOT EXISTS lumea_db;
USE lumea_db;

-- 1. Products Table
CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(500),
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Product Variants (Shades) Table
CREATE TABLE IF NOT EXISTS product_variants (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    color_hex VARCHAR(20) NOT NULL,
    stock INT DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 3. Customers Table
CREATE TABLE IF NOT EXISTS customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(30),
    address TEXT,
    city VARCHAR(100),
    postal_code VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_code VARCHAR(30) UNIQUE NOT NULL,
    customer_id INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Pending',
    payment_method VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- 5. Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    variant_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (variant_id) REFERENCES product_variants(id)
);

-- Seed Initial Product Data
INSERT INTO products (id, name, description, price, image_url, stock)
VALUES (
    1,
    'Luméa Glow Tint',
    'A silky cream tint that melts into your skin for a natural, buildable flush on cheeks and lips.',
    799.00,
    '/images/lumea_glow_tint_hero.png',
    240
) ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Seed Initial Product Shade Variants
INSERT INTO product_variants (id, product_id, name, color_hex, stock) VALUES
(1, 1, 'Rose Petal', '#D9828B', 40),
(2, 1, 'Peach Bloom', '#EFA07F', 35),
(3, 1, 'Berry Kiss', '#A94B68', 30),
(4, 1, 'Soft Coral', '#E87970', 35),
(5, 1, 'Nude Glow', '#B97862', 50),
(6, 1, 'Pink Champagne', '#E8A5B5', 50)
ON DUPLICATE KEY UPDATE name=VALUES(name);
