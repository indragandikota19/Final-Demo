import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddMenu() {
  let navigate = useNavigate();

  const [list, setList] = useState({
    address: "",
    name: "",
    phone: "",
    pincode: "",
  });

  const { address, phone, name, pincode } = list;

  const onInputChange = (e) => {
    setList({ ...list, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/address", list);
      window.alert("");
      navigate("/cart");
    } catch (error) {
      console.error("There was an error submitting the address!", error);
      window.alert("Your address has been submitted successfully");
    }
  };

  const onCancel = () => {
    setList({
      address: "",
      name: "",
      phone: "",
      pincode: "",
    });
  };

  return (
    <div className="address">
      <div className="row">
        <div className="col-md-6 offset-md-3 ">
          <h2 className="text-center m-4">Address</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              
              <input
                type="text"
                className="form-control1"
                placeholder="Enter your address"
                name="address"
                value={address}
                onChange={onInputChange}
                required
                style={{width:"50%", marginLeft:"160px"}}
              />
            </div>

            <div className="mb-3">
              
              <input
                type="text"
                className="form-control1"
                placeholder="Enter your name"
                name="name"
                value={name}
                onChange={onInputChange}
                required
                style={{width:"50%", marginLeft:"160px"}}
              />
            </div>
            <div className="mb-3">
              
              <input
                type="text"
                className="form-control1"
                placeholder="Enter your number"
                name="phone"
                value={phone}
                onChange={onInputChange}
                required
                style={{width:"50%", marginLeft:"160px"}}
              />
            </div>

            <div className="mb-3">
              
              <input
                type="text"
                className="form-control1"
                placeholder="Enter your pincode"
                name="pincode"
                value={pincode}
                onChange={onInputChange}
                required
                style={{width:"50%", marginLeft:"160px"}}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary" style={{marginLeft:"250px"}}>
              Submit
            </button>
            <button type="button" className="btn btn-outline-danger mx-2" onClick={onCancel}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
