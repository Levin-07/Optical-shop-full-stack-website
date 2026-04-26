import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let role = null;

  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      role = decoded.role;
    } catch (err) {
      console.log("Invalid token");
    }
  }

  // Load cart and wishlist counts
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setCartCount(cart.length);
    setWishlistCount(wishlist.length);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setIsMenuOpen(false)}>
          <h2>Sam Opticals</h2>
        </Link>

        {/* Mobile Menu Toggle */}
        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/products" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Products
          </Link>
          <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
          <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Contact
          </Link>

          {role === "admin" && (
            <Link to="/admin" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Admin
            </Link>
          )}

          {/* Mobile Login/Logout inside the menu */}
          <div className="mobile-auth">
            {!token ? (
              <Link to="/auth" className="btn btn-nav" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
            ) : (
              <button onClick={() => { logout(); setIsMenuOpen(false); }} className="btn btn-nav">
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="navbar-actions">
          {/* Search */}
          <button
            className="icon-btn"
            onClick={() => setShowSearch(!showSearch)}
            title="Search"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>

          {/* Wishlist */}
          <Link to="/wishlist" className="icon-btn" title="Wishlist">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {wishlistCount > 0 && (
              <span className="badge">{wishlistCount}</span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="icon-btn" title="Cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && (
              <span className="badge">{cartCount}</span>
            )}
          </Link>

          {/* Auth Button */}
          {!token ? (
            <Link to="/auth" className="btn btn-nav">
              Login
            </Link>
          ) : (
            <button onClick={logout} className="btn btn-nav">
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="search-dropdown">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button type="submit" className="btn btn-secondary">
              Search
            </button>
          </form>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
