import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";

function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(savedCart);
    }, []);

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item._id !== productId);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + parseFloat(item.price), 0);
    };

    return (
        <div className="cart-page">
            <div className="cart-header">
                <h1>Shopping Cart</h1>
                <p>{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
            </div>

            <div className="container">
                {cart.length === 0 ? (
                    <div className="empty-cart">
                        <div className="empty-icon">🛒</div>
                        <h2>Your cart is empty</h2>
                        <p>Add some products to get started</p>
                        <Link to="/products" className="btn btn-primary">
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="cart-content">
                        <div className="cart-items">
                            {cart.map((item) => (
                                <div key={item._id} className="cart-item">
                                    <img
                                        src={item.image || "https://via.placeholder.com/150"}
                                        alt={item.name}
                                    />
                                    <div className="item-details">
                                        <h3>{item.name}</h3>
                                        <p className="item-brand">{item.brand}</p>
                                        <p className="item-category">{item.category}</p>
                                    </div>
                                    <div className="item-price">₹{item.price}</div>
                                    <button
                                        className="remove-btn"
                                        onClick={() => removeFromCart(item._id)}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="cart-summary">
                            <h2>Order Summary</h2>
                            <div className="summary-row">
                                <span>Subtotal ({cart.length} items)</span>
                                <strong>₹{getTotalPrice().toFixed(2)}</strong>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <strong>Free</strong>
                            </div>
                            <div className="summary-divider"></div>
                            <div className="summary-row total">
                                <span>Total</span>
                                <strong>₹{getTotalPrice().toFixed(2)}</strong>
                            </div>
                            <button className="btn btn-primary btn-large">
                                Proceed to Checkout
                            </button>
                            <Link to="/products" className="continue-shopping">
                                ← Continue Shopping
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
