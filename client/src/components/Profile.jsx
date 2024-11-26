const Profile = () => {
  const user = {
    fullName: "John Doe",
    username: "johndoe",
    email: "johndoe@example.com",
    location: "Cape Town",
    joinedDate: "2023-01-01",
  };
 
  return (
<>
<div className="container mt-5">
<div className="row">
          {/* Profile Picture and User Info */}
<div className="col-md-4 text-center">
<img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="rounded-circle mb-3"
              style={{ width: "150px" }}
            />
<h3>{user.fullName}</h3>
<p className="text-muted">@{user.username}</p>
</div>
 
          {/* Personal Information */}
<div className="col-md-8">
<h4>Personal Information</h4>
<hr />
<ul className="list-unstyled">
<li>
<strong>Full Name:</strong> {user.fullName}
</li>
<li>
<strong>Email:</strong> {user.email}
</li>
<li>
<strong>Location:</strong> {user.location}
</li>
<li>
<strong>Joined:</strong> {new Date(user.joinedDate).toLocaleDateString()}
</li>
</ul>
</div>
</div>
</div>
</>
  );
};
 
export default Profile;