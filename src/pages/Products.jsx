
import { useState } from "react";

import "./Products.css";

function Products({ dispatch }) {
  // 1. Filter States
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [selectedRating, setSelectedRating] = useState(0);
  const [availability, setAvailability] = useState("");

  // 2. Products Array
  const products = [
    {
      id: 1,
      name: "Samsung Galaxy M14",
      category: "Electronics",
      price: "12,499",
      originalPrice: "14,999",
      rating: 4.4,
      reviews: 1850,
      discount: "17%",
      isAvailable: true,
      image: "/ShopKart/images/products/Samsung_phone.png",
    },
    {
      id: 2,
      name: "boAt Rockerz 450",
      category: "Electronics",
      price: "1,499",
      originalPrice: "2,999",
      rating: 4.5,
      reviews: 1200,
      discount: "50%",
      isAvailable: true,
      image: "/ShopKart/images/products/headphones.png",
    },
    {
      id: 3,
      name: "Red Tape Sneakers",
      category: "Fashion",
      price: "1,999",
      originalPrice: "3,999",
      rating: 4.2,
      reviews: 850,
      discount: "50%",
      isAvailable: true,
      image: "/ShopKart/images/products/sneakers.png",
    },
    {
      id: 4,
      name: "Levi's Jeans",
      category: "Fashion",
      price: "1,799",
      originalPrice: "2,499",
      rating: 3.8,
      reviews: 650,
      discount: "28%",
      isAvailable: false,
      image: "/ShopKart/images/products/jeans.png",
    },

    {
      id: 5,
      name: "Luxurious lamp",
      category: "Home & Kitchen",
      price: "5,799",
      originalPrice: "12,499",
      rating: 4.8,
      reviews: 1150,
      discount: "78%",
      isAvailable: false,
      image: "/ShopKart/images/products/lamp.png",
    },

    {
      id: 7,
      name: "Lipstick Set",
      category: "Beauty",
      price: "800",
      originalPrice: "1200",
      rating: 4.2,
      reviews: 650,
      discount: "35%",
      isAvailable: false,
      image: "/ShopKart/images/products/lipstick-set.png",
    },
    {
      id: 8,
      name: "Noise Watch",
      category: "Electronics",
      price: "2,599",
      originalPrice: "4,299",
      rating: 3.8,
      reviews: 650,
      discount: "345%",
      isAvailable: false,
      image: "/ShopKart/images/products/noisefit.png",
    },
    {
      id: 9,
      name: "Skincare Set",
      category: "Beauty",
      price: "3,499",
      originalPrice: "5,499",
      rating: 3.8,
      reviews: 650,
      discount: "45%",
      isAvailable: false,
      image: "/ShopKart/images/products/skincare-combo.png",
    },
    {
      id: 10,
      name: "Non-stick Pan",
      category: "Home & Kitchen",
      price: "799",
      originalPrice: "1,499",
      rating: 3.8,
      reviews: 650,
      discount: "65%",
      isAvailable: false,
      image: "/ShopKart/images/products/nonstick-pan.png",
    },

  ];

  // 3. Category Filter Function
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  // 4. Price Filter Function
  const handlePriceChange = (e) => {
    setMaxPrice(Number(e.target.value));
  };

  // 5. Rating Filter Function
  const handleRatingChange = (rating) => {
    setSelectedRating((prev) => (prev === rating ? 0 : rating));
  };

  // 6. Availability Filter Function
  const handleAvailabilityChange = (value) => {
    setAvailability((prev) => (prev === value ? "" : value));
  };

  // 7. Filter Products
  const filteredProducts = products.filter((product) => {
    const price = Number(product.price.replace(/,/g, ""));

    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    const priceMatch = price <= maxPrice;

    const ratingMatch = product.rating >= selectedRating;

    const availabilityMatch =
      availability === "" ||
      (availability === "inStock" && product.isAvailable) ||
      (availability === "outOfStock" && !product.isAvailable);

    return (
      categoryMatch &&
      priceMatch &&
      ratingMatch &&
      availabilityMatch
    );
  });

  // 8. Clear All Filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setMaxPrice(20000);
    setSelectedRating(0);
    setAvailability("");
  };

  // 9. Page UI
  return (
    <>


      <section className="products-banner">
        <div className="banner-content">
          <h1>
            All <span>Products</span>
          </h1>
          <p>Explore our wide range of top quality products</p>
        </div>
      </section>

      <section className="products-content">
        <aside className="filter-sidebar">
          {/* Category Filter */}
          <div className="filter-group">
            <h4>Categories</h4>

            {[
              "Electronics",
              "Fashion",
              "Home & Kitchen",
              "Beauty",
              "Sports",
              "Books",
            ].map((category) => (
              <label key={category} className="d-block">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />{" "}
                {category}
              </label>
            ))}
          </div>

          {/* Price Filter */}
          <div className="filter-group">
            <h4>Price Range</h4>

            <input
              type="range"
              min="199"
              max="20000"
              value={maxPrice}
              onChange={handlePriceChange}
            />

            <div className="price-range">
              <span>₹199</span>
              <span>₹{maxPrice.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="filter-group">
            <h4>Ratings</h4>

            {[5, 4, 3].map((rating) => (
              <label key={rating} className="d-block">
                <input
                  type="checkbox"
                  checked={selectedRating === rating}
                  onChange={() => handleRatingChange(rating)}
                />{" "}
                {"⭐".repeat(rating)}
                {"☆".repeat(5 - rating)} & above
              </label>
            ))}
          </div>

          {/* Availability Filter */}
          <div className="filter-group">
            <h4>Availability</h4>

            <label className="d-block">
              <input
                type="checkbox"
                checked={availability === "inStock"}
                onChange={() => handleAvailabilityChange("inStock")}
              />{" "}
              In Stock
            </label>

            <label className="d-block">
              <input
                type="checkbox"
                checked={availability === "outOfStock"}
                onChange={() => handleAvailabilityChange("outOfStock")}
              />{" "}
              Out of Stock
            </label>
          </div>

          {/* Clear Filters */}
          <div className="filter-title">
            <h3>FILTERS</h3>
            <button type="button" onClick={clearFilters}>
              Clear All
            </button>
          </div>
        </aside>

        {/* Products Section */}
        <div className="products-area">
          <div className="products-header">
            <p>
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>

          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div className="product-card" key={product.id}>
                  <div className="product-image">
                    {product.discount && (
                      <span className="discount-badge">
                        -{product.discount}
                      </span>
                    )}

                    <img src={product.image} alt={product.name} />
                  </div>

                  <p>{product.category}</p>
                  <h3>{product.name}</h3>

                  <div className="product-rating">
                    ⭐ {product.rating} ({product.reviews} reviews)
                  </div>

                  <div className="product-prices">
                    <strong>₹{product.price}</strong>{" "}
                    <del>₹{product.originalPrice}</del>
                  </div>

                  <p>
                    {product.isAvailable ? "In Stock" : "Out of Stock"}
                  </p>


                  <button
                    className="add-cart-button"
                    onClick={() => {
                      dispatch({
                        type: "ADD_ITEM",
                        payload: product,
                      });
                    }}
                  >
                    🛒 Add to Cart
                  </button>

                </div>
              ))
            ) : (
              <div className="no-products">
                <h3>No Products Found!</h3>
                <p>Try changing your filters.</p>
                <button type="button" onClick={clearFilters}>
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Products;
