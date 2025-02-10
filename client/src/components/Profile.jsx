import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Updated for react-router-dom v6+

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const navigate = useNavigate(); // Use navigate instead of history

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token"); // JWT from localStorage or sessionStorage

      if (!token) {
        setError("You are not authenticated.");
        return;
      }

      const response = await fetch("http://localhost:3000/auth/profile", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, // Send JWT token
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setProfile(data);
    } catch (err) {
      setError("Failed to load profile. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setMessage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = async () => {
    if (!profile.fullName || !profile.email) {
      setMessage("Full Name and Email are required!");
      return;
    }

    // Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(profile.email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("You are not authenticated.");
        return;
      }

      const response = await fetch("http://localhost:3000/auth/profile", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`, // Send JWT token
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      setIsEditing(false);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage("Failed to update profile. Please try again later.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token"); // Remove JWT from localStorage
    navigate("/login"); // Redirect to login page
  };

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("All fields are required!");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match!");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("You are not authenticated.");
        return;
      }

      const response = await fetch("http://localhost:3000/auth/reset-password", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to reset password");
      }

      setMessage("Password updated successfully!");
      setIsPasswordEditing(false);
    } catch (err) {
      setMessage("Failed to reset password. Please try again.");
    }
  };

  if (loading) return <p className="text-center text-muted">Loading profile...</p>;
  if (error) return <p className="alert alert-danger text-center">{error}</p>;

  return (
    <div className="container mt-5 p-4 bg-light rounded shadow-sm">
      {/* Profile Picture and Info Section */}
      <div className="d-flex flex-column align-items-center text-center mb-4">
        <img
          src={profile.pictureUrl || "https://via.placeholder.com/150"}
          alt="Profile"
          className="rounded-circle border-4 border-primary shadow-sm"
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />
        <h3 className="fw-bold mt-3">{profile.name + " " + profile.surname || "Full Name Unknown"}</h3>
        <p className="text-muted">{profile.bio || "Add a short bio about yourself."}</p>
        <p className="text-muted">{profile.location || "Location not specified"}</p>
      </div>

      {/* Wishlist Count Section */}
      <div className="d-flex justify-content-between align-items-center">
        <div className="text-muted">
          <strong>Wishlist : </strong>
          <a href="/Wishlist count" className="link-primary">{profile.wishlistCount || 0}- View WishList</a>
        </div>
        <div>
          {/* Edit Profile and Logout Buttons */}
          <button className="btn btn-outline-primary me-2" onClick={toggleEdit}>
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
          <button className="btn btn-outline-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {/* Profile Stats */}
      <div className="row mt-4">
        <div className="col-md-4 mb-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Listings</h5>
              <p className="card-text">{profile.listingsCount || 0}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Followers</h5>
              <p className="card-text">{profile.followersCount || 0}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Reviews</h5>
              <p className="card-text">{profile.reviewsCount || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Profile Info Section */}
      <div className="mt-4">
        <h5 className="fw-bold">Additional Information</h5>
        <p><strong>Address:</strong> {profile.address || "No address provided"}</p>
        <p><strong>Member Since:</strong> {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "Date not available"}</p>
      </div>

      {/* Profile Editing Section */}
      {isEditing && (
        <div className="mt-4">
          <h4>Edit Profile</h4>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12 mb-3">
              <label className="form-label fw-semibold">Bio</label>
              <textarea
                name="bio"
                value={profile.bio}
                className="form-control"
                onChange={handleChange}
                rows="3"
              ></textarea>
            </div>
            <div className="col-md-12 mb-3">
              <label className="form-label fw-semibold">Address</label>
              <input
                type="text"
                name="address"
                value={profile.address || ""}
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>
          <button className="btn btn-success mt-3" onClick={saveProfile}>
            Save Changes
          </button>
        </div>
      )}

      {/* Account Security Section */}
      <div className="mt-4">
        <h4>Account Security</h4>
        <button
          className="btn btn-outline-warning"
          onClick={() => setIsPasswordEditing(!isPasswordEditing)}
        >
          {isPasswordEditing ? "Cancel" : "Change Password"}
        </button>
        {isPasswordEditing && (
          <div className="mt-3">
            <div className="mb-3">
              <label className="form-label">Current Password</label>
              <input
                type="password"
                className="form-control"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-success" onClick={handlePasswordChange}>
              Change Password
            </button>
          </div>
        )}
      </div>

      {/* Messages */}
      {message && (
        <div className="alert alert-info mt-3 text-center">
          {message}
        </div>
      )}
    </div>
  ); 
};

export default Profile;
