import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Styles.css";  // Ensure this import points to your CSS file

function Menu() {
  const [userData, setUserData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      const reqData = await fetch("http://localhost:8080/lists");
      const resData = await reqData.json();

      setUserData(resData);
      setFilterData(resData);
    }
    getUserData();
  }, []);

  const handleSearch = (event) => {
    const getSearch = event.target.value;
    if (getSearch.length > 0) {
      const searchData = filterData.filter((item) => item.name.toLowerCase().includes(getSearch.toLowerCase()));
      setUserData(searchData);
    } else {
      setUserData(filterData);
    }
    setQuery(getSearch);
  }

  const addToCart = async (item) => {
    try {
      const cartResponse = await fetch('http://localhost:8080/history');
      if (!cartResponse.ok) {
        throw new Error('Failed to fetch cart data');
      }
      const cartItems = await cartResponse.json();
      const existingItem = cartItems.find((cartItem) => cartItem.name === item.name);

      if (existingItem) {
        alert('Product already in the cart');
        return;
      }
      const response = await fetch('http://localhost:8080/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      if (response.ok) {
        alert('Product added to the cart');
      } else {
        console.error('Failed to add product to the cart:', response.statusText);
        alert('Failed to add product to the cart');
      }
    } catch (error) {
      console.error('Error adding product to the cart:', error);
      alert('Error adding product to the cart');
    }
  };

  return (
    <div className="menu-container">
      <div className="row">
        <div className="col-md-3" style={{ marginLeft: "450px", marginTop: "50px", marginBottom: "0px", padding: "150px", paddingRight: "250px", backgroundColor: "#cedfef" }}>
          <Link
            className="btn btn-outline-primary mx-4 mt-2"
            to={`/cart`}
          >
            View Cart
          </Link>
          
        </div>
      </div>
      
      
        
      
    </div>
  );
}

export default Menu;
