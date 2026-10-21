
import React from "react";
import Navbar from "../components/Navbar";
import "./Home.css";

function Home() {

 const products = [
  {
    id: 1,
    name: "boAt Rockerz 450",
    category: "Electronics",
    price: 1599,
    rating: 4.5,
    reviews: 1200,
    image: "/images/products/headphones.png"
  },
  {
    id: 2,
    name: "Noise ColorFit Pro 4",
    category: "Electronics",
    price: 2999,
    rating: 4.6,
    reviews: 2300,
    image: "/images/products/noisefit.png"
  },
  {
    id: 3,
    name: "Red Tape Sneakers",
    category: "Fashion",
    price: 2099,
    rating: 4.5,
    reviews: 890,
    image: "/images/products/sneakers.png"
  },
  {
    id: 4,
    name: "Levi's Jeans",
    category: "Fashion",
    price: 2099,
    rating: 4.5,
    reviews: 890,
    image: "/images/products/jeans.png"
  }
];
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Good Choices. <br />
            <span>Great Prices.</span>
          </h1>

          <p>
            Everything you need, <br />
            delivered to your door.
          </p>

          <div className="hero-buttons">
            <button className="shop-btn">
              Shop Now →
            </button>
          </div>
        </div>
      </section>

      {/* Shop By Category */}
      <section className="category-section">
        <div className="section-heading">
          <h2>Shop by Category</h2>

          <a href="#">View All Categories →</a>
        </div>


        <div className="category-list">
          <div className="category-card electronics">
            <img src="/images/category-electronics.png" alt="Electronics" />
            <h3>Electronics</h3>
            <p>1200+ Products</p>
          </div>


          <div className="category-card fashion">
            <img src="/images/category-fashion.png" alt="Fashion" />
            <h3>Fashion</h3>
            <p>1800+ Products</p>
          </div>
          <div className="category-card home-kitchen">
            <img src="/images/category-home.png" alt="Home & Kitchen" />
            <h3>Home & Kitchen</h3>
            <p>950+ Products</p>
          </div>

          <div className="category-card beauty">
            <img src="/images/category-beauty.png" alt="Beauty & Personal Care" />
            <h3>Beauty & Personal Care</h3>
            <p>750+ Products</p>
          </div>

          <div className="category-card sports">
            <img src="/images/category-fitness.png" alt="Sports & Fitness" />
            <h3>Sports & Fitness</h3>
            <p>600+ Products</p>
          </div>
          <div className="category-card books">
            <img src="/images/category-books.png" alt="Books & Stationery" />
            <h3>Books & Stationery</h3>
            <p>500+ Products</p>
          </div>
        </div>
      </section>



      {/* Trending Products */}
<section className="products-section" id="trending">
  <div className="section-heading">
    
    <div className="trending-heading">
      <h2 className="trending-title">
        <span className="trending-icon">
          <img src="/icons/trending.png" alt="Trending" />
        </span>

        <span> Trending <strong>Now</strong> </span>
      </h2>

      <div className="trending-accent"></div>

      <p className="trending-subtitle">
        Most popular choices this week
      </p>
    </div>

    <a href="/products" className="view-products"> View All Products <span>→</span> </a>
  </div>

 <div className="product-grid">
    {products.map((product) => (
      <div className="product-card" key={product.id}>
        
        <div className="product-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className="product-details">
          
          <div className="product-meta">
            <span className="product-category">
              {product.category}
            </span>

            <span className="product-rating">
              ⭐ {product.rating} ({product.reviews})
            </span>
          </div>

          <h3>{product.name}</h3>

          <div className="product-price">
            ₹{product.price}
          </div>

          <div className="product-actions">
            <button className="buy-now-button"> Buy Now </button>
19
 <button className="cart-button">
              <img
                src="/icons/product-cart.png"
                alt="Cart"
              />
            </button>
          </div>

        </div>

      </div>

    )
)

}
  </div>

</section>
    </>
  );
}

export default Home;
