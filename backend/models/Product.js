const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["frame", "sunglasses"],
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      // price mainly for sunglasses
    },
    description: {
      type: String,
    },
    image: {
      type: String, // image URL
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
