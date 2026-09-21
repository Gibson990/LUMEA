# DATABASE DESIGN & DATA DICTIONARY

## Project: Luméa Beauty E-Commerce Platform

---

## 1. DATABASE SCHEMA OVERVIEW

Database Name: `lumea_db`  
DBMS: MySQL 8.0  
Normalization Level: 3rd Normal Form (3NF)

---

## 2. DATA DICTIONARIES

### 2.1 Table: `products`
Stores core hero product information.

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | `INT` | `PRIMARY KEY, AUTO_INCREMENT` | Unique product identifier |
| `name` | `VARCHAR(150)` | `NOT NULL` | Product name (e.g., Luméa Glow Tint) |
| `description` | `TEXT` | `NULLABLE` | Detailed formula description |
| `price` | `DECIMAL(10,2)` | `NOT NULL` | Retail unit price (in ₹ INR) |
| `image_url` | `VARCHAR(500)` | `NULLABLE` | Hero image path |
| `stock` | `INT` | `DEFAULT 0` | Aggregate inventory across variants |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Record creation timestamp |

### 2.2 Table: `product_variants`
Stores shade variants associated with products.

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | `INT` | `PRIMARY KEY, AUTO_INCREMENT` | Unique variant identifier |
| `product_id` | `INT` | `FOREIGN KEY (products.id)` | Associated product ID |
| `name` | `VARCHAR(100)` | `NOT NULL` | Shade name (e.g., Rose Petal) |
| `color_hex` | `VARCHAR(20)` | `NOT NULL` | Hex color string (e.g., `#D9828B`) |
| `stock` | `INT` | `DEFAULT 0` | Stock available for this shade |

### 2.3 Table: `customers`
Stores customer details collected during checkout.

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | `INT` | `PRIMARY KEY, AUTO_INCREMENT` | Unique customer identifier |
| `name` | `VARCHAR(150)` | `NOT NULL` | Full customer name |
| `email` | `VARCHAR(150)` | `NOT NULL` | Contact email address |
| `phone` | `VARCHAR(30)` | `NULLABLE` | Phone number |
| `address` | `TEXT` | `NULLABLE` | Shipping address |
| `city` | `VARCHAR(100)` | `NULLABLE` | Destination city |
| `postal_code` | `VARCHAR(20)` | `NULLABLE` | Postal code |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | First purchase timestamp |

### 2.4 Table: `orders`
Stores top-level order records.

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | `INT` | `PRIMARY KEY, AUTO_INCREMENT` | Internal order ID |
| `order_code` | `VARCHAR(30)` | `UNIQUE, NOT NULL` | Public Order Reference (`#LM1024`) |
| `customer_id` | `INT` | `FOREIGN KEY (customers.id)` | ID of purchasing customer |
| `total_amount` | `DECIMAL(10,2)` | `NOT NULL` | Total order amount |
| `status` | `ENUM` | `'Pending','Confirmed','Processing','Shipped','Delivered','Cancelled'` | Order status |
| `payment_method`| `VARCHAR(50)` | `NOT NULL` | Payment mode (e.g., COD, UPI Demo) |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Order creation timestamp |

### 2.5 Table: `order_items`
Stores line-item details for each order.

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | `INT` | `PRIMARY KEY, AUTO_INCREMENT` | Item line ID |
| `order_id` | `INT` | `FOREIGN KEY (orders.id)` | Associated order ID |
| `product_id` | `INT` | `FOREIGN KEY (products.id)` | Purchased product ID |
| `variant_id` | `INT` | `FOREIGN KEY (product_variants.id)`| Selected shade variant ID |
| `quantity` | `INT` | `NOT NULL` | Units ordered |
| `price` | `DECIMAL(10,2)` | `NOT NULL` | Unit price at time of purchase |

---

## 3. SQL SCHEMA DDL

```sql
CREATE DATABASE IF NOT EXISTS lumea_db;
USE lumea_db;

CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(500),
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_variants (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    color_hex VARCHAR(20) NOT NULL,
    stock INT DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

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
```
