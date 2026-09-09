import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product.stock > 0) {
      addToCart(product);
      alert("Product added to cart!");
    }
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product._id}`}>
        <img
          src={
            product.image ||
            "https://via.placeholder.com/300x200?text=Product"
          }
          alt={product.name}
        />
      </Link>

      <div className="product-info">
        <p className="category">{product.category}</p>

        <Link to={`/products/${product._id}`}>
          <h3>{product.name}</h3>
        </Link>

        <p className="brand">{product.brand}</p>

        <p className="rating">
          ⭐ {product.rating?.toFixed(1) || "0.0"}
        </p>

        <h2>₹{product.price.toLocaleString("en-IN")}</h2>

        {product.stock > 0 ? (
          <button onClick={handleAddToCart}>
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        ) : (
          <button disabled>Out of Stock</button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;