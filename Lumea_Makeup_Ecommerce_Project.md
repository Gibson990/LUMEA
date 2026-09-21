# Luméa — Single-Product Makeup E-Commerce Project

## 1. Project Overview

**Luméa** is a modern single-product beauty e-commerce website created as a class web-design/software project.

The website focuses on one hero makeup product, **Luméa Glow Tint**, while demonstrating:

- Responsive web design
- Modern UI/UX
- React frontend development
- REST API/backend development
- MySQL relational database
- Product and shade management
- Customer checkout
- Order management
- Simple admin dashboard
- CRUD operations
- Order-status workflow

The project is intentionally limited to a single product so the implementation remains manageable while still demonstrating a complete e-commerce workflow.

---

# 2. Brand Identity

## Brand Name

**Luméa**

### Brand positioning

Luméa is a feminine, modern beauty brand focused on simple, effortless everyday makeup.

### Tagline

> **Glow, your way.**

### Hero product

**Luméa Glow Tint**

A lightweight cream tint designed to provide a natural, buildable flush for cheeks and lips.

---

# 3. Visual Design

The website should feel:

- Feminine
- Modern
- Soft
- Premium
- Clean
- Minimal
- Beauty-focused

Avoid making the design look overly childish or overly saturated.

## Color Palette

| Purpose | Color | Hex |
|---|---|---|
| Background | Soft White/Pink | `#FFF8FA` |
| Primary | Rose Pink | `#D96C8A` |
| Dark Text | Deep Brown | `#2B2024` |
| Secondary | Soft Pink | `#F4D8DF` |
| Accent | Dusty Rose | `#C78A98` |
| White | White | `#FFFFFF` |

## Typography

### Headings

**Playfair Display**

Use for:

- Hero heading
- Product name
- Section headings
- Brand-focused statements

### Body

**Inter**

Use for:

- Product descriptions
- Buttons
- Navigation
- Forms
- Dashboard content

---

# 4. Hero Product

## Product Name

**Luméa Glow Tint**

## Product Type

Cream Blush / Lip Tint

## Finish

Natural Dewy

## Texture

Lightweight Cream

## Net Weight

8g

## Suitable For

All skin types

## Product Characteristics

- Vegan
- Cruelty-free
- Lightweight
- Buildable coverage
- Natural finish
- Suitable for cheeks and lips

## Suggested Price

**₹799**

The price can be changed through the admin dashboard.

---

# 5. Product Shades

The product should have six variants.

| Shade | Description | Color |
|---|---|---|
| Rose Petal | Soft romantic pink | `#D9828B` |
| Peach Bloom | Warm peach | `#EFA07F` |
| Berry Kiss | Rich berry pink | `#A94B68` |
| Soft Coral | Fresh coral | `#E87970` |
| Nude Glow | Warm nude | `#B97862` |
| Pink Champagne | Soft champagne pink | `#E8A5B5` |

Each shade should have:

- Name
- Color hex value
- Stock quantity
- Product association
- Optional product image

The customer should be able to select a shade visually using color circles/swatches.

---

# 6. Customer Website

## Main Navigation

```text
LUMÉA

Shop
About
Shades
Reviews

                         Bag (0)
```

The navigation should be responsive on mobile.

---

# 7. Homepage / Product Page

Because this is a single-product store, the main page is primarily a product landing page.

## Hero Section

Left side:

```text
LUMÉA

Glow, your way.

Luméa Glow Tint

A silky cream tint that melts into your skin
for a natural, buildable flush.

₹799

[ Choose your shade ]

[ Add to Bag ]
```

Right side:

- Large hero product image
- Decorative soft-pink background elements
- Product packaging
- Optional floating shade/color elements

---

# 8. Product Selection

The customer should be able to select:

### Shade

Example:

```text
Choose your shade

○ Rose Petal
○ Peach Bloom
○ Berry Kiss
○ Soft Coral
○ Nude Glow
○ Pink Champagne
```

The selected shade should be visually highlighted.

### Quantity

```text
[-] 1 [+]
```

The quantity should not exceed available stock.

### Add to Bag

When the user clicks:

```text
Add to Bag
```

the selected product, shade, quantity and price should be added to the shopping cart.

---

# 9. Shopping Bag

The bag/cart should display:

```text
Your Bag

Luméa Glow Tint
Shade: Rose Petal

Quantity: 2

Price: ₹799
Subtotal: ₹1,598

[ Proceed to Checkout ]
```

The customer should be able to:

- Increase quantity
- Decrease quantity
- Remove product
- View subtotal
- Proceed to checkout

Because this is a single-product project, a full multi-product cart is not necessary.

---

# 10. Checkout

The checkout page should collect:

## Customer Information

- Full name
- Email
- Phone number
- Address
- City
- Postal code

## Payment Method

For the class project, no real payment gateway is required.

Use:

```text
○ Cash on Delivery
○ UPI / Demo Payment
```

The selected payment method should be stored with the order.

## Order Summary

```text
Luméa Glow Tint

Shade: Rose Petal
Quantity: 2

Subtotal: ₹1,598
Shipping: ₹0
Total: ₹1,598

[ Place Order ]
```

---

# 11. Order Confirmation

After a successful order:

```text
Order Confirmed ♡

Thank you for shopping with Luméa.

Order Number:
#LM1024

Your order has been received
and is currently being processed.

[ Continue Shopping ]
```

The order should be saved in the database before displaying the confirmation.

---

# 12. Order Status Workflow

Orders should have the following statuses:

```text
Pending
   ↓
Confirmed
   ↓
Processing
   ↓
Shipped
   ↓
Delivered
```

An order may also be:

```text
Cancelled
```

The admin can change the status.

---

# 13. Admin Dashboard

The admin dashboard should be a separate protected section.

Example route:

```text
/admin
```

## Sidebar

```text
LUMÉA ADMIN

Dashboard
Orders
Products
Customers
Settings
```

---

# 14. Admin Dashboard Overview

Display summary cards:

```text
Total Orders
128

Total Revenue
₹92,400

Pending Orders
12

Delivered
94
```

Below the summary cards:

## Recent Orders

Example:

```text
#LM1024   Rose Petal    ₹1,598    Pending
#LM1023   Berry Kiss   ₹799      Processing
#LM1022   Nude Glow    ₹1,598    Shipped
```

---

# 15. Admin Orders Page

The orders page should include:

- Order ID
- Customer
- Product
- Shade
- Quantity
- Total
- Payment method
- Order date
- Status
- Actions

Example:

| Order | Customer | Shade | Qty | Total | Status |
|---|---|---|---:|---:|---|
| LM1024 | Kichu Sharma | Rose Petal | 2 | ₹1,598 | Pending |
| LM1023 | Ananya Rao | Berry Kiss | 1 | ₹799 | Processing |
| LM1022 | Priya Shah | Nude Glow | 2 | ₹1,598 | Shipped |

Admin functionality:

- View order
- Search order
- Filter by status
- Update order status
- View customer details

---

# 16. Admin Product Page

The product page should allow the admin to manage:

- Product name
- Description
- Price
- Main image
- Stock
- Product attributes
- Shades
- Shade colors
- Shade stock

Example:

```text
Product

Name:
Luméa Glow Tint

Price:
₹799

Stock:
240

Description:
A lightweight cream tint...

Status:
Active
```

## Shade Management

```text
Rose Petal
Color: #D9828B
Stock: 40

Peach Bloom
Color: #EFA07F
Stock: 35

Berry Kiss
Color: #A94B68
Stock: 30
```

---

# 17. Admin Customers Page

Display:

- Customer name
- Email
- Phone
- Number of orders
- Total spent
- Registration date

Example:

| Customer | Email | Orders | Total Spent |
|---|---|---:|---:|
| Kichu Sharma | kichu@example.com | 4 | ₹3,196 |
| Ananya Rao | ananya@example.com | 2 | ₹1,598 |

---

# 18. Database Design

Use **MySQL**.

The project can use five main tables:

```text
products
    ↓
product_variants

customers
    ↓
orders
    ↓
order_items
```

---

# 19. Products Table

```sql
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10,2),
    image_url VARCHAR(500),
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# 20. Product Variants Table

This table stores the makeup shades.

```sql
CREATE TABLE product_variants (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    name VARCHAR(100),
    color_hex VARCHAR(20),
    stock INT DEFAULT 0,

    FOREIGN KEY (product_id)
        REFERENCES products(id)
);
```

---

# 21. Customers Table

```sql
CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150),
    email VARCHAR(150),
    phone VARCHAR(30),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# 22. Orders Table

```sql
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    total_amount DECIMAL(10,2),
    status VARCHAR(30) DEFAULT 'Pending',
    payment_method VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (customer_id)
        REFERENCES customers(id)
);
```

---

# 23. Order Items Table

```sql
CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    variant_id INT,
    quantity INT,
    price DECIMAL(10,2),

    FOREIGN KEY (order_id)
        REFERENCES orders(id),

    FOREIGN KEY (product_id)
        REFERENCES products(id),

    FOREIGN KEY (variant_id)
        REFERENCES product_variants(id)
);
```

---

# 24. Suggested Database Relationships

```text
CUSTOMERS
   │
   │ 1
   │
   │
   │ many
 ORDERS
   │
   │ 1
   │
   │
   │ many
ORDER_ITEMS
   │
   ├─────────────── PRODUCT
   │
   └─────────────── PRODUCT_VARIANT
```

One customer can have many orders.

One order can have many order items.

One product can have many variants/shades.

---

# 25. React Technology Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Lucide React

## Backend

- Node.js
- Express.js

## Database

- MySQL

## Optional

- Axios for API requests
- dotenv for environment variables
- bcrypt for admin authentication
- JSON Web Token (JWT) for authentication

---

# 26. Suggested React Folder Structure

```text
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProductGallery.jsx
│   ├── ShadeSelector.jsx
│   ├── QuantitySelector.jsx
│   ├── ProductInfo.jsx
│   ├── CartDrawer.jsx
│   └── Button.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Checkout.jsx
│   └── OrderSuccess.jsx
│
├── admin/
│   ├── AdminLayout.jsx
│   ├── Dashboard.jsx
│   ├── Orders.jsx
│   ├── OrderDetails.jsx
│   ├── Products.jsx
│   └── Customers.jsx
│
├── services/
│   └── api.js
│
├── context/
│   └── CartContext.jsx
│
├── assets/
│
├── App.jsx
└── main.jsx
```

---

# 27. Suggested Backend Structure

```text
backend/
│
├── controllers/
│   ├── productController.js
│   ├── orderController.js
│   └── customerController.js
│
├── routes/
│   ├── productRoutes.js
│   ├── orderRoutes.js
│   └── customerRoutes.js
│
├── middleware/
│   └── auth.js
│
├── config/
│   └── database.js
│
├── .env
└── server.js
```

---

# 28. API Endpoints

## Products

```text
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

## Product Variants

```text
GET    /api/products/:id/variants
POST   /api/products/:id/variants
PUT    /api/variants/:id
DELETE /api/variants/:id
```

## Customers

```text
GET    /api/customers
GET    /api/customers/:id
POST   /api/customers
```

## Orders

```text
GET    /api/orders
GET    /api/orders/:id
POST   /api/orders
PUT    /api/orders/:id/status
```

---

# 29. Customer Order Flow

```text
PRODUCT PAGE
     │
     ↓
SELECT SHADE
     │
     ↓
SELECT QUANTITY
     │
     ↓
ADD TO BAG
     │
     ↓
CHECKOUT
     │
     ↓
CUSTOMER DETAILS
     │
     ↓
PAYMENT METHOD
     │
     ↓
PLACE ORDER
     │
     ↓
SAVE TO MYSQL
     │
     ↓
ORDER CONFIRMATION
```

---

# 30. Admin Order Flow

```text
ADMIN LOGIN
     │
     ↓
DASHBOARD
     │
     ↓
ORDERS
     │
     ↓
SELECT ORDER
     │
     ↓
VIEW DETAILS
     │
     ↓
UPDATE STATUS
     │
     ├── Confirmed
     ├── Processing
     ├── Shipped
     ├── Delivered
     └── Cancelled
```

---

# 31. Homepage Sections

The final homepage should contain:

## 1. Navbar

Brand + navigation + shopping bag.

## 2. Hero

Large product image, product name, tagline and CTA.

## 3. Product Details

Price, description, shade selection and quantity.

## 4. Benefits

```text
Vegan
Cruelty Free
Lightweight
Buildable
```

## 5. Shade Collection

Display all six shades.

## 6. How To Use

```text
01 Pick your shade
02 Apply
03 Blend
04 Build your glow
```

## 7. Reviews

Display 3–4 fictional/demo customer reviews.

Example:

> "The perfect everyday tint."

★★★★★

## 8. Newsletter

```text
A little glow in your inbox.

[ Enter your email ] [ Subscribe ]
```

## 9. Footer

```text
LUMÉA

Glow, your way.

Instagram
TikTok
Pinterest

© 2026 Luméa Beauty
```

---

# 32. Product Image Direction

The product photography should be consistent throughout the website.

Recommended style:

- Soft pink background
- Minimal luxury cosmetic packaging
- Studio lighting
- Clean shadows
- Feminine styling
- Premium beauty advertising
- White/rose-gold packaging
- Close-up product shots
- Shade swatches
- Product-in-hand image
- Flat-lay makeup photography

Avoid random images from different brands because they will make the project look inconsistent.

AI-generated product images can be created specifically for the fictional Luméa brand so the packaging, colors and product identity remain consistent.

---

# 33. Additional Website Copy

## Hero

**Glow, your way.**

A silky cream tint that melts into your skin for a natural, buildable flush.

## Product section

**One tint. Endless looks.**

From a soft daytime flush to a bold evening glow, Luméa Glow Tint lets you build the look you want.

## Benefits

**Made to glow.**

Lightweight texture. Buildable color. Effortless application.

## How to use

**Your glow, your routine.**

1. Pick your shade.
2. Tap onto cheeks or lips.
3. Blend with your fingertips.
4. Build until you reach your desired intensity.

---

# 34. Sample Product Data

```sql
INSERT INTO products
(name, description, price, image_url, stock)
VALUES
(
    'Luméa Glow Tint',
    'A lightweight cream tint that melts into the skin for a natural, buildable flush.',
    799.00,
    '/images/lumea-glow-tint.png',
    240
);
```

## Sample Variants

```sql
INSERT INTO product_variants
(product_id, name, color_hex, stock)
VALUES
(1, 'Rose Petal', '#D9828B', 40),
(1, 'Peach Bloom', '#EFA07F', 35),
(1, 'Berry Kiss', '#A94B68', 30),
(1, 'Soft Coral', '#E87970', 35),
(1, 'Nude Glow', '#B97862', 50),
(1, 'Pink Champagne', '#E8A5B5', 50);
```

---

# 35. Demo Data

For the admin dashboard, seed the database with fictional/demo data.

Recommended:

- 10–20 customers
- 20–50 orders
- Different shades
- Different order statuses
- Different order dates
- Different quantities

This makes the admin dashboard look realistic during the presentation.

Do not use real people's personal information.

---

# 36. Admin Dashboard Metrics

The dashboard can calculate:

### Total Orders

```text
COUNT(orders)
```

### Total Revenue

```text
SUM(orders.total_amount)
```

### Pending Orders

```text
COUNT(orders WHERE status = 'Pending')
```

### Delivered Orders

```text
COUNT(orders WHERE status = 'Delivered')
```

### Most Popular Shade

Calculate the shade with the highest total quantity sold.

Example:

```text
Rose Petal
82 units sold
```

---

# 37. Optional Dashboard Chart

A simple chart can show:

```text
Orders by Month

Jan   ███████
Feb   █████████
Mar   ███████████
Apr   █████████████
May   █████████
```

Another useful chart:

```text
Sales by Shade
```

This is optional and should only be added after the core functionality is complete.

---

# 38. Authentication

For a class project, only the admin needs authentication.

Example:

```text
/admin/login
```

Admin enters:

```text
Email
Password
```

After successful authentication:

```text
/admin/dashboard
```

The customer does not need an account.

This keeps the project simple.

---

# 39. Minimum Viable Project

If the project deadline is short, implement these features first:

### Must Have

- Responsive product page
- Product image
- Product details
- Shade selection
- Quantity selection
- Shopping bag
- Checkout
- Order creation
- MySQL database
- Admin dashboard
- Orders page
- Order status update

### Nice to Have

- Admin authentication
- Customer management
- Product editing
- Stock management
- Dashboard charts
- Reviews
- Newsletter
- Animations

---

# 40. Development Phases

## Phase 1 — Planning

- Finalize brand
- Finalize product
- Finalize colors
- Create database schema
- Create wireframes

## Phase 2 — UI

Build:

- Navbar
- Hero
- Product section
- Shade selector
- Benefits
- How-to section
- Reviews
- Footer

## Phase 3 — React Functionality

Implement:

- Product state
- Shade selection
- Quantity
- Cart
- Checkout
- Order confirmation

## Phase 4 — Backend

Implement:

- Express server
- MySQL connection
- Product API
- Order API
- Customer API

## Phase 5 — Admin

Implement:

- Admin login
- Dashboard
- Orders
- Product management
- Customers

## Phase 6 — Testing

Test:

- Product selection
- Shade selection
- Quantity limits
- Cart
- Checkout
- Database insertion
- Order status updates
- Admin pages
- Mobile responsiveness

---

# 41. Suggested Final Routes

## Customer

```text
/
```

Main product page.

```text
/checkout
```

Checkout page.

```text
/order-success/:id
```

Order confirmation.

## Admin

```text
/admin/login
```

Admin login.

```text
/admin/dashboard
```

Dashboard.

```text
/admin/orders
```

Orders.

```text
/admin/orders/:id
```

Order details.

```text
/admin/products
```

Product management.

```text
/admin/customers
```

Customers.

---

# 42. Project Architecture

```text
                    ┌─────────────────────┐
                    │     React Client    │
                    │                     │
                    │ Customer Website    │
                    │ Admin Dashboard     │
                    └──────────┬──────────┘
                               │
                               │ HTTP / REST API
                               ↓
                    ┌─────────────────────┐
                    │   Node + Express    │
                    │                     │
                    │ Products            │
                    │ Orders              │
                    │ Customers           │
                    │ Authentication      │
                    └──────────┬──────────┘
                               │
                               │ SQL
                               ↓
                    ┌─────────────────────┐
                    │       MySQL         │
                    │                     │
                    │ Products            │
                    │ Variants            │
                    │ Customers           │
                    │ Orders              │
                    │ Order Items         │
                    └─────────────────────┘
```

---

# 43. What Makes This a Good Class Project

The project demonstrates several important web-development concepts without becoming unnecessarily large.

### Frontend

- React components
- Responsive design
- State management
- Forms
- Routing
- UI/UX

### Backend

- REST APIs
- Request validation
- CRUD operations
- Authentication

### Database

- Relational database
- Primary keys
- Foreign keys
- One-to-many relationships
- SQL queries

### E-commerce

- Product variants
- Cart
- Checkout
- Orders
- Order statuses
- Inventory

### Admin

- Dashboard
- Data tables
- Filtering
- Management operations

---

# 44. Presentation Description

For the class presentation, Kichu can describe the project as:

> **Luméa is a single-product beauty e-commerce platform designed to demonstrate the development of a modern responsive web application. The system allows customers to browse a makeup product, select a shade, add it to a shopping bag, complete checkout, and place an order. An administrative dashboard allows the store administrator to manage products, customers, inventory and order statuses. The application uses React for the frontend, Node.js and Express for the backend, and MySQL for data persistence.**

---

# 45. Possible Future Improvements

If the project were developed into a real product, it could later include:

- Multiple products
- User accounts
- Real payment gateway
- Product reviews
- Wishlist
- Discount codes
- Email notifications
- Order tracking
- Shipping integration
- Product recommendations
- Advanced analytics
- Mobile application
- Inventory alerts
- Multiple currencies
- Multiple countries

These features are not required for the class version.

---

# 46. Final Project Scope

### Brand

**Luméa**

### Product

**Luméa Glow Tint**

### Product price

**₹799**

### Product variants

**6 shades**

### Frontend

**React + Vite + Tailwind CSS**

### Backend

**Node.js + Express**

### Database

**MySQL**

### Main customer functionality

```text
Browse
→ Select Shade
→ Select Quantity
→ Add to Bag
→ Checkout
→ Place Order
→ Confirmation
```

### Main admin functionality

```text
Login
→ Dashboard
→ View Orders
→ Manage Products
→ Manage Customers
→ Update Order Status
```

### Core database tables

```text
products
product_variants
customers
orders
order_items
```

---

# 47. Recommended Project Name

**Luméa — Beauty E-Commerce Web Application**

Alternative academic title:

**Design and Development of a Single-Product Beauty E-Commerce Platform Using React and MySQL**

---

# 48. Recommended Next Steps

1. Finalize Luméa branding.
2. Generate the product packaging/product images.
3. Create the Figma/UI design.
4. Set up the React project.
5. Build the customer-facing page.
6. Create the MySQL database.
7. Build the Express API.
8. Connect React to the API.
9. Build the admin dashboard.
10. Add demo data.
11. Test the complete order flow.
12. Prepare screenshots and presentation material.
