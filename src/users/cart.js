
import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import"./Styles.css";
import { Hidden } from "@mui/material";

function Cart() {
  const [lists, setLists] = useState([]);
  const [cart, setCart] = useState([]);
  const [selects, setSelects] = useState();
  const [quantities, setQuantities] = useState([]);
  
  let navigate = useNavigate();

  useEffect(() => {
    loadLists();
  }, []);

  const loadLists = async () => {
    const result = await axios.get("http://localhost:8080/addres");
    setLists(result.data); 
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:8080/address/${id}`);
    loadLists();
  };

  const removeItem = async (id) => {
    await axios.delete(`http://localhost:8080/history/${id}`);
    loadList();
  };

  useEffect(() => {
    loadList();
  }, []);

  const loadList = async () => {
    const result = await axios.get("http://localhost:8080/history");
    setCart(result.data); 
  };

  useEffect(() => {
    setQuantities(Array(cart.length).fill(1));
  }, [cart]);

  const updateQuantity = (index, quantity) => {
    const newQuantities = [...quantities];
    newQuantities[index] = quantity;
    setQuantities(newQuantities);
  };

  const getTotalAmount = (item) => {
    const index = cart.indexOf(item);
    const quantity = quantities[index];
    return item.price * quantity;
  };

  const getTotalPrice = () => {
    let total = 50;
    cart.forEach((item, index) => {
      total += item.price * quantities[index];
    });
    return total;
  };

  const getTotalShipping = () => {
    let charge = 50;
    return charge;
  };

  const onClick = async (e) => {
    Swal.fire({
      title: 'Click OK to confirm order',
      text: "",
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

  return (
    <div className="mt-0 pt-2">
      <div className="row"> 
        <div className="col-md-3">
          <a style={{marginLeft:"250px",marginTop:"20px"}} href="/menu" className="btn btn-success">Back</a>
        </div>
        <div className="col-md-3">
          <a style={{marginLeft:"650px",marginTop:"20px"}} href="/address" className="btn btn-success">Address</a>
        </div>
      </div>  
      <table className="table table-striped table-light mt-5"style={{marginLeft:"500px", borderStyle:"hidden"}}>
        
        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td><img src={item.images} style={{ height: "100px", width:"100px" }} alt="menu item" /></td>
              <td>{item.name}</td>
              <td>Rs.{item.price}</td>
              <td>
                <input type="number" value={quantities[index]} min="1" max="15" onChange={(e) => updateQuantity(index, e.target.value)} />
              </td>
              <td>Rs.{getTotalAmount(item)}</td>
              <td>
                <button className="btn btn-warning" onClick={() => removeItem(item.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
        
          
            <p style={{borderTop:"hidden",marginBottom:"5px",marginTop:"30px"}}>
              GST and restaurant charges: Rs.{getTotalShipping()}
            </p>
            
          
          
            <p style={{borderTop:"hidden",marginBottom:"0px",fontSize:"25px",color:"indigo"}}>
              Grand Total: Rs.{getTotalPrice()}
            </p>
            
          
      </table>
      <hr style={{width:"350px",marginLeft:"500px"}}></hr>
      <div className="col-md-3" style={{marginLeft:"500px"}}>
        
        <h4 style={{marginBottom:"15px"}}className="pay">PAY USING</h4>
        <select value={selects} onChange={e => setSelects(e.target.value)} id="select">
          <option>Choose Payment</option>
          <option>Cash on Delivery</option>
        </select>
        <br></br>

        <button style={{marginTop:"15px",backgroundColor:"green"}}onClick={onClick} className="btn btn-danger">Place Order ₹{getTotalPrice()}</button>
      </div>
      <table className="table mt-5">
        
        <tbody>
          {lists.map((list, index) => (
            <tr key={index}>
              <td style={{ gap: "50px" }}>📍 {list.name}, {list.address}, {list.phone}, {list.pincode}</td>
              <td>
                <Link className="btn btn-outline-primary mx-2" to={`/editaddress/${list.id}`}>✎</Link>
                <button className="btn btn-danger mx-2" onClick={() => deleteItem(list.id)}>✖</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Cart;
