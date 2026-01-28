const express = require("express");
const Request = require("../models/Request");
const Product = require("../models/Product");
const protect = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/admin.middleware");


const router = express.Router();

/**
 * @route   POST /api/requests
 * @desc    Create enquiry or order
 * @access  Protected
 */
router.post("/", protect, async (req, res) => {
  try {
    const { productId, type, message } = req.body;

    if (!productId || !type) {
      return res.status(400).json({
        message: "Product and request type are required",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const request = new Request({
      user: req.user.id,
      product: productId,
      type,
      message,
    });

    await request.save();

    res.status(201).json({
      message: "Request submitted successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   GET /api/requests/my
 * @desc    Get logged-in user's requests
 * @access  Protected
 */
router.get("/my", protect, async (req, res) => {
  try {
    const requests = await Request.find({ user: req.user.id })
      .populate("product")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   GET /api/requests
 * @desc    Get all requests (admin)
 * @access  Protected
 */
router.get("/", protect, async (req, res) => {
  try {
    const requests = await Request.find()
      .populate("user", "name email")
      .populate("product")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin: get all requests
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const requests = await Request.find()
      .populate("user", "name email")
      .populate("product")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin: update status
// Update request status (ADMIN ONLY)
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;

    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = status; // 👈 THIS WAS MISSING
    await request.save();     // 👈 THIS WAS MISSING

    res.json({
      message: "Status updated successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});



/**
 * @route   PUT /api/requests/:id
 * @desc    Update request status
 * @access  Protected
 */
router.put("/:id", protect, async (req, res) => {
  try {
    const { status } = req.body;

    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = status || request.status;
    await request.save();

    res.json({
      message: "Request status updated",
      request,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
