import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Loader from "../components/Loader";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/products/${id}`);
        setProduct(response.data.product);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return <h2>Product not found</h2>;
  }

  const addProduct = () => {
    addToCart(product, quantity);
    alert("Product added to cart!");
  };

  return (
    <div className="product-details">
      <img
        src={
          product.image ||
          "https://via.placeholder.com/500x400?text=Product"
        }
        alt={product.name}
      />

      <div>
        <p>{product.category}</p>

        <h1>{product.name}</h1>

        <p>{product.description}</p>

        <h2>₹{product.price.toLocaleString("en-IN")}</h2>

        <p>⭐ {product.rating?.toFixed(1) || "0.0"}</p>

        <p>
          Stock: {product.stock}
        </p>

        {product.stock > 0 && (
          <>
            <div className="quantity">
              <button
                onClick={() =>
                  setQuantity((q) => Math.max(1, q - 1))
                }
              >
                -
              </button>

              <span>{quantity}</span>

              <button
                onClick={() =>
                  setQuantity((q) =>
                    Math.min(product.stock, q + 1)
                  )
                }
              >
                +
              </button>
            </div>

            <button onClick={addProduct}>
              Add to Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;