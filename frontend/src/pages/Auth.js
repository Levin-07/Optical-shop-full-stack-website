import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isLogin
        ? `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/auth/login`
        : `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/auth/register`;

      const payload = isLogin
        ? { email, password }
        : { name, email, password };

      const res = await axios.post(url, payload);

      localStorage.setItem("token", res.data.token);

      alert(isLogin ? "Login successful 🎉" : "Registered successfully 🎉");

      navigate("/products");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p className="auth-subtitle">
            {isLogin ? "Login to your account" : "Join our community"}
          </p>

          <form onSubmit={onSubmit} className="auth-form">
            {!isLogin && (
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={name}
                  onChange={onChange}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={onChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={onChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-full">
              {isLogin ? "Login" : "Register"}
            </button>

            <div className="auth-separator">
              <span>OR</span>
            </div>

            <div className="social-login">
              <button
                type="button"
                className="btn-social btn-google"
                onClick={() => alert("Google login integration needed")}
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="18" height="18" />
                {isLogin ? "Sign in with Google" : "Sign up with Google"}
              </button>
              <button
                type="button"
                className="btn-social btn-apple"
                onClick={() => alert("Apple login integration needed")}
              >
                <svg viewBox="0 0 384 512" width="18" height="18" fill="currentColor">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z" />
                </svg>
                {isLogin ? "Sign in with Apple" : "Sign up with Apple"}
              </button>
            </div>
          </form>

          <p className="auth-toggle">
            {isLogin ? "New to Sam Opticals?" : "Already have an account?"}{" "}
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Create Account" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
