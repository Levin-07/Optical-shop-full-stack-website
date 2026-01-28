import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Products.css";

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(savedWishlist);
  }, []);

  // Fetch products
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Toggle wishlist
  const toggleWishlist = (product) => {
    const exists = wishlist.find((item) => item._id === product._id);
    let updatedWishlist;

    if (exists) {
      updatedWishlist = wishlist.filter((item) => item._id !== product._id);
      alert("Removed from wishlist");
    } else {
      updatedWishlist = [...wishlist, product];
      alert("Added to wishlist ❤️");
    }

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  // Add to cart (works for both sunglasses and glasses)
  const addToCart = (product) => {
    const exists = cart.find((item) => item._id === product._id);
    if (!exists) {
      setCart([...cart, product]);
      alert("Added to cart 🛒");
    } else {
      alert("Already in cart!");
    }
  };

  // Handle Buy Now
  const handleBuyNow = (product) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/auth");
      return;
    }

    // If product is glasses (frame), redirect to prescription page
    if (product.category === "frame" || product.category === "glass" || product.category === "glasses") {
      navigate("/prescription", { state: { product } });
    } else {
      // For sunglasses, place order directly
      placeOrder(product._id);
    }
  };

  const placeOrder = (productId) => {
    const token = localStorage.getItem("token");

    axios
      .post(
        "http://localhost:5000/api/orders",
        { productId },
        { headers: { Authorization: token } }
      )
      .then(() => {
        alert("Order placed successfully!");
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to place order");
      });
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Our Collection</h1>
        <p>Explore our curated selection of premium eyewear</p>
      </div>

      <div className="container-wide">
        {products.length === 0 ? (
          <div className="no-products">
            <p>No products available at the moment</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-image">
                  <img
                    src={product.image || "https://via.placeholder.com/400x300?text=No+Image"}
                    alt={product.name}
                  />
                  <button
                    className={`wishlist-btn ${wishlist.find(item => item._id === product._id) ? 'active' : ''}`}
                    onClick={() => toggleWishlist(product)}
                    title={wishlist.find(item => item._id === product._id) ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlist.find(item => item._id === product._id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>

                <div className="product-info">
                  <h3>{product.name}</h3>
                  <div className="product-details">
                    <p>
                      <strong>Brand:</strong> {product.brand}
                    </p>
                    <p>
                      <strong>Category:</strong>{" "}
                      {product.category === "frame" ? "Glass" : product.category}
                    </p>
                  </div>
                  <p className="product-price">₹{product.price}</p>

                  <div className="product-actions">
                    <button
                      onClick={() => addToCart(product)}
                      className="btn btn-secondary"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="btn"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
