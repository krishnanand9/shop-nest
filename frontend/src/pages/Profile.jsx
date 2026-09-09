import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="profile-page">
      <h1>My Profile</h1>

      <div className="profile-card">
        <h2>{user?.name}</h2>

        <p>Email: {user?.email}</p>

        <p>Role: {user?.role}</p>

        <Link to="/orders">
          View My Orders
        </Link>
      </div>
    </div>
  );
};

export default Profile;