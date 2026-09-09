import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products");
      setProducts(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) {
      return;
    }

    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  return (
    <div className="page-container">
      <h1>Manage Products</h1>

      <Link to="/admin/products/add">
        Add Product
      </Link>

      <div className="admin-table">
        {products.map((product) => (
          <div key={product._id} className="admin-row">
            <span>{product.name}</span>

            <span>
              ₹{product.price.toLocaleString("en-IN")}
            </span>

            <span>
              Stock: {product.stock}
            </span>

            <Link
              to={`/admin/products/edit/${product._id}`}
            >
              Edit
            </Link>

            <button
              onClick={() =>
                deleteProduct(product._id)
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProducts;