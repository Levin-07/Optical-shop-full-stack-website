import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Home.css";
import "./Carousel.css";

const featuredProducts = [
  {
    id: 1,
    title: "Classic Aviator",
    subtitle: "Timeless elegance meets modern design",
    category: "Sunglasses",
    gradient: "linear-gradient(135deg, #D4735E 0%, #E89580 100%)"
  },
  {
    id: 2,
    title: "Designer Frames",
    subtitle: "Handcrafted with precision and care",
    category: "Frames",
    gradient: "linear-gradient(135deg, #3E2723 0%, #6B6B6B 100%)"
  },
  {
    id: 3,
    title: "Summer Collection",
    subtitle: "Bold styles for the season",
    category: "Sunglasses",
    gradient: "linear-gradient(135deg, #FFD4C4 0%, #F5F1E8 100%)"
  },
  {
    id: 4,
    title: "Premium Series",
    subtitle: "Luxury eyewear for discerning tastes",
    category: "Exclusive",
    gradient: "linear-gradient(135deg, #E89580 0%, #D4735E 100%)"
  }
];

function Home() {
  const token = localStorage.getItem("token");

  // Auto-playing carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance carousel using setTimeout for better stability
  useEffect(() => {
    let slideTimer;

    if (!isPaused) {
      slideTimer = setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
      }, 4000); // 4 seconds delay from LAST slide change
    }

    // Cleanup timer on unmount or when slide/pause state changes
    return () => clearTimeout(slideTimer);
  }, [currentSlide, isPaused]); // Re-run effect whenever slide changes

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  return (
    <div className="home">
      {/* Auto-Playing Carousel - Gentle Monster Style */}
      {/* Auto-Playing Carousel - Gentle Monster Style */}
      <section className="carousel-section">
        <div className="carousel-container">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ background: product.gradient }}
            >
              <div
                className="carousel-content"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <span className="carousel-category">{product.category}</span>
                <h2>{product.title}</h2>
                <p>{product.subtitle}</p>
                <Link to="/products" className="btn btn-outline carousel-btn">
                  Explore Collection
                </Link>
              </div>
            </div>
          ))}

          {/* Progress Indicators */}
          <div
            className="carousel-indicators"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {featuredProducts.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              >
                <div className="indicator-progress"></div>
              </button>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            className="carousel-arrow prev"
            onClick={prevSlide}
            aria-label="Previous slide"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            ‹
          </button>
          <button
            className="carousel-arrow next"
            onClick={nextSlide}
            aria-label="Next slide"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            ›
          </button>
        </div>
      </section>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="fade-in">Redefine Your Vision</h1>
          <p className="fade-in">
            Discover handcrafted eyewear that blends timeless elegance with contemporary design.
            Each piece is thoughtfully curated to complement your unique style.
          </p>
          <div className="hero-buttons fade-in">
            {!token && (
              <Link to="/auth" className="btn">
                Get Started
              </Link>
            )}
            <Link to="/products" className="btn btn-outline">
              Explore Collection
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-image-placeholder">
            <span>Premium Eyewear</span>
          </div>
        </div>
      </section>

      {/* Highlights Section - Gentle Monster Inspired */}
      <section className="highlights">
        <div className="container-wide">
          <div className="section-header">
            <h2>Featured Collections</h2>
            <p>Curated selections that define modern eyewear</p>
          </div>

          <div className="highlights-grid">
            <div className="highlight-card highlight-large">
              <div className="highlight-image">
                <div className="placeholder-image" style={{ background: 'linear-gradient(135deg, #D4735E 0%, #E89580 100%)' }}>
                  <span>Classic Frames</span>
                </div>
              </div>
              <div className="highlight-content">
                <h3>Timeless Classics</h3>
                <p>Elegant frames that never go out of style</p>
                <Link to="/products" className="highlight-link">
                  Discover →
                </Link>
              </div>
            </div>

            <div className="highlight-card">
              <div className="highlight-image">
                <div className="placeholder-image" style={{ background: 'linear-gradient(135deg, #FFD4C4 0%, #F5F1E8 100%)' }}>
                  <span>Sunglasses</span>
                </div>
              </div>
              <div className="highlight-content">
                <h3>Summer Collection</h3>
                <p>Premium sunglasses for every occasion</p>
                <Link to="/products" className="highlight-link">
                  Explore →
                </Link>
              </div>
            </div>

            <div className="highlight-card">
              <div className="highlight-image">
                <div className="placeholder-image" style={{ background: 'linear-gradient(135deg, #3E2723 0%, #6B6B6B 100%)' }}>
                  <span>Designer</span>
                </div>
              </div>
              <div className="highlight-content">
                <h3>Designer Series</h3>
                <p>Exclusive designs from renowned artisans</p>
                <Link to="/products" className="highlight-link">
                  View →
                </Link>
              </div>
            </div>

            <div className="highlight-card highlight-wide">
              <div className="highlight-image">
                <div className="placeholder-image" style={{ background: 'linear-gradient(135deg, #E89580 0%, #D4735E 100%)' }}>
                  <span>New Arrivals</span>
                </div>
              </div>
              <div className="highlight-content">
                <h3>Latest Arrivals</h3>
                <p>Fresh styles just added to our collection</p>
                <Link to="/products" className="highlight-link">
                  Shop Now →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Eye Test CTA Section */}
      <section className="eye-test-cta">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <h2>Get Your Free Eye Test</h2>
              <p>
                Professional eye examination in just 20 minutes. Book your free appointment
                with our certified optometrists and get your prescription instantly.
              </p>
              <ul className="cta-benefits">
                <li>✓ Completely free, no hidden charges</li>
                <li>✓ Quick 20-minute examination</li>
                <li>✓ Instant prescription results</li>
                <li>✓ Professional certified optometrists</li>
              </ul>
              <Link to="/eye-test" className="btn btn-primary btn-large-cta">
                Book Free Eye Test
              </Link>
            </div>
            <div className="cta-visual">
              <div className="cta-image-placeholder">
                <span>👁️</span>
                <p>Professional Eye Care</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose">
        <div className="container">
          <h2 className="text-center">Why Choose Us</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👓</div>
              <h3>Premium Quality</h3>
              <p>Handcrafted frames made from the finest materials</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>Expert Curation</h3>
              <p>Carefully selected designs for every style preference</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Perfect Fit</h3>
              <p>Personalized assistance to find your ideal eyewear</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Quick and secure shipping to your doorstep</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
