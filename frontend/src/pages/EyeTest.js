import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EyeTest.css";

function EyeTest() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Intro, 2: Location, 3: DateTime, 4: Details

    // Scroll to top whenever step changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [step]);
    const [formData, setFormData] = useState({
        location: "",
        date: "",
        time: "",
        name: "",
        email: "",
        phone: "",
        notes: ""
    });

    // Sample locations (you can replace with actual store locations)
    const locations = [
        { id: 1, name: "Downtown Store", address: "123 Main Street, City Center" },
        { id: 2, name: "Mall Branch", address: "456 Shopping Mall, 2nd Floor" },
        { id: 3, name: "Westside Outlet", address: "789 West Avenue, Plaza" }
    ];

    // Available time slots
    const timeSlots = [
        "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
        "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"
    ];

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = () => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first to book an eye test");
            navigate("/auth");
            return;
        }

        // Validate form
        if (!formData.location || !formData.date || !formData.time || !formData.name || !formData.email || !formData.phone) {
            alert("Please fill in all required fields");
            return;
        }

        // Store booking data (in a real app, this would go to backend)
        localStorage.setItem("eyeTestBooking", JSON.stringify(formData));
        alert("Eye test booked successfully! 🎉\n\nWe'll send you a confirmation email shortly.");
        navigate("/");
    };

    return (
        <div className="eye-test-page">
            {/* Hero Section */}
            <div className="eye-test-hero">
                <div className="container">
                    <h1>Free Eye Test</h1>
                    <p>Professional eye examination in just 20 minutes</p>
                </div>
            </div>

            <div className="container">
                {/* Progress Indicator */}
                <div className="progress-steps">
                    <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
                        <div className="step-number">1</div>
                        <div className="step-label">Info</div>
                    </div>
                    <div className="progress-line"></div>
                    <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
                        <div className="step-number">2</div>
                        <div className="step-label">Location</div>
                    </div>
                    <div className="progress-line"></div>
                    <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
                        <div className="step-number">3</div>
                        <div className="step-label">Date & Time</div>
                    </div>
                    <div className="progress-line"></div>
                    <div className={`progress-step ${step >= 4 ? 'active' : ''}`}>
                        <div className="step-number">4</div>
                        <div className="step-label">Details</div>
                    </div>
                </div>

                {/* Step 1: Introduction */}
                {step === 1 && (
                    <div className="booking-step fade-in">
                        <h2>What to Expect</h2>
                        <div className="info-cards">
                            <div className="info-card">
                                <div className="info-icon">⏱️</div>
                                <h3>20 Minutes</h3>
                                <p>Quick and comprehensive eye examination</p>
                            </div>
                            <div className="info-card">
                                <div className="info-icon">👓</div>
                                <h3>Professional Test</h3>
                                <p>Conducted by certified optometrists</p>
                            </div>
                            <div className="info-card">
                                <div className="info-icon">💰</div>
                                <h3>Completely Free</h3>
                                <p>No hidden charges, absolutely free</p>
                            </div>
                            <div className="info-card">
                                <div className="info-icon">📋</div>
                                <h3>Prescription Included</h3>
                                <p>Get your prescription immediately after</p>
                            </div>
                        </div>

                        <div className="important-note">
                            <h4>📌 Important Information</h4>
                            <ul>
                                <li>Please arrive 5 minutes before your appointment</li>
                                <li>Bring your current glasses if you have any</li>
                                <li>The test is for glasses prescriptions only</li>
                                <li>You can cancel or reschedule up to 24 hours in advance</li>
                            </ul>
                        </div>

                        <button className="btn btn-primary btn-large" onClick={() => setStep(2)}>
                            Book Your Free Eye Test
                        </button>
                    </div>
                )}

                {/* Step 2: Location Selection */}
                {step === 2 && (
                    <div className="booking-step fade-in">
                        <h2>Choose Your Store</h2>
                        <p className="step-description">Select the store location most convenient for you</p>

                        <div className="location-grid">
                            {locations.map((location) => (
                                <div
                                    key={location.id}
                                    className={`location-card ${formData.location === location.name ? 'selected' : ''}`}
                                    onClick={() => handleInputChange("location", location.name)}
                                >
                                    <div className="location-icon">📍</div>
                                    <h3>{location.name}</h3>
                                    <p>{location.address}</p>
                                    {formData.location === location.name && (
                                        <div className="selected-badge">✓ Selected</div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="button-group">
                            <button className="btn btn-secondary" onClick={() => setStep(1)}>
                                Back
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={() => setStep(3)}
                                disabled={!formData.location}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Date & Time Selection */}
                {step === 3 && (
                    <div className="booking-step fade-in">
                        <h2>Select Date & Time</h2>
                        <p className="step-description">Choose your preferred appointment slot</p>

                        <div className="datetime-section">
                            <div className="date-selection">
                                <label>Select Date</label>
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => handleInputChange("date", e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>

                            <div className="time-selection">
                                <label>Select Time</label>
                                <div className="time-slots">
                                    {timeSlots.map((slot) => (
                                        <button
                                            key={slot}
                                            className={`time-slot ${formData.time === slot ? 'selected' : ''}`}
                                            onClick={() => handleInputChange("time", slot)}
                                        >
                                            {slot}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="button-group">
                            <button className="btn btn-secondary" onClick={() => setStep(2)}>
                                Back
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={() => setStep(4)}
                                disabled={!formData.date || !formData.time}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 4: Personal Details */}
                {step === 4 && (
                    <div className="booking-step fade-in">
                        <h2>Your Details</h2>
                        <p className="step-description">Please provide your contact information</p>

                        <div className="details-form">
                            <div className="form-group">
                                <label>Full Name *</label>
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Email Address *</label>
                                <input
                                    type="email"
                                    placeholder="your.email@example.com"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone Number *</label>
                                <input
                                    type="tel"
                                    placeholder="+1 (555) 000-0000"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange("phone", e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Additional Notes (Optional)</label>
                                <textarea
                                    placeholder="Any specific concerns or requirements?"
                                    value={formData.notes}
                                    onChange={(e) => handleInputChange("notes", e.target.value)}
                                    rows="4"
                                ></textarea>
                            </div>
                        </div>

                        {/* Booking Summary */}
                        <div className="booking-summary">
                            <h3>Booking Summary</h3>
                            <div className="summary-item">
                                <span>Location:</span>
                                <strong>{formData.location}</strong>
                            </div>
                            <div className="summary-item">
                                <span>Date:</span>
                                <strong>{formData.date}</strong>
                            </div>
                            <div className="summary-item">
                                <span>Time:</span>
                                <strong>{formData.time}</strong>
                            </div>
                            <div className="summary-item">
                                <span>Duration:</span>
                                <strong>20 minutes</strong>
                            </div>
                        </div>

                        <div className="button-group">
                            <button className="btn btn-secondary" onClick={() => setStep(3)}>
                                Back
                            </button>
                            <button className="btn btn-primary" onClick={handleSubmit}>
                                Confirm Booking
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EyeTest;
