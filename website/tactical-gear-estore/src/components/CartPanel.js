// src/components/CartPanel.js

import React, { useContext } from 'react';
import './CartPanel.css';
import { CartContext } from './CartContext';

function CartPanel() {
  const { cart, removeFromCart, showCart, setShowCart } = useContext(CartContext);

  // Close the cart
  const handleCloseCart = () => {
    setShowCart(false);
  };

  // Example checkout function
  const handleCheckout = () => {
    alert('Proceeding to checkout...');
  };

  // Calculate total
  // If your prices are numeric, simply sum them:
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  // If your item.price is a string like "$150", then parse it:
  // const total = cart.reduce((acc, item) => {
  //   const numericPrice = parseFloat(item.price.replace('$', '')) || 0;
  //   return acc + numericPrice;
  // }, 0);

  return (
    <div className={`cart-panel ${showCart ? 'open' : ''}`}>
      <div className="cart-header">
        <h3>Your Cart</h3>
        <button className="close-btn" onClick={handleCloseCart}>X</button>
      </div>

      <div className="cart-items">
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          cart.map((item, index) => (
            <div key={index} className="cart-item">
              <p>
                {item.name} — ${item.price}
              </p>
              <button
                className="remove-item-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-footer">
          {/* Display total here */}
          <p className="cart-total">Total: ${total.toLocaleString()}</p>
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default CartPanel;
