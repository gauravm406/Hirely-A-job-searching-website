import React from "react";
import { useSelector } from "react-redux";
import { IoMenuOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { makeSidebarActive } from "../../store/slices/user";
import s from "./navbar.module.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <div className={s.navbar_main}>
      <button
        className={s.navbar_menu_btn}
        onClick={() => dispatch(makeSidebarActive())}
      >
        <IoMenuOutline size={25} />
      </button>
      <h4>
        Welcome back, <span>{userInfo?.name}!</span>
      </h4>
      <div className={s.navbar_profile_pic_container}></div>
    </div>
  );
};

export default Navbar;
