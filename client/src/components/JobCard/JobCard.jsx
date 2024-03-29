import React, { useEffect, useState } from "react";
import { IoBagOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { CiLocationArrow1 } from "react-icons/ci";
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addUser } from "../../store/slices/user.js";
import { useDispatch } from "react-redux";
import axios from "axios";
import s from "./jobcard.module.css";

const JobCard = ({ job }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [status, setStatus] = useState("");

  const userInfo = useSelector((state) => state.user.userInfo);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleBookmark = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_HOST}/api/user/bookmark_item`,
        { userId: userInfo._id, jobId: job._id },
        { withCredentials: true }
      );

      if (response?.status == 200) {
        // dispacth to store
        dispatch(addUser(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // bookmark functionality
  useEffect(() => {
    const isJobBookmarked = userInfo?.bookmarkItems.some(
      (item) => item.job === job._id
    );

    setIsBookmarked(isJobBookmarked);
  }, [userInfo, job._id]);

  // job application
  const handleApplied = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_HOST}/api/user/apply`,
        { userId: userInfo._id, jobId: job._id },
        { withCredentials: true }
      );

      if (response?.status == 200) {
        // dispacth to store
        dispatch(addUser(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // bookmark functionality
  useEffect(() => {
    const isJobApplied = userInfo?.appliedJobs?.some((item) => {
      if (item.job === job._id) {
        setStatus(item.status);
        return true;
      } else {
        setStatus("");
        return false;
      }
    });

    setIsApplied(isJobApplied);
  }, [userInfo, job._id]);

  return (
    <div className={s.job_card}>
      <div
        className={s.job_title_image_container}
        onClick={() => navigate(`/job_details/${job._id}`)}
      >
        <div className={s.job_title_container}>
          <h4>{job.jobTitle}</h4>
          <p>{job.companyName}</p>
        </div>
        <div className={s.job_image_container}>
          <img
            src={`${import.meta.env.VITE_REACT_APP_HOST}/${job.image}`}
            alt={job.companyName}
          />
        </div>
      </div>
      <p className={s.rating_and_reviews}>
        <FaStar style={{ color: "gold" }} /> {job.rating} | {job.reviews}{" "}
        reviews
      </p>
      <div className={s.job_location_experience_container}>
        <span>
          <CiLocationArrow1 />
          {job.location.map((location, index) => (
            <p key={index}>{location},</p>
          ))}
        </span>
        <span>
          <IoBagOutline />
          <p>{job.experience} years</p>
        </span>
      </div>
      <div className={s.job_buttons_container}>
        <button
          className={s.save}
          onClick={handleBookmark}
          disabled={userInfo?.isAdmin}
        >
          {isBookmarked ? (
            <FaBookmark size={18} style={{ color: "rgb(29, 78, 216)" }} />
          ) : (
            <FaRegBookmark size={18} />
          )}
        </button>
        <button
          className={
            status.length > 0 || userInfo?.isAdmin
              ? `${s.disabled} ${s.apply}`
              : s.apply
          }
          onClick={handleApplied}
          disabled={status.length > 0 || userInfo?.isAdmin}
        >
          {isApplied ? status : "APPLY"}
        </button>
      </div>
    </div>
  );
};

export default JobCard;
