import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const [paymentMethod, setPaymentMethod] =
    useState("COD");

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    setError("");

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    try {
      const orderItems = cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      }));

      const response = await API.post("/orders", {
        orderItems,
        shippingAddress: address,
        paymentMethod,
      });

      clearCart();

      navigate(`/orders/${response.data.order._id}`);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to place order"
      );
    }
  };

  return (
    <div className="page-container">
      <h1>Checkout</h1>

      {error && <p className="error">{error}</p>}

      <form onSubmit={placeOrder} className="checkout-form">
        <input
          name="name"
          placeholder="Full Name"
          value={address.name}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone"
          value={address.phone}
          onChange={handleChange}
          required
        />

        <input
          name="street"
          placeholder="Street Address"
          value={address.street}
          onChange={handleChange}
          required
        />

        <input
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleChange}
          required
        />

        <input
          name="state"
          placeholder="State"
          value={address.state}
          onChange={handleChange}
          required
        />

        <input
          name="pincode"
          placeholder="Pincode"
          value={address.pincode}
          onChange={handleChange}
          required
        />

        <select
          value={paymentMethod}
          onChange={(e) =>
            setPaymentMethod(e.target.value)
          }
        >
          <option value="COD">
            Cash on Delivery
          </option>

          <option value="UPI">
            UPI
          </option>

          <option value="CARD">
            Card
          </option>
        </select>

        <h2>
          Total: ₹{totalPrice.toLocaleString("en-IN")}
        </h2>

        <button type="submit">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;