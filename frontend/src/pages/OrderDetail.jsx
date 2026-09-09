import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Loader from "../components/Loader";

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await API.get(`/orders/${id}`);
        setOrder(response.data.order);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!order) {
    return <h2>Order not found</h2>;
  }

  return (
    <div className="page-container">
      <h1>Order Details</h1>

      <p>
        Order ID: {order._id}
      </p>

      <p>
        Status: {order.orderStatus}
      </p>

      <p>
        Payment: {order.paymentMethod}
      </p>

      <h2>Items</h2>

      {order.orderItems.map((item) => (
        <div className="order-item" key={item.product}>
          <img
            src={
              item.image ||
              "https://via.placeholder.com/100"
            }
            alt={item.name}
          />

          <div>
            <h3>{item.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>
              ₹{item.price.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      ))}

      <h2>
        Total: ₹
        {order.totalPrice.toLocaleString("en-IN")}
      </h2>
    </div>
  );
};

export default OrderDetails;