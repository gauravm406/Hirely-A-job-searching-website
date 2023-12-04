import React from "react";
import mobileview from "../../assets/mobile_view.png";
import { useNavigate } from "react-router-dom";
import "./welcome.css";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-main">
      <nav className="welcome-nav">
        <div className="welcome-logo-head-container">
          <h3>hirely</h3>
        </div>
        <button
          className="welcome-button"
          onClick={() => navigate("/register")}
        >
          Log in
        </button>
      </nav>

      <section className="welcome-content-container">
        <div className="welcome-heading-description-container">
          <h1>Job tracking tool for software engineers</h1>
          <p>
            Track your job search progress with Hirely - Never miss an update on
            your job application status.
          </p>
          <button
            className="welcome-button"
            onClick={() => navigate("/register")}
          >
            Get started
          </button>
        </div>
        <div className="welcome-img-container">
          <img src={mobileview} alt="" />
        </div>
      </section>
    </div>
  );
};

export default Welcome;
