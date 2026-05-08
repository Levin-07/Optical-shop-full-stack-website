Full-Stack Optical E-Commerce & Management System
A comprehensive, feature-rich MERN stack application designed for optical shops to manage eyewear sales, prescriptions, eye test bookings, and administrative tasks.

---

## 📖 Table of Contents
- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Environment Variables](#-environment-variables)
- [Installation & Setup](#-installation--setup)
- [API Reference](#-api-reference)
- [Folder Structure](#-folder-structure)
- [License](#-license)

## 🌟 Project Overview

OptiVision is a robust e-commerce and management solution specifically tailored for optical retailers. It bridges the gap between a standard online store and a clinical service provider by offering features like prescription uploads, eye test scheduling, alongside a traditional eyewear shopping experience (frames, sunglasses, lenses). 

The platform includes a dedicated **Admin Dashboard** for inventory and order management, ensuring a seamless flow from customer browsing to order fulfillment.

## ✨ Key Features

### 👤 Customer Features
- **User Authentication:** Secure registration and login using JWT (JSON Web Tokens).
- **Product Catalog:** Browse a wide variety of optical products including frames and sunglasses.
- **Shopping Cart & Wishlist:** Add products to cart, manage quantities, and save items for later.
- **Checkout Process:** Seamless multi-step checkout and simulated payment processing.
- **Optical Services:** 
  - **Book Eye Tests:** Schedule an appointment for an in-store eye examination.
  - **Upload Prescriptions:** Submit and manage eye prescription details securely.
- **Responsive UI:** Beautiful, custom CSS-driven design that works flawlessly on desktop and mobile.

### 🛡️ Admin Features
- **Admin Dashboard:** A centralized, protected hub for store administrators.
- **Inventory Management:** Full CRUD (Create, Read, Update, Delete) capabilities for the product catalog.
- **Order Tracking:** View, manage, and update customer orders.
- **Request Handling:** Manage customer requests like prescription submissions and eye test appointments.

## 🛠️ Tech Stack

**Frontend:**
- **React.js** (v18) - Component-based UI library
- **React Router** (v7) - For client-side routing
- **Axios** - For making API requests
- **React Icons** - For scalable vector icons
- **Pure CSS** - For custom, premium styling without external heavy frameworks

**Backend:**
- **Node.js** - JavaScript runtime
- **Express.js** (v5) - Fast, unopinionated web framework
- **MongoDB & Mongoose** (v9) - NoSQL database and Object Data Modeling (ODM)
- **JWT (JSON Web Tokens)** - For secure, stateless authentication
- **Bcrypt.js** - For password hashing

## 🏗️ Project Architecture

The application is structured as a Monolith with separated frontend and backend directories for development, but designed to be served together in production.

- **Frontend (Client):** A React Single Page Application (SPA).
- **Backend (API):** An Express REST API that handles data processing, authentication, and database interactions.
- **Production Mode:** The Express server is configured to serve the built React static files, allowing the entire application to be hosted on a single server instance easily (e.g., on Render or Heroku).

## 🔐 Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file inside the `/backend` directory.

`PORT` = 5000 (or your preferred port)
`MONGO_URI` = your_mongodb_connection_string (e.g., `mongodb://localhost:27017/optical_shop` or MongoDB Atlas URI)
`JWT_SECRET` = a_secure_random_string_for_jwt_signing

## 🚀 Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or Atlas account)
- Git

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd "Optical Website 1"
```

### 2. Install Dependencies

You can install all dependencies from the root directory using the custom script:
```bash
npm run build
```
*(This will install backend dependencies, frontend dependencies, and build the frontend.)*

Alternatively, install them manually:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the `backend` directory and add the required variables mentioned above.

### 4. Run the Application

**Development Mode:**
You need to start both the backend and frontend servers.

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm start
```

**Production Mode:**
Ensure you have built the frontend first (`npm run build` from root or `cd frontend && npm run build`).
```bash
# From the root directory
npm start
```
The application will be available at `http://localhost:5000`.

## 🌐 API Reference

Here are some of the core RESTful endpoints available in the backend:

### Authentication (`/api/auth`)
- `POST /register` - Register a new user
- `POST /login` - Authenticate a user and receive a JWT
- `GET /me` - Get current logged-in user profile (Protected)

### Products (`/api/products`)
- `GET /` - Fetch all products
- `GET /:id` - Fetch a single product by ID
- `POST /` - Create a new product (Admin only)
- `PUT /:id` - Update a product (Admin only)
- `DELETE /:id` - Delete a product (Admin only)

### Orders (`/api/orders`)
- `POST /` - Create a new order (Protected)
- `GET /` - Get all orders (Admin only)
- `GET /myorders` - Get logged-in user's orders (Protected)

### Requests (`/api/requests`)
- `POST /` - Submit an eye test or prescription request (Protected)
- `GET /` - View all requests (Admin only)

## 📂 Folder Structure

```text
Optical Website 1/
├── backend/                  # Express API Backend
│   ├── config/               # Database connection and configs
│   ├── middleware/           # Custom Express middlewares (Auth, etc.)
│   ├── models/               # Mongoose schemas (User, Product, Order, Request)
│   ├── routes/               # API route definitions
│   ├── server.js             # Entry point for backend
│   └── package.json          # Backend dependencies
├── frontend/                 # React Application
│   ├── public/               # Static files (index.html, manifest, etc.)
│   ├── src/                  # React source code
│   │   ├── components/       # Reusable UI components (Navbar, Footer)
│   │   ├── pages/            # Page-level components (Home, Products, Auth, Admin)
│   │   ├── App.js            # Main React component & Routing
│   │   ├── index.css         # Global styles
│   │   └── index.js          # React entry point
│   └── package.json          # Frontend dependencies
├── README.md                 # This documentation file
└── package.json              # Root package.json for monolithic scripts
```

## 📄 License
This project is designed for educational and portfolio purposes.
