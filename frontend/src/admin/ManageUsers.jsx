import { useEffect, useState } from "react";
import API from "../services/api";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await API.get("/users");
        setUsers(response.data.users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="page-container">
      <h1>Manage Users</h1>

      {users.map((user) => (
        <div className="user-row" key={user._id}>
          <span>{user.name}</span>
          <span>{user.email}</span>
          <span>{user.role}</span>
        </div>
      ))}
    </div>
  );
};

export default ManageUsers;