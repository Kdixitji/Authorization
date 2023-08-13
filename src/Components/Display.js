import React, { useState } from "react";
import "./DisplayStyles.css";
import image2 from "../assets/img2.jpg";
import { BsDot } from "react-icons/bs";
import Login from "./Login";
import Register from "./Register";
import { ToastContainer } from "react-toastify";

const Display = () => {
  const [showRegistration, setShowRegistration] = useState(false);

  const handleSignUpClick = () => {
    setShowRegistration(true);
  };

  const handleTabSwitch = () => {
    setShowRegistration(false);
  };
  return (
    <div className="main">
      <ToastContainer
        position="top-right" // Choose the desired position
        autoClose={4000} // Auto-close the toast after 4 seconds
        hideProgressBar
        closeOnClick
        pauseOnHover
      />
      <div className="hero">
        <div className="content">
          <h1>SAMPLE BANKING</h1>
          <p className="center-text">
            Fast <BsDot className="dot" /> Online <BsDot className="dot" />{" "}
            Paperless
          </p>
          <h4>
            Easy and Simple way to do is using Online Transactions, it saves lot
            of time
          </h4>
        </div>
      </div>
      <div className="hero2">
        <img src={image2} alt="iamge2" className="image2" />
        <div className="login-box">
          {!showRegistration ? (
            <Login
              handleSignUpClick={handleSignUpClick}
              handleTabSwitch={handleTabSwitch}
            />
          ) : (
            <Register handleTabSwitch={handleTabSwitch} />
          )}
          <div className="container-bottom">
            {showRegistration ? (
              <p>
                Already have an Account,{" "}
                <span
                  onClick={() => setShowRegistration(false)}
                  style={{ cursor: "pointer", color: "blueviolet" }}
                >
                  Login Here
                </span>
              </p>
            ) : (
              <p>
                Kindly{" "}
                <span
                  style={{ cursor: "pointer", color: "blueviolet" }}
                  onClick={handleSignUpClick}
                >
                  Sign up
                </span>
                , if you are new user
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;
