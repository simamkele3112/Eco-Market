import Profile from "../components/Profile";
import Login from "../components/Login";

const ProfilePage = () => {
  // Simulating authentication status
  const isAuthenticated = true; 

  return isAuthenticated ? <Profile /> : <Login />;
};

export default ProfilePage;
