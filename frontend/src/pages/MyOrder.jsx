import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Loader from "../components/Loader";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await API.get("/orders/my-orders");
        setOrders(response.data.orders);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="page-container">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <h3>
                Order #{order._id.slice(-8)}
              </h3>

              <p>
                Total: ₹
                {order.totalPrice.toLocaleString(
                  "en-IN"
                )}
              </p>

              <p>
                Status: {order.orderStatus}
              </p>

              <Link to={`/orders/${order._id}`}>
                View Order
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;