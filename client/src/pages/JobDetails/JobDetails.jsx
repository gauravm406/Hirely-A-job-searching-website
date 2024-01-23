import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoBagOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { CiLocationArrow1 } from "react-icons/ci";
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import axios from "axios";
import s from "./jobdetails.module.css";

const JobDetails = () => {
  const [jobData, setJobData] = useState();
  const [isJobFetching, setIsJobFetching] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { id } = useParams();

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // fetching job details
  useEffect(() => {
    setIsJobFetching(true);
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_HOST}/api/job/get_job_by_id/${id}/`,
          { withCredentials: true }
        );

        setIsJobFetching(false);

        if (response.status == 200) {
          setJobData(response?.data);
        }
      } catch (error) {
        setIsJobFetching(false);
        toast.error(error.response.data.message || error.message);
      }
    };

    fetchJob();
  }, []);

  return (
    <div className={s.job_details_main}>
      {isJobFetching ? (
        <span className={s.loader_blue}></span>
      ) : (
        jobData && (
          <section className={s.job_details}>
            <section className={s.job_details_main_card}>
              <div className={s.job_title_image_container}>
                <div className={s.job_title_container}>
                  <h4>{jobData.jobTitle}</h4>
                  <p>{jobData.companyName}</p>
                </div>
                <div className={s.job_image_container}>
                  <img
                    src={`${import.meta.env.VITE_REACT_APP_HOST}/${
                      jobData.image
                    }`}
                    alt={jobData.companyName}
                  />
                </div>
              </div>
              <p className={s.rating_and_reviews}>
                <FaStar style={{ color: "gold" }} /> {jobData.rating} |{" "}
                {jobData.reviews} reviews
              </p>
              <div className={s.job_location_experience_container}>
                <span>
                  <CiLocationArrow1 />
                  {jobData.location.map((location, index) => (
                    <p key={index}>{location},</p>
                  ))}
                </span>
                <span>
                  <IoBagOutline />
                  <p>{jobData.experience} years</p>
                </span>
              </div>
              <hr className={s.job_deatils_hr_line} />
              <div className={s.job_buttons_container}>
                <button className={s.save} onClick={handleBookmark}>
                  {isBookmarked ? (
                    <FaBookmark
                      size={18}
                      style={{ color: "rgb(29, 78, 216)" }}
                    />
                  ) : (
                    <FaRegBookmark size={18} />
                  )}
                </button>
                <button className={s.apply}>APPLY</button>
              </div>
            </section>
            <section className={s.job_details_description_card}>
              <h4>Description</h4>
              <hr className={s.job_deatils_hr_line} />
              <p>{jobData?.description}</p>
            </section>
          </section>
        )
      )}
    </div>
  );
};

export default JobDetails;
