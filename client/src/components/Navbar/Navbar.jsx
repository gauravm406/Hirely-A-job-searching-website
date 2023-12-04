import React from "react";
import { useSelector } from "react-redux";
import "./navbar.css";

const Navbar = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  return (
    <div className="navbar-main">
      <h4>
        Welcome back, <span>{userInfo?.name}!</span>
      </h4>
      <div className="navbar-profile-pic-container"></div>
    </div>
  );
};

export default Navbar;
