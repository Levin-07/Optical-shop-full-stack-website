import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>Sam Opticals</h3>
                    <p>Your vision, our passion. Providing premium eyewear and professional eye care services in Anchal.</p>
                </div>

                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/eye-test">Eye Test</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <p>📍 Hill Highway, College Road, Anchal, Kerala 691306</p>
                    <p>📧 info@samopticals.com</p>
                    <p>🕒 Mon - Sat: 9:00 AM - 8:00 PM</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Sam Opticals. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
