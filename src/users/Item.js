import React, { useState } from "react";

function Item({ name, image, onAddToCart }) {
  const [quantity, setQuantity] = useState(0);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="item">
      <img src={image} alt={name} className="item-image" />
      <h3 className="item-name">{name}</h3>
      <div className="item-quantity">
        <button onClick={decreaseQuantity} className="quantity-btn">-</button>
        <span className="quantity-display">{quantity}</span>
        <button onClick={increaseQuantity} className="quantity-btn">+</button>
      </div>
      <button onClick={() => onAddToCart({ name, image, quantity })} className="add-to-cart-btn">
        Add to Cart
      </button>
    </div>
  );
}

export default Item;
