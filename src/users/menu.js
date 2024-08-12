import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Styles.css";

function Menu() {
  const [userData, setUserData] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      const reqData = await fetch("http://localhost:8080/lists");
      const resData = await reqData.json();

      setUserData(resData);

      const initialQuantities = {};
      resData.forEach(item => {
        initialQuantities[item.id] = 1;
      });
      setQuantities(initialQuantities);
    }
    getUserData();
  }, []);

  const handleQuantityChange = (id, delta) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [id]: Math.max(1, (prevQuantities[id] || 1) + delta)
    }));
  };

  const addToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = existingCart.findIndex(cartItem => cartItem.id === item.id);

    if (itemIndex > -1) {
      alert('Product already in the cart');
      return;
    }

    const updatedCart = [...existingCart, { ...item, quantity: quantities[item.id] }];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert('Product added to the cart');
  };

  return (
    <div className="menu-container">
      <div className="view-cart-container">
        <Link
          className="btn btn-outline-primary mx-4 mt-2"
          to={`/cart`}
        >
          View Cart
        </Link>
      </div>
      <div className="food-items-container">
        {userData.map(item => (
          <div key={item.id} className="food-item">
            <h5>{item.name}</h5>
            <p>{item.description}</p>
            <div className="quantity-controls">
              <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
              <span>{quantities[item.id]}</span>
              <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
            </div>
            <button onClick={() => addToCart(item)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
