import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Payment.css";

function Payment() {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Fallbacks in case state is missing
    const products = location.state?.products || [];
    const amount = location.state?.amount || 0;
    const isCart = location.state?.isCart || false;

    const [paymentMethod, setPaymentMethod] = useState("card");
    const [loading, setLoading] = useState(false);

    if (products.length === 0) {
        return (
            <div className="payment-page">
                <div className="payment-header">
                    <h1>Checkout & Payment</h1>
                </div>
                <div className="container">
                    <div className="error-message" style={{textAlign: "center", marginTop: "50px"}}>
                        <h2>No order details found</h2>
                        <p>Please select products to proceed with payment.</p>
                        <button onClick={() => navigate("/products")} className="btn btn-primary" style={{marginTop: "20px"}}>
                            Back to Products
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const handlePayment = (e) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Session expired. Please login again.");
            navigate("/auth");
            return;
        }

        // Simulate payment delay
        setTimeout(() => {
            axios.post(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/orders`, 
                { products: products }, 
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then(res => {
                alert("Payment successful! Order placed automatically. 🎉");
                if (isCart) {
                    localStorage.setItem("cart", "[]");
                }
                // Also clear prescription if it exists
                localStorage.removeItem("prescriptionData");
                navigate("/"); // Redirect to home
            })
            .catch(err => {
                console.error(err);
                alert("Payment succeeded but failed to place order on our end. Contact support.");
            })
            .finally(() => {
                setLoading(false);
            });
        }, 1500); // Mocks 1.5s transaction
    };

    return (
        <div className="payment-page">
            <div className="payment-header">
                <h1>Checkout & Payment</h1>
                <p>Complete your payment securely</p>
            </div>
            
            <div className="container">
                <div className="payment-content">
                    <div className="payment-form-container">
                        <h2>Select Payment Method</h2>
                        <div className="payment-methods">
                            <label className={`method-card ${paymentMethod === 'card' ? 'active' : ''}`}>
                                <input 
                                    type="radio" 
                                    name="method" 
                                    checked={paymentMethod === 'card'} 
                                    onChange={() => setPaymentMethod('card')} 
                                />
                                💳 Credit / Debit Card
                            </label>
                            <label className={`method-card ${paymentMethod === 'upi' ? 'active' : ''}`}>
                                <input 
                                    type="radio" 
                                    name="method" 
                                    checked={paymentMethod === 'upi'} 
                                    onChange={() => setPaymentMethod('upi')} 
                                />
                                📱 UPI
                            </label>
                            <label className={`method-card ${paymentMethod === 'cod' ? 'active' : ''}`}>
                                <input 
                                    type="radio" 
                                    name="method" 
                                    checked={paymentMethod === 'cod'} 
                                    onChange={() => setPaymentMethod('cod')} 
                                />
                                🚚 Cash on Delivery
                            </label>
                        </div>

                        <form onSubmit={handlePayment} className="actual-form">
                            {paymentMethod === 'card' && (
                                <div className="card-details">
                                    <div className="input-group">
                                        <label>Cardholder Name</label>
                                        <input type="text" placeholder="John Doe" required />
                                    </div>
                                    <div className="input-group">
                                        <label>Card Number</label>
                                        <input type="text" placeholder="XXXX XXXX XXXX XXXX" maxLength="19" required />
                                    </div>
                                    <div className="input-row">
                                        <div className="input-group">
                                            <label>Expiry Date</label>
                                            <input type="text" placeholder="MM/YY" maxLength="5" required />
                                        </div>
                                        <div className="input-group">
                                            <label>CVV</label>
                                            <input type="password" placeholder="XXX" maxLength="3" required />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {paymentMethod === 'upi' && (
                                <div className="upi-details">
                                    <div className="input-group">
                                        <label>UPI ID</label>
                                        <input type="text" placeholder="username@upi" required />
                                    </div>
                                </div>
                            )}

                            {paymentMethod === 'cod' && (
                                <div className="cod-details">
                                    <p>You will pay ₹{amount.toFixed(2)} when the item is delivered.</p>
                                </div>
                            )}

                            <button type="submit" className="btn btn-primary btn-large pay-btn" disabled={loading}>
                                {loading ? "Processing..." : `Pay ₹${amount.toFixed(2)}`}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;
