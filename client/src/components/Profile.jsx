import React, { useState } from "react";
 
const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: "John Doe",
    email: "johndoe@example.com",
    location: "Cape Town",
    joinedDate: "2023-01-01",
  });
 
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
 
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setMessage("");
  };
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };
 
  const saveProfile = () => {
    if (!profile.fullName || !profile.email) {
      setMessage("Full Name and Email are required!");
      return;
    }
 
    setIsEditing(false);
    setMessage("Profile updated successfully!");
  };
 
  return (
<>
<div className="container mt-5">
<div className="row">
          {/* Profile Picture and Edit Button */}
<div className="col-md-4 text-center">
<img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="rounded-circle mb-3"
              style={{ width: "150px" }}
            />
<h3>{profile.fullName}</h3>
<p className="text-muted">@{profile.fullName.toLowerCase().replace(" ", "")}</p>
<button className="btn btn-primary" onClick={toggleEdit}>
              {isEditing ? "Cancel" : "Edit Profile"}
</button>
</div>
 
          {/* Profile Information */}
<div className="col-md-8">
<h4>Personal Information</h4>
<hr />
<ul className="list-unstyled">
<li>
<strong>Full Name:</strong>
<input
                  type="text"
                  name="fullName"
                  value={profile.fullName}
                  disabled={!isEditing}
                  className={`form-control${isEditing ? "" : "-plaintext"}`}
                  onChange={handleChange}
                />
</li>
<li>
<strong>Email:</strong>
<input
                  type="email"
                  name="email"
                  value={profile.email}
                  disabled={!isEditing}
                  className={`form-control${isEditing ? "" : "-plaintext"}`}
                  onChange={handleChange}
                />
</li>
<li>
<strong>Location:</strong>
<input
                  type="text"
                  name="location"
                  value={profile.location}
                  disabled={!isEditing}
                  className={`form-control${isEditing ? "" : "-plaintext"}`}
                  onChange={handleChange}
                />
</li>
<li>
<strong>Joined:</strong>
<input
                  type="date"
                  name="joinedDate"
                  value={profile.joinedDate}
                  disabled={!isEditing}
                  className={`form-control${isEditing ? "" : "-plaintext"}`}
                  onChange={handleChange}
                />
</li>
</ul>
            {isEditing && (
<button className="btn btn-success mt-3" onClick={saveProfile}>
                Save Changes
</button>
            )}
            {message && <p className="mt-3 alert alert-info">{message}</p>}
</div>
</div>
</div>
</>
  );
};
 
export default Profile;