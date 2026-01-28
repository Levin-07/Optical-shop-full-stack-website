import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Wishlist.css";

function Wishlist() {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setWishlist(savedWishlist);
    }, []);

    const removeFromWishlist = (productId) => {
        const updatedWishlist = wishlist.filter(item => item._id !== productId);
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    };

    const moveToCart = (product) => {
        // Add to cart
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const exists = cart.find(item => item._id === product._id);
        if (!exists) {
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
        }

        // Remove from wishlist
        removeFromWishlist(product._id);
        alert("Moved to cart! 🛒");
    };

    return (
        <div className="wishlist-page">
            <div className="wishlist-header">
                <h1>My Wishlist</h1>
                <p>{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved</p>
            </div>

            <div className="container">
                {wishlist.length === 0 ? (
                    <div className="empty-wishlist">
                        <div className="empty-icon">❤️</div>
                        <h2>Your wishlist is empty</h2>
                        <p>Save your favorite products here</p>
                        <Link to="/products" className="btn btn-primary">
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="wishlist-grid">
                        {wishlist.map((item) => (
                            <div key={item._id} className="wishlist-card">
                                <button
                                    className="remove-wishlist-btn"
                                    onClick={() => removeFromWishlist(item._id)}
                                    title="Remove from wishlist"
                                >
                                    ✕
                                </button>
                                <img
                                    src={item.image || "https://via.placeholder.com/300"}
                                    alt={item.name}
                                />
                                <div className="wishlist-info">
                                    <h3>{item.name}</h3>
                                    <p className="wishlist-brand">{item.brand}</p>
                                    <p className="wishlist-price">₹{item.price}</p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => moveToCart(item)}
                                    >
                                        Move to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Wishlist;
