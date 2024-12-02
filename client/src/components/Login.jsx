import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import SignUp from "./SignUp";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle state for login and signup
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    city: "",
    state: "",
    zip: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  // GSAP animation on form load
  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
    );
  }, [isLogin]); // Re-run animation when switching forms

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!formData.username.trim()) newErrors.username = "Username is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.state.trim()) newErrors.state = "Please select a state.";
    if (!formData.zip.trim() || !/^\d{3}$/.test(formData.zip))
      newErrors.zip = "Please provide a valid zip code.";
    if (!formData.agree) newErrors.agree = "You must agree to the terms.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form data submitted:", formData);
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <form
        className="container p-4 bg-white rounded shadow-lg"
        style={{ maxWidth: "600px" }}
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <h2 className="text-center mb-4">{isLogin ? "Login Form" : "Sign Up Form"}</h2>
        {isLogin ? (
          <>
            <div className="row g-3">
              <div className="col-md-12">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.username ? "is-invalid" : ""}`}
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.username}</div>
              </div>
              <div className="col-md-12">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={handleChange}
                />
              </div>
            </div>
          </>
        ) : (
          <SignUp formData={formData} handleChange={handleChange} errors={errors} />
        )}
        <div className="col-12 text-center mt-4">
          <button className="btn btn-primary w-100" type="submit">
            {isLogin ? "Login" : "Sign Up"}
          </button>
          <p className="mt-3">
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <span
                  className="text-primary cursor-pointer"
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  className="text-primary cursor-pointer"
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </span>
              </>
            )}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
