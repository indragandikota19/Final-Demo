import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddMenu() {
  let navigate = useNavigate();

  const [list, setList] = useState({
    name: "",
    price: "",
  });

  const { name, price } = list;

  const onInputChange = (e) => {
    setList({ ...list, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/list", list);
    alert("product added");
    navigate("/adminmenu");
  };

  return (
    <div className="admenu">
      <div className="row">
        <div className="col-md-6 offset-md-3 border ">
          <h2 className="text-center m-4" id="large">Add Item</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              
              <input
                type={"text"}
                className="form-control2"
                placeholder=" name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
                style={{width:"50%", marginLeft:"160px"}}
              />
            </div>
            <div className="mb-3">
              
              <input
                type={"text"}
                className="form-control2"
                placeholder=" price"
                name="price"
                value={price}
                onChange={(e) => onInputChange(e)}
                style={{width:"50%", marginLeft:"160px"}}
              />
            </div>
            
            
           
            <button type="submit" className="btn btn-outline-primary" style={{marginLeft:"240px"}}>
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/dashboard">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
