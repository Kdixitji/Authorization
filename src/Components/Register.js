import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const form = {
      firstname: data.get("firstname"),
      lastname: data.get("lastname"),
      username: data.get("username"),
      password: data.get("password"),
    };

    //password and confirm password registration
    const password = data.get("password");
    const confirmPassword = data.get("confirmpassword");

    if (password !== confirmPassword) {
      toast.error("Password do not match, Please re-enter them", {
        className: "toast-error",
      });
      return;
    }
    //Registration api
    const res = await fetch(`http://localhost:4000/auth/register`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
      },
    });
    if (res.ok) {
      navigate("/");
      toast.success("Successfully Registered");
    }
  };
  return (
    <div className="container">
      <h3>Register to Apply for Banking</h3>
      <p style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "20px" }}>
        Enter your Basic Details
      </p>
      <form className="login-form" onSubmit={handleSubmit}>
        {/* Input fields and other login form elements */}
        <div className="horizontal-grid">
          <div className="input-group">
            <label>
              First Name<span style={{ color: "Red" }}>*</span>
            </label>
            <input
              type="text"
              autoComplete="given-name"
              className="firstname"
              id="firstname"
              name="firstname"
              placeholder="Enter your First Name"
              required
            />
          </div>
          <div className="input-group">
            <label>
              Last Name<span style={{ color: "Red" }}>*</span>
            </label>
            <input
              type="text"
              className="lastname"
              id="lastname"
              placeholder="Enter your last Name"
              autoComplete="family-name"
              name="lastname"
              required
            />
          </div>
        </div>
        <div className="input-group-user">
          <label>
            User ID<span style={{ color: "Red" }}>*</span>
          </label>
          <input
            type="text"
            className="username"
            id="username"
            name="username"
            placeholder="Enter User ID"
            autoComplete="off"
            required
          />
        </div>
        <div className="horizontal-grid">
          <div className="input-group">
            <label>
              Password<span style={{ color: "Red" }}>*</span>
            </label>
            <input
              type="password"
              className="password"
              id="password"
              placeholder="Enter Password"
              name="password"
              required
            />
          </div>
          <div className="input-group">
            <label>
              Confirm Password<span style={{ color: "Red" }}>*</span>
            </label>
            <input
              type="password"
              className="confirmpassword"
              name="confirmpassword"
              id="confirmpassword"
              placeholder="Re-Enter your Password"
              required
            />
          </div>
          <button className="submit-btn">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
