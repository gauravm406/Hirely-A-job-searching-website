import React from "react";
import mobileview from "../../assets/mobile_view.webp";
import { useNavigate } from "react-router-dom";
import s from "./welcome.module.css";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className={s.welcome_main}>
      <nav className={s.welcome_nav}>
        <div className={s.welcome_logo_head_container}>
          <h3>hirely</h3>
        </div>
        <button
          className={s.welcome_button}
          onClick={() => navigate("/register")}
        >
          Log in
        </button>
      </nav>

      <section className={s.welcome_content_container}>
        <div className={s.welcome_heading_description_container}>
          <h1>Job tracking tool for software engineers</h1>
          <p>
            Track your job search progress with Hirely - Never miss an update on
            your job application status.
          </p>
          <button
            className={s.welcome_button}
            onClick={() => navigate("/register")}
          >
            Get started
          </button>
        </div>
        <div className={s.welcome_img_container}>
          <img src={mobileview} alt="" />
        </div>
      </section>
    </div>
  );
};

export default Welcome;
