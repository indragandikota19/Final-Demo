import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './final.css';

const Last = () => {
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    const storedValue = localStorage.getItem('selectedValue'); // Retrieve the selected value from localStorage
    if (storedValue) {
      setSelectedValue(storedValue);
    }
  }, []);

  let navigate = useNavigate();

  const onClick = async (e) => {
    navigate("/rate");
  };

  return (
    <div className="last">
      <img src='https://media.tenor.com/PYQdx807FXAAAAAC/sucess-transparent.gif' alt="Order Successful" />
      <h5 id="od">Order Placed Successfully.....</h5>
      <button onClick={onClick} id="feed">FeedBack</button>
      <div id="status">
        <h2>Status of food:</h2>
        <h5>{selectedValue}</h5>
      </div>
    </div>
  );
};

export default Last;
