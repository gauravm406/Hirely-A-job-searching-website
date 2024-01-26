import { FiHome } from "react-icons/fi";
import { BsFilesAlt } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { MdPersonOutline } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { NavLink, useNavigate } from "react-router-dom";
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

      // success message
      toast.success(logOutResponse?.data?.message);
    } catch (error) {
      toast.error(error.message || error.response.data.message);
    }
  };

  return (
    <div className={s.panel_main}>
      <section className={s.panel_logo_brand_container}>
        <h2>Hirely</h2>
      </section>
      <section className={s.panel_menu_container}>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending ? "" : isActive ? s.active_link : ""
          }
          to="/"
          onClick={() => {
            dispatch(makeSidebarInactive());
          }}
        >
          <FiHome size={24} />
          <span>Home</span>
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending ? "" : isActive ? s.active_link : ""
          }
          to="/all_jobs"
          onClick={() => {
            dispatch(makeSidebarInactive());
          }}
        >
          <BsFilesAlt size={24} />
          <span>All Jobs</span>
        </NavLink>

        {!userInfo?.isAdmin && (
          <>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? `${s.panel_menu_item}`
                  : isActive
                  ? `${s.active_link} ${s.panel_menu_item}`
                  : `${s.panel_menu_item}`
              }
              to="/bookmarks"
              onClick={() => {
                dispatch(makeSidebarInactive());
              }}
            >
              <FaRegBookmark size={24} />
              <span>Bookmarks</span>
              {userInfo && (
                <div className={s.panel_bookmark_number}>
                  {userInfo.bookmarkItems?.length}
                </div>
              )}
            </NavLink>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? `${s.panel_menu_item}`
                  : isActive
                  ? `${s.active_link} ${s.panel_menu_item}`
                  : `${s.panel_menu_item}`
              }
              to="/applies"
              onClick={() => {
                dispatch(makeSidebarInactive());
              }}
            >
              <MdDoneAll size={24} />
              <span>Applies</span>
              {userInfo && (
                <div className={s.panel_bookmark_number}>
                  {userInfo.appliedJobs?.length}
                </div>
              )}
            </NavLink>
          </>
        )}
        {userInfo?.isAdmin && (
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? s.active_link : ""
            }
            to="/applications"
            onClick={() => {
              dispatch(makeSidebarInactive());
            }}
          >
            <FiSend size={24} />
            <span>Applications</span>
            <div className={s.panel_bookmark_number}>
              {applicationsData?.length}
            </div>
          </NavLink>
        )}
        {userInfo?.isAdmin && (
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? s.active_link : ""
            }
            to="/add_jobs"
            onClick={() => {
              dispatch(makeSidebarInactive());
            }}
          >
            <FaPlus size={24} />
            <span>Add Jobs</span>
          </NavLink>
        )}
        <NavLink
          className={({ isActive, isPending }) =>
            isPending ? "" : isActive ? s.active_link : ""
          }
          to="/profile"
          onClick={() => {
            dispatch(makeSidebarInactive());
          }}
        >
          <MdPersonOutline size={24} />
          <span>Profile</span>
        </NavLink>
        <div className={s.panel_logout_btn_container} onClick={handleLogout}>
          <TbLogout size={24} />
          <h3>Logout</h3>
        </div>
      </section>
    </div>
  );
};

export default Panel;
