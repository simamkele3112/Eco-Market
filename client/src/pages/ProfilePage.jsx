import React, { useState, useEffect } from "react";
import Profile from "../components/Profile";
import Login from "../components/Login";

const ProfilePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/status", {
        credentials: "include", // Ensure cookies are sent for session-based auth
      });
      const data = await response.json();
      setIsAuthenticated(data.isAuthenticated);
    } catch (error) {
      console.error("Error checking authentication:", error);
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated === null) {
    return <p className="text-center text-muted">Checking authentication...</p>;
  }

  if(!isAuthenticated){
    alert("is Authenticated status" +isAuthenticated )
  }
  
  return isAuthenticated ? <Profile /> : <Login />;
};

export default ProfilePage;
