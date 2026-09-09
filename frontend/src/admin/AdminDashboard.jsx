import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      <div className="admin-grid">
        <Link to="/admin/products">
          <h2>📦 Products</h2>
          <p>Manage products</p>
        </Link>

        <Link to="/admin/users">
          <h2>👥 Users</h2>
          <p>Manage users</p>
        </Link>

        <Link to="/admin/orders">
          <h2>🛒 Orders</h2>
          <p>Manage orders</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;