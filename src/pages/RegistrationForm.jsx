import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
import axios from "axios";
import "./Registration.css";

export default function RegistrationForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSave = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      phone: phone,
      email: email,
      password: password,
    };

    const validationErrors = validate(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      alert(Object.values(validationErrors).join("\n"));
      return;
    }

    const url = `http://localhost:8080/register`;
    axios
      .post(url, data)
      .then((result) => {
        clear();
        alert("Successfully registered");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clear = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
  };

  function validate(data) {
    let errors = {};

    if (!data.name.trim()) {
      errors.name = "Name is required";
    }

    if (!data.phone) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(data.phone)) {
      errors.phone = "Phone number must be 10 digits";
    }

    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email) || !data.email.endsWith(".com")) {
      errors.email = "Email is invalid (must contain '@' and end with '.com')";
    }

    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(data.password)) {
      errors.password = "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(data.password)) {
      errors.password = "Password must contain at least one lowercase letter";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.password)) {
      errors.password = "Password must contain at least one symbol";
    }

    if (data.password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  }

  return (
    <Fragment>
      <div className="registers bubble-background align-right" style={{ padding: "20px", background: `url("register.jpg")`, margin: "0", border: "transparent" }}>
        <div className="header" style={{ width: "530px" }}>
          <h1 className="register">Register</h1>
        </div>
        <div className="form">
          <section className="vh-90" style={{ padding: "7px" }}>
            <div className="containerss">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-lg-12 col-xl-11">
                  <div className="card text-blue" style={{ border: "none", background: "transparent" }}>
                    <div className="card-body p-md-5">
                      <div className="row justify-content-end">
                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                          <form className="mx-1 mx-md-4">
                            <div className="d-flex flex-row align-items-center mb-4">
                              <FaUser className="fa-lg me-3" />
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="text"
                                  id="form3Example1c"
                                  className="form-controls"
                                  onChange={(e) => setName(e.target.value)}
                                  value={name}
                                  placeholder="Name"
                                />
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center mb-4">
                              <FaPhone className="fa-lg me-3" />
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="text"
                                  id="form3Example2c"
                                  className="form-controls"
                                  onChange={(e) => setPhone(e.target.value)}
                                  value={phone}
                                  placeholder="Phone"
                                />
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center mb-4">
                              <FaEnvelope className="fa-lg me-3" />
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="email"
                                  id="form3Example3c"
                                  className="form-controls"
                                  onChange={(e) => setEmail(e.target.value)}
                                  value={email}
                                  placeholder="Email"
                                />
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center mb-4">
                              <FaLock className="fa-lg me-3" />
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="password"
                                  id="form3Example4c"
                                  className="form-controls"
                                  onChange={(e) => setPassword(e.target.value)}
                                  value={password}
                                  placeholder="Password"
                                />
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center mb-4">
                              <FaLock className="fa-lg me-3" />
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="password"
                                  id="form3Example5c"
                                  className="form-controls"
                                  onChange={(e) => setConfirmPassword(e.target.value)}
                                  value={confirmPassword}
                                  placeholder="Confirm Password"
                                />
                              </div>
                            </div>
                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                              <button
                                type="button"
                                className="btn btn-primary1 btn-lg"
                                onClick={(e) => handleSave(e)}
                              >
                                Register
                              </button>
                              &nbsp;
                              <Link
                                to="/logins"
                                className="btn btn-info btn-lg btn-block"
                              >
                                Login
                              </Link>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Fragment>
  );
}
