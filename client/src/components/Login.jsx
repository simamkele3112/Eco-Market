import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "./firebase"; // Import Firebase functions
import SignUp from "./SignUp";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle state for login and signup
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [firebaseError, setFirebaseError] = useState(""); // State for Firebase error messages
  const formRef = useRef(null);
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
      try {
        if (isLogin) {
          // Firebase Login
          const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
          console.log("User logged in:", userCredential.user); // Log user info
          alert("Login successful!");
          navigate("/dashboard"); // Redirect to a dashboard or home page after successful login
        } else {
          // Handle signup form submission (you can add signup logic here)
          alert("Sign up logic is not implemented yet!");
        }
      } catch (error) {
        console.error("Firebase Error:", error); // Log the full error object

        // Handle Firebase authentication errors
        if (error.code === "auth/user-not-found") {
          setFirebaseError("User does not exist.");
        } else if (error.code === "auth/wrong-password") {
          setFirebaseError("Incorrect password.");
        } else {
          setFirebaseError("Login failed. Please try again.");
        }
      }
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
          </>
        ) : (
          <SignUp formData={formData} handleChange={handleChange} errors={errors} />
        )}
        {firebaseError && <p className="text-danger">{firebaseError}</p>} {/* Display Firebase errors */}
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
