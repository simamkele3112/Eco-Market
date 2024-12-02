import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Login.css"; // Add your additional custom styles if needed

const Login = () => {
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
        <h2 className="text-center mb-4">Registration Form</h2>
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
            <label htmlFor="state" className="form-label">
              State
            </label>
            <select
              className={`form-select ${errors.state ? "is-invalid" : ""}`}
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
            >
              <option value="" disabled>
                Choose...
              </option>
              <option value="State1">State 1</option>
              <option value="State2">State 2</option>
            </select>
            <div className="invalid-feedback">{errors.state}</div>
          </div>
          <div className="col-md-2">
            <label htmlFor="zip" className="form-label">
              Zip
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
            <button className="btn btn-primary w-100" type="submit">
              Submit Form
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
