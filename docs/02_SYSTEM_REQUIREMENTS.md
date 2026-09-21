# SYSTEM REQUIREMENTS & TECH STACK SPECIFICATION

## Project: Luméa Beauty E-Commerce Platform

---

## 1. HARDWARE REQUIREMENTS

### Development Machine (Minimum Specifications)
* **Processor**: Dual-Core 2.0 GHz Intel/AMD or Apple Silicon M1/M2/M3
* **System RAM**: 8 GB RAM
* **Disk Space**: 2 GB free storage space
* **Display**: 1366 x 768 display resolution or higher

---

## 2. SOFTWARE REQUIREMENTS & DEPENDENCIES

### Runtime Environments & Databases
* **Operating System**: Windows 10/11, macOS, or Linux (Ubuntu 20.04+)
* **Node.js**: Version 18.x LTS or higher
* **Package Manager**: npm (v9.x or higher)
* **Database Engine**: MySQL Server 8.0+ (or SQLite 3 for zero-configuration fallback)

---

## 3. DEPENDENCIES & LIBRARIES

### Frontend Dependencies (`frontend/package.json`)
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "lucide-react": "^0.344.0",
    "axios": "^1.6.7"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.1.4",
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1"
  }
}
```

### Backend Dependencies (`backend/package.json`)
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mysql2": "^3.9.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}
```

---

## 4. ENVIRONMENT CONFIGURATION

### Backend Environment Variables (`backend/.env`)
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=lumea_db
NODE_ENV=development
```
