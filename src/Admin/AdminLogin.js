import React from 'react';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom';

import"./Login.css";
const AdminLogin=() =>{
    const navigate=useNavigate();
    const [username,setusername]=useState("");
    const [password,setpassword]=useState("");
    const [authenticated,setauthenticated]=useState(
        localStorage.getItem(localStorage.getItem("authenticated") || false)
    );
    const users=[{username:"admin@gmail.com",password:"Admin@123"}];
    const handleSubmit=(e) =>{
        e.preventDefault();
        const account=users.find((user) => user.username ===username);
        if(account && account.password=== password){
            localStorage.setItem("authenticated",true);
            
            navigate("/dashboard");
        }
        else{
            alert("INVALID User Name AND Password");
        }
    };

    return(
      
        <div className='adlogin'>
 <div id="backgroundimage" style={{}}></div>
<div class="box1" style={{}}>
            <form onSubmit={handleSubmit}>

            <div class="">
              <h2 id='admin'>ADMIN LOGIN</h2>
         
              </div>

              <div class="row">
             <div class="col-sm-6">

              <div class="form-group">
          <label className='user'>User Name</label>
          <input type="text"  class="form-control ml-5" id="username1" placeholder="Enter Name"
          
          value={username}
          onChange={(event) => {
            setusername(event.target.value);
          }}
          
          />

        </div>

        <div class="form-group">
            <label className='user'>Password</label>
            <input type="password"  class="form-control" id="password1" placeholder="Enter Password"
            
            value={password}
            onChange={(event) => {
              setpassword(event.target.value);
            }}
            
            />
          </div>
          <br></br>

          <button type="submit" class="btn btn-primary" value="Submit" >Login</button>
            
          </div>
            </div>
            </form>
            
        </div>
       
        </div>
    );
}
export default AdminLogin;