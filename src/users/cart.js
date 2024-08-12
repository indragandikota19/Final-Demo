import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Styles.css";

function Cart() {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    const loadCart = () => {
      const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCart(savedCart);

      // Initialize quantities based on saved cart
      const initialQuantities = savedCart.map(item => item.quantity || 1);
      setQuantities(initialQuantities);
    };

    loadCart();
  }, []);

  const updateQuantity = (index, quantity) => {
    const newQuantities = [...quantities];
    newQuantities[index] = quantity;
    setQuantities(newQuantities);
  };

  const getSubtotalAmount = () => {
    return cart.reduce((total, item, index) => total + (item.price * quantities[index]), 0);
  };

  const getGSTAmount = (subtotal) => {
    const gstPercentage = 10; // GST percentage changed to 10%
    return (subtotal * gstPercentage) / 100;
  };

  const getTotalPrice = () => {
    const subtotal = getSubtotalAmount();
    const gstAmount = getGSTAmount(subtotal);
    const shippingCharge = 50; // Initial shipping charge or base amount
    return subtotal + gstAmount + shippingCharge;
  };

  const onClick = async (e) => {
    Swal.fire({
      title: 'Click OK to confirm order',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/final");
      }
    });
  };

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const subtotal = getSubtotalAmount();
  const gstAmount = getGSTAmount(subtotal);
  const shippingCharge = 50;
  const totalPrice = subtotal + gstAmount + shippingCharge;

  return (
    <div className="cart-container">
      <div className="row">
        <div className="col-md-3">
          <p>Want to add more items?</p>
          <a style={{ marginTop: "20px" }} href="/menu" className="btn btn-back">Back</a>
        </div>
        <div className="col-md-3">
          <a style={{ marginTop: "20px" }} href="/address" className="btn btn-address">Address</a>
        </div>
      </div>

      

      <table className="table mt-5" style={{width:"800px", marginLeft:"50px"}}>
        <thead>
          <tr style={{color:"blue"}}>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={item.id}>
              <td><b>{item.name}</b></td>
              <td>
                <input
                  type="number"
                  value={quantities[index]}
                  min="1"
                  onChange={(e) => updateQuantity(index, Number(e.target.value))}
                />
              </td>
              <td><b>₹{item.price * quantities[index]}</b></td>
              <td>
                <button className="btn btn-danger mx-2" onClick={() => removeItem(index)} style={{padding:"1px", paddingLeft:"5px", paddingRight:"5px"}}>✖</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="content-wrapper">
        <div className="pricing-details">
          <h4 className="pay" style={{color:"blue"}}><b>PRICE DETAILS</b></h4>
          <p className="para">Subtotal: ₹{subtotal}</p>
          <p className="para">GST (10%): ₹{gstAmount.toFixed(2)}</p>
          <p className="para">Shipping Charge: ₹{shippingCharge}</p>
          <hr style={{width:"300px", border: "none",
            height: "3px", 
            backgroundColor: "black"}}/>
          <h4><b>Total Price: ₹{totalPrice.toFixed(2)}</b></h4>
        </div>

        <div className="payment-section">
          <h4 className="pay" style={{color:"blue"}}><b>PAY USING</b></h4>
          <select id="select">
            <option>Cash on Delivery</option>
            <option>UPI ID</option>
            <option>Debit Card</option>
            <option>Credit Card</option>
          </select>
          <br />
          <button style={{ marginTop: "15px", backgroundColor: "green", padding:"10px"}} onClick={onClick} className="btn btn-danger">
            Place Order ₹{totalPrice.toFixed(2)}
          </button>
        </div>
      </div>

    </div>
  );
}

export default Cart;
