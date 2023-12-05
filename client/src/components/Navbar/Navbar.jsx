import React from "react";
import { useSelector } from "react-redux";
import "./navbar.css";
import { IoMenuOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { makeSidebarActive } from "../../store/slices/user";

const Navbar = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  return (
    <div className="navbar-main">
      <button
        className="navbar-menu-btn"
        onClick={() => dispatch(makeSidebarActive())}
      >
        <IoMenuOutline size={25} />
      </button>
      <h4>
        Welcome back, <span>{userInfo?.name}!</span>
      </h4>
      <div className="navbar-profile-pic-container"></div>
    </div>
  );
};

export default Navbar;
