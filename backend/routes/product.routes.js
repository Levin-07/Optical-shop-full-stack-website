const express = require("express");
const Product = require("../models/Product");
const protect = require("../middleware/auth.middleware");

const router = express.Router();

/**
 * @route   GET /api/products
 * @desc    Get all products (frames + sunglasses)
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   POST /api/products
 * @desc    Add new product (admin)
 * @access  Protected
 */
router.post("/", protect, async (req, res) => {
  try {
    const { name, category, brand, price, description, image } = req.body;

    if (!name || !category || !brand) {
      return res.status(400).json({
        message: "Name, category and brand are required",
      });
    }

    const product = new Product({
      name,
      category,
      brand,
      price,
      description,
      image,
    });

    await product.save();

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
