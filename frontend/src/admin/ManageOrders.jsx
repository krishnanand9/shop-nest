import { useEffect, useState } from "react";
import API from "../services/api";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await API.get("/orders");
      setOrders(response.data.orders);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}/status`, {
        status,
      });

      fetchOrders();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to update status"
      );
    }
  };

  return (
    <div className="page-container">
      <h1>Manage Orders</h1>

      {orders.map((order) => (
        <div className="order-admin-card" key={order._id}>
          <h3>
            Order #{order._id.slice(-8)}
          </h3>

          <p>
            Customer: {order.user?.name}
          </p>

          <p>
            Total: ₹
            {order.totalPrice.toLocaleString("en-IN")}
          </p>

          <select
            value={order.orderStatus}
            onChange={(e) =>
              updateStatus(
                order._id,
                e.target.value
              )
            }
          >
            <option value="Processing">
              Processing
            </option>

            <option value="Confirmed">
              Confirmed
            </option>

            <option value="Shipped">
              Shipped
            </option>

            <option value="Delivered">
              Delivered
            </option>

            <option value="Cancelled">
              Cancelled
            </option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default ManageOrders;