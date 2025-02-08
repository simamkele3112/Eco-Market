import React, { useState, useEffect } from "react";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/profile"); // Replace with your API endpoint
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
    try {
      const response = await fetch("https://localhost:3000/auth/profile", {
        method: "PUT",
        headers: {
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

  if (loading) return <p className="text-center text-muted">Loading profile...</p>;
  if (error) return <p className="alert alert-danger text-center">{error}</p>;

  return (
    <div className="container mt-5 p-4 shadow-lg rounded bg-white">
      <div className="row align-items-center">
        {/* Profile Picture and Edit Button */}
        <div className="col-md-4 text-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="rounded-circle mb-3 shadow-sm"
            style={{ width: "150px" }}
          />
          <h3 className="fw-bold">{profile.fullName}</h3>
          <p className="text-muted">@{profile.fullName.toLowerCase().replace(" ", "")}</p>
          <button className="btn btn-outline-primary btn-sm" onClick={toggleEdit}>
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* Profile Information */}
        <div className="col-md-8">
          <h4 className="fw-bold border-bottom pb-2">Personal Information</h4>
          <div className="row">
            {Object.entries(profile).map(([key, value]) => (
              <div className="col-md-6 mb-3" key={key}>
                <label className="form-label fw-semibold">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  type={key === "joinedDate" ? "date" : "text"}
                  name={key}
                  value={value}
                  disabled={!isEditing}
                  className={`form-control ${isEditing ? "border-primary" : "border-0 bg-light"}`}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
          {isEditing && (
            <button className="btn btn-success mt-3" onClick={saveProfile}>
              Save Changes
            </button>
          )}
          {message && <p className="mt-3 alert alert-info">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;

