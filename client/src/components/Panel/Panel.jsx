import React, { useEffect, useState } from "react";
import { FiHome } from "react-icons/fi";
import { BsFilesAlt } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { MdPersonOutline } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { removeUser } from "../../store/slices/user.js";
import { FaRegBookmark } from "react-icons/fa6";
import { MdDoneAll } from "react-icons/md";
import { removeApplication } from "../../store/slices/applications.js";
import { FiSend } from "react-icons/fi";
import { makeSidebarInactive } from "../../store/slices/user.js";
import axios from "axios";
import s from "./panel.module.css";

const Panel = () => {
  const [currentPage, setCurrentPage] = useState(
    localStorage.getItem("currentPage") || "HOME"
  );

  // data will not be lost
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  const userInfo = useSelector((state) => state.user.userInfo);

  const applicationsData = useSelector(
    (state) => state.application.applicationsData
  );

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // logout user
  const handleLogout = async () => {
    try {
      // request for logut
      const logOutResponse = await axios.get(
        `${import.meta.env.VITE_REACT_APP_HOST}/api/user/logout`,
        {
          withCredentials: true,
        }
      );

      // remove user from store
      dispatch(removeUser());

      // remove applications from store
      dispatch(removeApplication());

      navigate("/welcome");

      localStorage.removeItem("currentPage");

      // success message
      toast.success(logOutResponse?.data?.message);
    } catch (error) {
      toast.success(error.message || error.response.data.message);
    }
  };

  return (
    <div className={s.panel_main}>
      <section className={s.panel_logo_brand_container}>
        <h2>Hirely</h2>
      </section>
      <section className={s.panel_menu_container}>
        <div
          className={currentPage === "HOME" ? `${s.active_page}` : ""}
          onClick={() => {
            navigate("/");
            setCurrentPage("HOME");
            dispatch(makeSidebarInactive());
          }}
        >
          <FiHome size={24} />
          <h3>Home</h3>
        </div>
        <div
          className={currentPage === "ALL_JOBS" ? `${s.active_page}` : ""}
          onClick={() => {
            navigate("/all_jobs");
            setCurrentPage("ALL_JOBS");
            dispatch(makeSidebarInactive());
          }}
        >
          <BsFilesAlt size={24} />
          <h3>All Jobs</h3>
        </div>

        {!userInfo?.isAdmin && (
          <>
            <div
              className={
                currentPage === "BOOKMARKS"
                  ? `${s.active_page} ${s.panel_menu_item}`
                  : `${s.panel_menu_item}`
              }
              onClick={() => {
                navigate("/bookmarks");
                setCurrentPage("BOOKMARKS");
                dispatch(makeSidebarInactive());
              }}
            >
              <FaRegBookmark size={24} />
              <h3>Bookmarks</h3>
              {userInfo && (
                <div className={s.panel_bookmark_number}>
                  {userInfo.bookmarkItems.length}
                </div>
              )}
            </div>
            <div
              className={
                currentPage === "APPLIES"
                  ? `${s.active_page} ${s.panel_menu_item}`
                  : `${s.panel_menu_item}`
              }
              onClick={() => {
                navigate("/applieS");
                setCurrentPage("APPLIES");
                dispatch(makeSidebarInactive());
              }}
            >
              <MdDoneAll size={24} />
              <h3>Applies</h3>
              {userInfo && (
                <div className={s.panel_bookmark_number}>
                  {userInfo.appliedJobs.length}
                </div>
              )}
            </div>
          </>
        )}
        {userInfo?.isAdmin && (
          <div
            className={
              currentPage === "APPLICATIONS"
                ? `${s.active_page} ${s.panel_menu_item}`
                : `${s.panel_menu_item}`
            }
            onClick={() => {
              navigate("/applications");
              setCurrentPage("APPLICATIONS");
              dispatch(makeSidebarInactive());
            }}
          >
            <FiSend size={24} />
            <h3>Applications</h3>
            <div className={s.panel_bookmark_number}>
              {applicationsData?.length}
            </div>
          </div>
        )}
        {userInfo?.isAdmin && (
          <div
            className={currentPage === "ADD_JOBS" ? `${s.active_page}` : ""}
            onClick={() => {
              navigate("/add_jobs");
              setCurrentPage("ADD_JOBS");
              dispatch(makeSidebarInactive());
            }}
          >
            <FaPlus size={24} />
            <h3>Add Jobs</h3>
          </div>
        )}
        <div
          className={currentPage === "PROFILE" ? `${s.active_page}` : ""}
          onClick={() => {
            navigate("/profile");
            setCurrentPage("PROFILE");
            dispatch(makeSidebarInactive());
          }}
        >
          <MdPersonOutline size={24} />
          <h3>Profile</h3>
        </div>
        <div className={s.panel_logout_btn_container} onClick={handleLogout}>
          <TbLogout size={24} />
          <h3>Logout</h3>
        </div>
      </section>
    </div>
  );
};

export default Panel;
