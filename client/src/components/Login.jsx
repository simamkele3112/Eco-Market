import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import SignUp from "./SignUp";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle state for login and signup
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const formRef = useRef(null);
  const loaderRef = useRef(null); // Ref for the loading animation
  const navigate = useNavigate();

  // GSAP animation on form load
  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
    );
  }, [isLogin]); // Re-run animation when switching forms

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true); // Start loading animation
      gsap.fromTo(
        loaderRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.inOut", repeat: -1, yoyo: true }
      );

      try {
        const endpoint = isLogin
          ? "http://localhost:3000/auth/login"
          : "http://localhost:3000/auth/register";

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          console.log("Server Response:", result);
          navigate("/"); // Redirect to dashboard or home page
        } else {
          setServerError(result.message || "An error occurred.");
        }
      } catch (error) {
        console.error("Error:", error);
        setServerError("Something went wrong. Please try again later.");
      } finally {
        setIsLoading(false); // Stop loading animation
        gsap.to(loaderRef.current, { opacity: 0, scale: 0.8, duration: 0.5 });
      }
    } else {
      setServerError("");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      {/* Loading animation */}
      <div className="loading-overlay" ref={loaderRef} style={{ display: isLoading ? "flex" : "none" }}>
        <div className="spinner"></div>
      </div>

      {isLogin ? (
        <form
          className="container p-4 bg-white rounded shadow-lg"
          style={{ maxWidth: "600px" }}
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <h2 className="text-center mb-4">Login Form</h2>
          <div className="row g-3">
            <div className="col-md-12">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors.email}</div>
            </div>
            <div className="col-md-12">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors.password}</div>
            </div>
          </div>
          {serverError && <p className="text-danger">{serverError}</p>}
          <div className="col-12 text-center mt-4">
            <button className="btn btn-success w-100" type="submit" disabled={isLoading}>
              {isLogin ? "Login" : "Register"}
            </button>
            <p className="mt-3">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span className="text-success cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Sign Up" : "Login"}
              </span>
            </p>
          </div>
        </form>
      ) : (
        <SignUp setIsLogin={setIsLogin} />
      )}
    </div>
  );
};

export default Login;
