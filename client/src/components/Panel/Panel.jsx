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
import "./panel.css";

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
      toast.success(logOutResponse?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.success(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="panel-main">
      <section className="panel-logo-brand-container">
        <h2>Hirely</h2>
      </section>
      <section className="panel-menu-container">
        <div
          className={currentPage === "HOME" ? "active-page" : ""}
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
          className={currentPage === "ALL_JOBS" ? "active-page" : ""}
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
                  ? "active-page panel-menu-item"
                  : "panel-menu-item"
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
                <div className="panel-bookmark-number">
                  {userInfo.bookmarkItems.length}
                </div>
              )}
            </div>
            <div
              className={
                currentPage === "APPLIES"
                  ? "active-page panel-menu-item"
                  : "panel-menu-item"
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
                <div className="panel-bookmark-number">
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
                ? "active-page panel-menu-item"
                : "panel-menu-item"
            }
            onClick={() => {
              navigate("/applications");
              setCurrentPage("APPLICATIONS");
              dispatch(makeSidebarInactive());
            }}
          >
            <FiSend size={24} />
            <h3>Applications</h3>
            <div className="panel-bookmark-number">
              {applicationsData?.length}
            </div>
          </div>
        )}
        {userInfo?.isAdmin && (
          <div
            className={currentPage === "ADD_JOBS" ? "active-page" : ""}
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
          className={currentPage === "PROFILE" ? "active-page" : ""}
          onClick={() => {
            navigate("/profile");
            setCurrentPage("PROFILE");
            dispatch(makeSidebarInactive());
          }}
        >
          <MdPersonOutline size={24} />
          <h3>Profile</h3>
        </div>
        <div className="panel-logout-btn-container" onClick={handleLogout}>
          <TbLogout size={24} />
          <h3>Logout</h3>
        </div>
      </section>
    </div>
  );
};

export default Panel;
