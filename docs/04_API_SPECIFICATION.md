# REST API SPECIFICATION DOCUMENTATION

## Project: Luméa Beauty E-Commerce Platform

Base URL: `http://localhost:5000/api`

---

## 1. PRODUCTS & VARIANTS ENDPOINTS

### 1.1 Get Hero Product Details
* **Endpoint**: `GET /products`
* **Description**: Returns the active hero product along with all associated shade variants and inventory status.
* **Response Status**: `200 OK`
* **Response Body**:
```json
{
  "id": 1,
  "name": "Luméa Glow Tint",
  "description": "A lightweight cream tint that melts into your skin for a natural, buildable flush.",
  "price": 799.00,
  "stock": 240,
  "variants": [
    { "id": 1, "name": "Rose Petal", "color_hex": "#D9828B", "stock": 40 },
    { "id": 2, "name": "Peach Bloom", "color_hex": "#EFA07F", "stock": 35 },
    { "id": 3, "name": "Berry Kiss", "color_hex": "#A94B68", "stock": 30 },
    { "id": 4, "name": "Soft Coral", "color_hex": "#E87970", "stock": 35 },
    { "id": 5, "name": "Nude Glow", "color_hex": "#B97862", "stock": 50 },
    { "id": 6, "name": "Pink Champagne", "color_hex": "#E8A5B5", "stock": 50 }
  ]
}
```

---

## 2. ORDERS ENDPOINTS

### 2.1 Submit New Customer Order
* **Endpoint**: `POST /orders`
* **Description**: Creates a new customer record (if new), logs the order transaction, reduces shade variant stock, and creates order line items.
* **Request Body**:
```json
{
  "customer": {
    "name": "Kichu Sharma",
    "email": "kichu@example.com",
    "phone": "+91 98765 43210",
    "address": "42 Rosewood Avenue",
    "city": "Mumbai",
    "postal_code": "400001"
  },
  "items": [
    {
      "product_id": 1,
      "variant_id": 1,
      "quantity": 2,
      "price": 799.00
    }
  ],
  "payment_method": "UPI / Demo Payment"
}
```
* **Response Status**: `201 Created`
* **Response Body**:
```json
{
  "success": true,
  "message": "Order placed successfully",
  "order": {
    "id": 15,
    "order_code": "#LM1025",
    "total_amount": 1598.00,
    "status": "Pending"
  }
}
```

### 2.2 Get All Orders (Admin View)
* **Endpoint**: `GET /orders`
* **Description**: Fetches order history formatted for the admin dashboard.
* **Response Status**: `200 OK`

### 2.3 Update Order Status (Admin)
* **Endpoint**: `PUT /orders/:id/status`
* **Request Body**:
```json
{
  "status": "Processing"
}
```
* **Response Status**: `200 OK`

---

## 3. ADMIN ANALYTICS ENDPOINTS

### 3.1 Get Dashboard Statistics
* **Endpoint**: `GET /admin/stats`
* **Response Status**: `200 OK`
* **Response Body**:
```json
{
  "total_revenue": 92400.00,
  "total_orders": 128,
  "pending_orders": 12,
  "delivered_orders": 94,
  "top_shade": "Rose Petal"
}
```
