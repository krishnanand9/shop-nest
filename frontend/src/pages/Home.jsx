import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <section className="hero">
        <div>
          <h1>Welcome to ShopNest</h1>

          <p>
            Discover amazing products at great prices.
          </p>

          <Link to="/products" className="hero-button">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="features">
        <div>
          <h3>🚚 Fast Delivery</h3>
          <p>Quick and reliable delivery.</p>
        </div>

        <div>
          <h3>🔒 Secure Payment</h3>
          <p>Your transactions are protected.</p>
        </div>

        <div>
          <h3>⭐ Quality Products</h3>
          <p>Shop products you can trust.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;