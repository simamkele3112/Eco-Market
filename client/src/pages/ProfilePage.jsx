import React, { useState, useEffect, useCallback } from "react";
import Profile from "../components/Profile";
import Login from "../components/Login";

const ProfilePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuthentication = useCallback(async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve JWT from localStorage or sessionStorage

      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:3000/auth/status", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, // Attach JWT in the Authorization header
          "Content-Type": "application/json",
        },
         credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(data.isAuthenticated);
      } else {
        localStorage.removeItem("token"); // Clear invalid token
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

<<<<<<< HEAD
 
  
  return isAuthenticated ? <Profile /> : <Login />;
=======
  return isAuthenticated ? (
    <Profile refreshAuth={checkAuthentication} />
  ) : (
    <Login refreshAuth={checkAuthentication} />
  );
>>>>>>> e9bcc5f09dafc0383f7b68d841a12666195f2579
};

export default ProfilePage;
