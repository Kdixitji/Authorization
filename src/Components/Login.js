import React, { useState } from "react";
import "./LoginStyles.css";
import { BsPersonLinesFill, BsPersonFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const form = {
      username: data.get("username"),
      password: data.get("password"),
    };
    //sending data for login
    const res = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
      },
    });

    const { token } = await res.json();

    if (res.ok) {
      Cookie.set("token", token);
      navigate("/");
      toast.success("Logged in Successfully");
    } else {
      toast.error("Login failed, Please check your credentials  ");
    }
  };
  const [activeTab, setActiveTab] = useState("login");

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container">
      <h3>Choose an option to login</h3>
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "login" ? "active" : ""}`}
          onClick={() => handleTabSwitch("login")}
        >
          <BsPersonLinesFill />
          Loan Account Number
        </button>
        <button
          className={`tab-button ${activeTab === "login2" ? "active" : ""}`}
          onClick={() => handleTabSwitch("login2")}
        >
          <BsPersonFill />
          User ID
        </button>
      </div>

      <div className={`form-panel ${activeTab}`}>
        {/* Add your login form content */}
        {activeTab === "login" && (
          <form className="login-form" onSubmit={handleSubmit}>
            {/* Input fields and other login form elements */}
            <div className="horizontal-grid">
              <div className="input-group">
                <label>
                  Loan Account Number<span style={{ color: "Red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="username"
                  name="username"
                  id="username"
                  placeholder="Enter your Loan Account Number"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="input-group">
                <label>
                  Date of Birth<span style={{ color: "Red" }}>*</span>
                </label>
                <input type="date" id="dateofbirth" name="dateofbirth" />
              </div>
              <button className="submit-btn">Login</button>
            </div>
          </form>
        )}

        {/* Add your registration form content */}
        {activeTab === "login2" && (
          <form className="register-form" onSubmit={handleSubmit}>
            {/* Input fields and other registration form elements */}
            <div className="horizontal-grid">
              <div className="input-group">
                <label>
                  User ID <span style={{ color: "Red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="username"
                  name="username"
                  autoComplete="off"
                  id="username"
                  placeholder="ENTER YOUR USER ID"
                  required
                />
              </div>
              <div className="input-group">
                <label>
                  Password<span style={{ color: "Red" }}>*</span>
                </label>
                <input
                  type="password"
                  className="password"
                  name="password"
                  autoComplete="off"
                  id="password"
                  placeholder="Enter Password"
                  required
                />
              </div>
              <button className="submit-btn">Login</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
