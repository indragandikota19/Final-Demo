import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditMenu() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [list, setList] = useState({
    name: "",
    price: "",
    description:"",
    category:"",
    images:"",
    
  });

  const { name, price,description,category,images } = list;

  const onInputChange = (e) => {
    setList({ ...list, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/list/${id}`, list);
    navigate("/adminmenu");
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/list/${id}`);
    setList(result.data);
  };

  return (
    <div className="admenu">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Item</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              
              <input
                type={"text"}
                className="form-control3"
                placeholder=" Item name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
                style={{width:"50%", marginLeft:"160px"}}
              />
            </div>
            <div className="mb-3">
              
              <input
                type={"text"}
                className="form-control3"
                placeholder=" price"
                name="price"
                value={price}
                onChange={(e) => onInputChange(e)}
                style={{width:"50%", marginLeft:"160px"}}
              />
            </div>
            
            
            <button type="submit" className="btn btn-outline-primary" style={{marginLeft:"250px"}}>
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/adminmenu">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
