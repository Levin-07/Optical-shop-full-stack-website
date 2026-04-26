# Optical Shop Full-Stack Website Documentation

This document provides a comprehensive overview of the architecture, features, and technical stack of the Optical Shop Full-Stack Web Application.

## 1. Tech Stack Overview

This application is built using the **MERN** stack:
*   **MongoDB:** NoSQL database for flexible data storage.
*   **Express.js:** Web application framework for Node.js, used to build the backend API.
*   **React.js:** Frontend library for building the user interface.
*   **Node.js:** JavaScript runtime environment for the backend server.

## 2. System Architecture

The project is structured into two main directories: `frontend` and `backend`. In a production environment, the Express server acts as a single unified service that serves both the API endpoints and the static build files of the React frontend.

### 2.1 Backend Architecture

The backend is responsible for data persistence, authentication, and handling business logic via RESTful APIs.

*   **Entry Point:** `server.js` initializes the Express application, configures CORS, connects to MongoDB, sets up the API routes, and serves the static frontend files in production.
*   **Configuration:** `config/db.js` handles the MongoDB connection using Mongoose. Environment variables are managed using `dotenv` (stored in `.env`).
*   **Models (Mongoose Schemas):**
    *   **User (`models/User.js`):** Stores user credentials (name, email, hashed password) and role (`user` or `admin`).
    *   **Product (`models/Product.js`):** Defines eyewear items (name, category like frame/sunglasses, brand, price, description, image URL).
    *   **Order (`models/Order.js`):** Tracks user purchases, linking to the User and Product models, along with status and total amount.
    *   **Request (`models/Request.js`):** Handles user inquiries or specific product orders (linked to User and Product, tracking type and status).
*   **Routes & Controllers:**
    *   `/api/auth`: Handles user registration and login (`routes/auth.routes.js`). Employs JWT (JSON Web Tokens) for secure authentication and `bcryptjs` for password hashing.
    *   `/api/products`: CRUD operations for eyewear products (`routes/product.routes.js`).
    *   `/api/orders`: Order placement and management (`routes/order.routes.js`).
    *   `/api/requests`: Submission and tracking of customer requests (`routes/request.routes.js`).
*   **Middleware:** Custom middleware (like authentication verification) ensures protected routes are only accessible by authorized users or admins.

### 2.2 Frontend Architecture

The frontend is a Single Page Application (SPA) built with React and styled using pure CSS for a tailored, premium aesthetic.

*   **Entry Point:** `src/index.js` renders the root React component.
*   **Routing:** `src/App.js` uses `react-router-dom` to manage navigation between different pages without reloading the browser.
*   **Core Components (`src/components/`):**
    *   `Navbar.js`: Navigation menu present across the app, providing access to links and managing user session state (e.g., showing Cart/Logout if logged in).
    *   `Footer.js`: Contains informational links, contact details, and social icons.
    *   `ScrollToTop.js`: Utility component ensuring the window scrolls to the top on route changes.
*   **Pages (`src/pages/`):**
    *   `Home.js`: Landing page featuring promotional banners, featured products, and an introduction to the shop.
    *   `Products.js`: Product catalog displaying frames and sunglasses, allowing users to browse offerings.
    *   `Auth.js`: Combined Login and Registration interface.
    *   `Cart.js` & `Wishlist.js`: E-commerce features for managing selected products before purchase.
    *   `Payment.js`: Checkout flow to finalize orders and process simulated payments.
    *   `EyeTest.js`: Interface for booking an eye examination appointment.
    *   `Prescription.js`: Allows users to upload or manage their eye prescription details.
    *   `About.js` & `Contact.js`: Informational pages about the company and a contact form.
    *   `Admin.js`: Protected dashboard for store administrators to manage products, view orders, and handle customer requests.

## 3. Key Features

*   **User Authentication:** Secure signup and login using JWT. Different access levels for standard users and administrators.
*   **E-Commerce Flow:** Users can browse products, add them to a wishlist or cart, and proceed through a multi-step checkout and payment process.
*   **Optical Services:** Dedicated pages for submitting prescriptions and scheduling eye tests, tailored to an optical shop's needs.
*   **Admin Dashboard:** Comprehensive backend management interface for staff to control the catalog and view transactions.
*   **Responsive Design:** Utilizing custom CSS (`.css` files per component/page) to ensure a dynamic, visually appealing experience across devices.
*   **Production Ready:** Configured to serve the frontend build directly from the Express backend, simplifying deployment on platforms like Render.

## 4. Development Setup

### Prerequisites
*   Node.js installed
*   MongoDB instance (local or Atlas)

### Backend Setup
1.  Navigate to `/backend`
2.  Install dependencies: `npm install`
3.  Create a `.env` file with `PORT`, `MONGO_URI`, and `JWT_SECRET`
4.  Start the development server: `npm run dev` (runs on `nodemon`)

### Frontend Setup
1.  Navigate to `/frontend`
2.  Install dependencies: `npm install`
3.  Start the React development server: `npm start`

### Production Build
1.  In `/frontend`, run `npm run build` to generate the static files.
2.  In `/backend`, run `npm start`. The Express server will handle API requests and serve the React build on the defined port.
