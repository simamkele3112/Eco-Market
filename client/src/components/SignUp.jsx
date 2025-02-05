import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    city: "",
    province: "",
    zip: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate

  // GSAP animation on form load
  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
    );
  }, []);

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
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.province.trim()) newErrors.province = "Please select a province.";
    if (!formData.zip.trim() || !/^\d{3}$/.test(formData.zip))
      newErrors.zip = "Please provide a valid zip code.";
    if (!formData.agree) newErrors.agree = "You must agree to the terms.";

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (
      !/(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z]).{5,}/.test(formData.password)
    ) {
      newErrors.password =
        "Password must be at least 5 characters, include one uppercase letter, one number, and a letter.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const address = `${formData.city}, ${formData.province}, ${formData.zip}`;
        const userData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          password: formData.password,
          address,
        };

        // Save user to MongoDB
        await axios.post("/api/users", userData);
        alert("Account created successfully!");

        // Navigate to login page after successful sign-up
        navigate("/login"); // Adjust route as needed
      } catch (error) {
        console.error("Error creating user:", error.message);
        alert("Failed to create account. Please try again.");
      }
    }
  };

  return (
    <form
      className="container p-4 bg-white rounded shadow-sm"
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.firstName}</div>
        </div>
        <div className="col-md-6">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.lastName}</div>
        </div>
        <div className="col-md-6">
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
        <div className="col-md-6">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.confirmPassword}</div>
        </div>
        <div className="col-md-6">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            type="text"
            className={`form-control ${errors.city ? "is-invalid" : ""}`}
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.city}</div>
        </div>
        <div className="col-md-4">
          <label htmlFor="province" className="form-label">
            Province
          </label>
          <select
            className={`form-select ${errors.province ? "is-invalid" : ""}`}
            id="province"
            name="province"
            value={formData.province}
            onChange={handleChange}
          >
            <option value="" disabled>
              Choose...
            </option>
            <option value="Eastern Cape">Eastern Cape</option>
            <option value="Kwazulu-Natal">Kwazulu-Natal</option>
          </select>
          <div className="invalid-feedback">{errors.province}</div>
        </div>
        <div className="col-md-2">
          <label htmlFor="zip" className="form-label">
            Code
          </label>
          <input
            type="text"
            className={`form-control ${errors.zip ? "is-invalid" : ""}`}
            id="zip"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.zip}</div>
        </div>
        <div className="col-12">
          <div className="form-check">
            <input
              className={`form-check-input ${errors.agree ? "is-invalid" : ""}`}
              type="checkbox"
              id="agree"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="agree">
              Agree to terms and conditions
            </label>
            <div className="invalid-feedback">{errors.agree}</div>
          </div>
        </div>
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </div>
      </div>

      {/* Link to Login Page */}
      <div className="mt-3 text-center">
        <p>
          Already have an account?{" "}
          <a href="/login" className="text-success">
            Login here
          </a>
        </p>
      </div>
    </form>
  );
};

export default SignUp;
