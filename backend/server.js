require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const productRoutes = require("./routes/product.routes");
const requestRoutes = require("./routes/request.routes");
const cors = require("cors");




const app = express();
app.use(cors());
app.use(express.json());

connectDB();

const authRoutes = require("./routes/auth.routes");
//console.log("Auth routes loaded:", authRoutes);          //for testing
app.use("/api/products", productRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});