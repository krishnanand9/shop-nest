import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import MyOrders from "./pages/MyOrder";
import OrderDetails from "./pages/OrderDetail";

import AdminDashboard from "./admin/AdminDashboard";
import ManageProducts from "./admin/ManageProducts";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import ManageUsers from "./admin/ManageUsers";
import ManageOrders from "./admin/ManageOrders";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <main>
        <Routes>
          {/* Public Routes */}

          <Route path="/" element={<Home />} />

          <Route
            path="/products"
            element={<Products />}
          />

          <Route
            path="/products/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          {/* Protected User Routes */}

          <Route element={<ProtectedRoute />}>
            <Route
              path="/checkout"
              element={<Checkout />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />

            <Route
              path="/orders"
              element={<MyOrders />}
            />

            <Route
              path="/orders/:id"
              element={<OrderDetails />}
            />
          </Route>

          {/* Admin Routes */}

          <Route element={<AdminRoute />}>
            <Route
              path="/admin"
              element={<AdminDashboard />}
            />

            <Route
              path="/admin/products"
              element={<ManageProducts />}
            />

            <Route
              path="/admin/products/add"
              element={<AddProduct />}
            />

            <Route
              path="/admin/products/edit/:id"
              element={<EditProduct />}
            />

            <Route
              path="/admin/users"
              element={<ManageUsers />}
            />

            <Route
              path="/admin/orders"
              element={<ManageOrders />}
            />
          </Route>
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
};

export default App;