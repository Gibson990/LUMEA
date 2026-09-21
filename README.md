# Luméa — Single-Product Beauty E-Commerce Platform

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/Database-MySQL%208.0-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)

**Luméa** is a full-stack, single-product luxury e-commerce web application dedicated to minimalist beauty. Built around its flagship product — the **Luméa Glow Tint** (a multifunctional cream blush & lip tint available in 6 shades) — the platform provides a complete end-to-end shopping experience, robust customer self-service tools, and an administrative control panel with Role-Based Access Control (RBAC).

---

## 🌟 What the Platform Does

### 🛍️ Customer Storefront
- **Dynamic Single-Product Showcase**: Highlighting the formula, benefits (100% vegan, cruelty-free, botanical wax), shade swatches, customer reviews (4.9★), and technical specifications.
- **Interactive Shade Selector & Live Image Switcher**: Selecting any of the 6 color shades (*Rose Petal*, *Peach Bloom*, *Berry Kiss*, *Soft Coral*, *Nude Glow*, *Pink Champagne*) automatically switches the product photography, background glow accent, and stock counter.
- **Persistent Shopping Bag Drawer**: Slide-over cart drawer with quantity adjustments, subtotal calculation, free shipping indicators, and instant checkout link.
- **Streamlined Checkout Workflow**: Clean address collection form, order summary breakdown, and payment selection (Cash on Delivery enabled, UPI online payment maintenance notice).
- **Self-Service Order Tracking**: Live 5-step visual fulfillment stepper (`Pending` ➔ `Confirmed` ➔ `Processing` ➔ `Shipped` ➔ `Delivered`). Customers can also cancel eligible orders in pending states with automated inventory restoration.
- **Customer Support Desk**: Interactive ticketing system where users can submit inquiries with optional order codes and receive instant tracking references (e.g. `#TCK-101`).

### 🛡️ Administrative Portal & RBAC
- **Strict Role-Based Access Control (RBAC)**: Automatic authorization guarding. Customers visiting `/admin` are greeted with a polite access-restricted barrier and can return or switch accounts.
- **Business KPI Overview**: Real-time sales metrics including Total Revenue, Total Orders, Pending Orders, Open Support Tickets, and Top Selling Shade.
- **Order Lifecycle Management**: Search and filter orders by status, customer name, or shade; update order statuses directly in real time.
- **User Role Management**: Super Admins can promote users to Sub-Admin, demote roles, add new authorized staff, or remove user accounts.
- **Customer Support Resolution**: Filter, view, and update customer support inquiries (`Open` ➔ `In Progress` ➔ `Resolved`).
- **Inventory & Variant Inspection**: Live tracking of unit stock across all 6 shade variants.
- **Registered Customers Directory**: Customer order counts, contact details, and cumulative spend metrics.

### ⚡ Resilience & UI/UX Excellence
- **Dual-Mode Backend Resilience**: Connects to MySQL when available; automatically switches to an in-memory mock store with seed data if MySQL is offline or unconfigured.
- **Full Error Handling**: Dedicated, polished custom error pages:
  - `404 Not Found` (catch-all route with gradient numeral and recovery navigation)
  - `503 Service Unavailable` (`/503` with retry mechanism)
  - `500 Error Boundary` (root-level React error boundary preventing white-screen crashes)
- **Responsive & Mobile-First**: Mobile navigation slide-out drawer, touch-optimized swatches, hardware-accelerated transforms, zero image drag issues, and custom vector favicon.

---

## 👥 Demo User Credentials

For demonstration and testing, the platform includes pre-configured sample accounts:

| Role | Email | Password | Access Rights |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `kichuKhoirom@gmail.com` | `lumea@123` | Full admin dashboard, user role editing, orders, support, analytics |
| **Sub-Admin** | `pardeepsign@gmail.com` | `lumea@123` | Orders, support desk, inventory overview |
| **Customer** | `james@gmail.com` | `lumea@123` | Storefront, bag, checkout, order tracking, support desk |

> *Tip: You can also register any new account using the Sign In / Register modal in the top navigation.*

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 18, Vite | Single-page application architecture |
| **Styling** | Tailwind CSS, Lucide Icons | Responsive glassmorphic beauty aesthetic |
| **Routing** | React Router v6 | Client-side navigation & route guarding |
| **Backend** | Node.js, Express.js | REST API server |
| **Database** | MySQL 8.0 / mysql2 | Relational schema with in-memory fallback |
| **Fonts** | Playfair Display & Inter | Luxury serif headers & modern sans body |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)
- **MySQL Server** (Optional — backend will run in memory fallback mode if MySQL is not running)

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/Gibson990/LUMEA.git
cd LUMEA
```

---

### Step 2: Set Up the Database (MySQL)

1. Open your MySQL client (MySQL Workbench, phpMyAdmin, or terminal CLI).
2. Execute the initialization script located at `backend/config/schema.sql`:
   ```bash
   mysql -u root -p < backend/config/schema.sql
   ```
   *This creates the `lumea_db` database, 5 relational tables (`products`, `product_variants`, `customers`, `orders`, `order_items`), and populates all initial shades and sample orders.*

3. Configure your backend environment:
   ```bash
   cd backend
   cp .env.example .env
   ```
   Adjust `DB_HOST`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` in `backend/.env` if your local MySQL settings differ from default `root` with no password.

> **Note:** If you don't have MySQL installed, you can skip this step! The backend automatically detects when MySQL is unreachable and activates an in-memory database with identical seed data.

---

### Step 3: Run the Backend API Server

From the `backend` folder:
```bash
# Install backend dependencies
npm install

# Start the Express server (runs on http://localhost:5000)
npm start
```

---

### Step 4: Run the Frontend Application

Open a second terminal in the project root:
```bash
# Install frontend dependencies
npm install

# Start the Vite development server (runs on http://localhost:3000)
npm run dev
```

Visit **[http://localhost:3000](http://localhost:3000)** in your browser!

---

## 📁 Project Directory Structure

```text
LUMÉA/
├── backend/
│   ├── config/
│   │   ├── db.js             # MySQL pool connection + In-Memory fallback store
│   │   └── schema.sql        # MySQL 3NF database DDL & seed data
│   ├── .env.example          # Sample environment variables
│   ├── package.json          # Express API server dependencies
│   └── server.js             # REST API routes (auth, products, orders, support, users)
├── docs/                     # Academic Project Report Documentation
│   ├── 01_PROJECT_REPORT.md
│   ├── 02_SYSTEM_REQUIREMENTS.md
│   ├── 03_DATABASE_DESIGN.md
│   ├── 04_API_SPECIFICATION.md
│   └── 05_UI_UX_DESIGN_SPEC.md
├── public/
│   ├── images/               # High-resolution shade and product photography
│   └── favicon.svg           # Custom vector monogram favicon
├── src/
│   ├── components/           # UI Components (Hero, ShadeSelector, CartDrawer, etc.)
│   ├── context/              # React Contexts (AuthContext, CartContext, NotificationContext)
│   ├── pages/                # Route pages (Home, Checkout, TrackOrder, Support, Admin, 404, 503)
│   ├── services/             # Axios API client & fallback handlers
│   ├── App.jsx               # Route definitions & global providers
│   ├── index.css             # Tailwind base styles, animations, GPU optimization
│   └── main.jsx              # Application bootstrap with root ErrorBoundary
├── index.html                # Entry HTML with Google Fonts & SEO OpenGraph tags
├── package.json              # Frontend dependencies and Vite build scripts
├── tailwind.config.js        # Design tokens, palette (#FFF8FA, #D96C8A, #2B2024)
└── vite.config.js            # Vite configuration (port 3000)
```

---

## 🧪 Available Scripts

### Frontend (Root)
- `npm run dev` — Start the local Vite development server at `http://localhost:3000`
- `npm run build` — Compile and bundle production assets into `dist/`
- `npm run preview` — Locally preview the production build

### Backend (`/backend`)
- `npm start` — Start the REST API server on `http://localhost:5000`
- `npm run dev` — Start with nodemon (if installed)

---

## 📄 License
This project is developed for educational and portfolio demonstration purposes. All rights reserved.
