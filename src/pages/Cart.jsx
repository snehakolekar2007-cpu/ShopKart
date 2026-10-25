
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";

function Cart({ cart = [], dispatch }) {
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => {
    const price = Number(String(item.price).replace(/,/g, ""));
    return total + price * item.quantity;
  }, 0);

  // Calculate discount
  let discountPercentage = 0;

  if (subtotal >= 5000) {
    discountPercentage = 25;
  } else if (subtotal >= 3500) {
    discountPercentage = 20;
  } else if (subtotal >= 2000) {
    discountPercentage = 10;
  }

  const discount = (subtotal * discountPercentage) / 100;

  // Calculate shipping
  const shipping = subtotal >= 499 || subtotal === 0 ? 0 : 40;

  // Calculate total
  const totalAmount = subtotal - discount + shipping;

  // Format prices
  const formatPrice = (amount) =>
    amount.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });

  // Calculate total quantity
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="cart-page">
      {cart.length === 0 ? (
        /* Empty Cart */
        <div className="empty-cart-container">
          <div className="empty-cart-box">
            <div className="empty-cart-icon">🛒</div>

            <h1>Your Cart is Empty</h1>

            <p>
              Add some products to your cart to continue shopping.
            </p>

            <Link to="/products" className="empty-cart-btn">
              Continue Shopping <span>→</span>
            </Link>
          </div>
        </div>
      ) : (
        /* Cart with Products */
        <>
          <div className="cart-container">
            {/* Cart Table */}
            <div className="cart-table-wrapper">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>PRODUCT</th>
                    <th>PRICE</th>
                    <th>QUANTITY</th>
                    <th>TOTAL</th>
                    <th>ACTION</th>
                  </tr>
                </thead>

                <tbody>
                  {cart.map((item) => {
                    const price = Number(
                      String(item.price).replace(/,/g, "")
                    );

                    return (
                      <tr className="cart-item-row" key={item.id}>
                        <td>
                          <div className="cart-product">
                            <div className="cart-product-image">
                              <img src={item.image} alt={item.name} />
                            </div>

                            <div className="cart-product-info">
                              <h3>{item.name}</h3>
                              <p className="cart-category">
                                {item.category}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="cart-price">
                            <strong>₹{formatPrice(price)}</strong>

                            {item.originalPrice && (
                              <span className="original-price">
                                ₹
                                {formatPrice(
                                  Number(
                                    String(item.originalPrice).replace(
                                      /,/g,
                                      ""
                                    )
                                  )
                                )}
                              </span>
                            )}
                          </div>
                        </td>

                        <td>
                          <div className="quantity-control">
                            <button
                              type="button"
                              onClick={() =>
                                dispatch({
                                  type: "DECREASE_QUANTITY",
                                  payload: item.id,
                                })
                              }
                            >
                              −
                            </button>

                            <span>{item.quantity}</span>

                            <button
                              type="button"
                              onClick={() =>
                                dispatch({
                                  type: "INCREASE_QUANTITY",
                                  payload: item.id,
                                })
                              }
                            >
                              +
                            </button>
                          </div>
                        </td>

                        <td>
                          <strong className="item-total">
                            ₹{formatPrice(price * item.quantity)}
                          </strong>
                        </td>

                        <td>
                          <button
                            type="button"
                            className="delete-btn"
                            onClick={() =>
                              dispatch({
                                type: "REMOVE_ITEM",
                                payload: item.id,
                              })
                            }
                          >
                            <img
                              src="/icons/delete-icon.png"
                              alt="Delete"
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Clear Cart */}
              <div className="cart-footer">
                <button
                  type="button"
                  className="clear-cart-btn"
                  onClick={() => dispatch({ type: "CLEAR_CART" })}
                >
                  <img src="/icons/clear-cart.png" alt="" />
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <aside className="cart-sidebar">
              <div className="order-summary">
                <h2>Order Summary</h2>

                <div className="summary-row">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₹{formatPrice(subtotal)}</span>
                </div>

                <div className="summary-row discount-row">
                  <span>Discount ({discountPercentage}%)</span>
                  <span>−₹{formatPrice(discount)}</span>
                </div>

                <div className="summary-row">
                  <span>Shipping</span>
                  <span className="free-shipping">
                    {shipping === 0 ? "FREE" : `₹${formatPrice(shipping)}`}
                  </span>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-total">
                  <span>Total Amount</span>
                  <strong>₹{formatPrice(totalAmount)}</strong>
                </div>

                <p className="saved-message">
                  You saved ₹{formatPrice(discount)} on this order
                </p>

                <button
                  type="button"
                  className="checkout-btn"
                  onClick={() => setOrderPlaced(true)}
                >
                  Proceed to Checkout <span>→</span>
                </button>

                <button type="button" className="coupon-btn">
                  <img src="/icons/coupon.png" alt="" />
                  Apply Coupon
                </button>
              </div>

              {/* Secure Payment */}
              <div className="secure-box">
                <img
                  src="/icons/security-icon.png"
                  alt=""
                  className="secure-icon"
                />

                <div>
                  <h3>Safe &amp; Secure Payments</h3>
                  <p>
                    100% secure payments. Easy returns.
                    Your data is protected.
                  </p>
                </div>
              </div>
            </aside>
          </div>

          {/* Continue Shopping */}
          <div className="cart-navigation">
            <Link to="/products" className="continue-shopping">
              ← Continue Shopping
            </Link>
          </div>
        </>
      )}

      {/* Order Success Popup */}
      {orderPlaced && (
        <div className="order-popup-overlay">
          <div className="order-popup">
            <div className="success-icon">✓</div>

            <h2>Order Placed Successfully!</h2>

            <p>Your order has been placed successfully.</p>

            <button
              type="button"
              className="popup-ok-btn"
              onClick={() => {
                setOrderPlaced(false);
                dispatch({ type: "CLEAR_CART" });
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
