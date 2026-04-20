const express = require("express");
const protect = require("../middleware/auth.middleware");
const Order = require("../models/Order");

const router = express.Router();

// Create new order
router.post("/", protect, async (req, res) => {
  try {
    const { productId, products } = req.body;
    let orderProducts = [];
    
    if (productId) {
        orderProducts.push(productId);
    } 
    if (products && Array.isArray(products) && products.length > 0) {
        orderProducts = [...products];
    }

    if (orderProducts.length === 0) {
        return res.status(400).json({ message: "No products provided for order" });
    }

    const order = new Order({
      user: req.user.id,
      products: orderProducts,
    });

    await order.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Order error", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get user orders
router.get("/myorders", protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate("products");
        res.json(orders);
    } catch(error) {
        console.error("Fetch orders error", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
