import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Prescription.css";

function Prescription() {
    const navigate = useNavigate();
    const location = useLocation();
    const product = location.state?.product;

    const [inputMethod, setInputMethod] = useState(null); // 'manual' or 'upload'
    const [prescriptionFile, setPrescriptionFile] = useState(null);
    const [manualData, setManualData] = useState({
        rightEye: { sph: "", cyl: "", axis: "" },
        leftEye: { sph: "", cyl: "", axis: "" },
        pd: ""
    });

    if (!product) {
        return (
            <div className="prescription-page">
                <div className="container">
                    <div className="error-message">
                        <h2>No product selected</h2>
                        <p>Please select a product first</p>
                        <button onClick={() => navigate("/products")} className="btn">
                            Go to Products
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPrescriptionFile(file);
        }
    };

    const handleManualChange = (eye, field, value) => {
        setManualData({
            ...manualData,
            [eye]: {
                ...manualData[eye],
                [field]: value
            }
        });
    };

    const handleProceedToCheckout = () => {
        if (inputMethod === "upload" && !prescriptionFile) {
            alert("Please upload your prescription");
            return;
        }

        if (inputMethod === "manual") {
            const { rightEye, leftEye, pd } = manualData;
            if (!rightEye.sph || !leftEye.sph || !pd) {
                alert("Please fill in all required fields (SPH for both eyes and PD)");
                return;
            }
        }

        // Store prescription data
        const prescriptionData = {
            method: inputMethod,
            data: inputMethod === "manual" ? manualData : { fileName: prescriptionFile.name },
            product: product
        };

        localStorage.setItem("prescriptionData", JSON.stringify(prescriptionData));

        // For now, just show success message
        // In a real app, this would proceed to checkout/payment
        alert("Prescription saved! Proceeding to checkout...");
        navigate("/products");
    };

    return (
        <div className="prescription-page">
            <div className="prescription-header">
                <h1>Add Prescription Details</h1>
                <p>Choose how you'd like to provide your prescription</p>
            </div>

            <div className="container">
                {/* Product Summary */}
                <div className="product-summary">
                    <img
                        src={product.image || "https://via.placeholder.com/150"}
                        alt={product.name}
                    />
                    <div>
                        <h3>{product.name}</h3>
                        <p className="product-brand">{product.brand}</p>
                        <p className="product-price">₹{product.price}</p>
                    </div>
                </div>

                {/* Method Selection */}
                {!inputMethod && (
                    <div className="method-selection">
                        <h2>How would you like to provide your prescription?</h2>
                        <div className="method-cards">
                            <div
                                className="method-card"
                                onClick={() => setInputMethod("manual")}
                            >
                                <div className="method-icon">📝</div>
                                <h3>Enter Manually</h3>
                                <p>Input your power readings directly</p>
                                <button className="btn">Choose This</button>
                            </div>

                            <div
                                className="method-card"
                                onClick={() => setInputMethod("upload")}
                            >
                                <div className="method-icon">📄</div>
                                <h3>Upload Prescription</h3>
                                <p>Upload your eye test result</p>
                                <button className="btn">Choose This</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Manual Input Form */}
                {inputMethod === "manual" && (
                    <div className="prescription-form">
                        <div className="form-header">
                            <h2>Enter Your Prescription</h2>
                            <button
                                className="btn-link"
                                onClick={() => setInputMethod(null)}
                            >
                                ← Change Method
                            </button>
                        </div>

                        <div className="prescription-grid">
                            {/* Right Eye */}
                            <div className="eye-section">
                                <h3>Right Eye (OD)</h3>
                                <div className="input-group">
                                    <label>SPH (Sphere) *</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., -2.00"
                                        value={manualData.rightEye.sph}
                                        onChange={(e) => handleManualChange("rightEye", "sph", e.target.value)}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>CYL (Cylinder)</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., -0.50"
                                        value={manualData.rightEye.cyl}
                                        onChange={(e) => handleManualChange("rightEye", "cyl", e.target.value)}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>AXIS</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., 180"
                                        value={manualData.rightEye.axis}
                                        onChange={(e) => handleManualChange("rightEye", "axis", e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Left Eye */}
                            <div className="eye-section">
                                <h3>Left Eye (OS)</h3>
                                <div className="input-group">
                                    <label>SPH (Sphere) *</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., -2.25"
                                        value={manualData.leftEye.sph}
                                        onChange={(e) => handleManualChange("leftEye", "sph", e.target.value)}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>CYL (Cylinder)</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., -0.75"
                                        value={manualData.leftEye.cyl}
                                        onChange={(e) => handleManualChange("leftEye", "cyl", e.target.value)}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>AXIS</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., 90"
                                        value={manualData.leftEye.axis}
                                        onChange={(e) => handleManualChange("leftEye", "axis", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* PD */}
                        <div className="pd-section">
                            <div className="input-group">
                                <label>PD (Pupillary Distance) * (mm)</label>
                                <input
                                    type="text"
                                    placeholder="e.g., 63"
                                    value={manualData.pd}
                                    onChange={(e) => setManualData({ ...manualData, pd: e.target.value })}
                                />
                                <small>The distance between your pupils in millimeters</small>
                            </div>
                        </div>

                        <button
                            className="btn btn-primary btn-large"
                            onClick={handleProceedToCheckout}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}

                {/* Upload Form */}
                {inputMethod === "upload" && (
                    <div className="prescription-form">
                        <div className="form-header">
                            <h2>Upload Your Prescription</h2>
                            <button
                                className="btn-link"
                                onClick={() => setInputMethod(null)}
                            >
                                ← Change Method
                            </button>
                        </div>

                        <div className="upload-section">
                            <div className="upload-area">
                                <div className="upload-icon">📎</div>
                                <h3>Upload Eye Test Result</h3>
                                <p>Accepted formats: PDF, JPG, PNG (Max 5MB)</p>

                                <input
                                    type="file"
                                    id="prescription-upload"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={handleFileChange}
                                    style={{ display: "none" }}
                                />

                                <label htmlFor="prescription-upload" className="btn btn-secondary">
                                    Choose File
                                </label>

                                {prescriptionFile && (
                                    <div className="file-selected">
                                        <p>✓ {prescriptionFile.name}</p>
                                    </div>
                                )}
                            </div>

                            <div className="upload-tips">
                                <h4>Tips for a clear prescription:</h4>
                                <ul>
                                    <li>Ensure all text is clearly visible</li>
                                    <li>Include the date of the eye test</li>
                                    <li>Make sure your name is visible</li>
                                    <li>Prescription should be less than 2 years old</li>
                                </ul>
                            </div>
                        </div>

                        <button
                            className="btn btn-primary btn-large"
                            onClick={handleProceedToCheckout}
                            disabled={!prescriptionFile}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Prescription;
