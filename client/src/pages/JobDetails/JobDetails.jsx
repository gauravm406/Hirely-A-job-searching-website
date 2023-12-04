import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoBagOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { CiLocationArrow1 } from "react-icons/ci";
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./jobdetails.css";

const JobDetails = () => {
  const [jobData, setJobData] = useState();
  const [isJobFetching, setIsJobFetching] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

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
        toast.error(error.response.data || error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };

    fetchJob();
  }, []);

  return (
    <div className="job-details-main">
      {isJobFetching ? (
        <span className="loader-blue"></span>
      ) : (
        jobData && (
          <section className="job-details">
            <section className="job-details-main-card">
              {" "}
              <div className="job-title-image-container">
                <div className="job-title-container">
                  <h4>{jobData.jobTitle}</h4>
                  <p>{jobData.companyName}</p>
                </div>
                <div className="job-image-container">
                  <img src={jobData.image} alt="" />
                </div>
              </div>
              <p className="rating-and-reviews">
                <FaStar style={{ color: "gold" }} /> {jobData.rating} |{" "}
                {jobData.reviews} reviews
              </p>
              <div className="job-location-experience-container">
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
              <hr className="job-deatils-hr-line" />
              <div className="job-buttons-container">
                <button className="save" onClick={handleBookmark}>
                  {isBookmarked ? (
                    <FaBookmark
                      size={18}
                      style={{ color: "rgb(29, 78, 216)" }}
                    />
                  ) : (
                    <FaRegBookmark size={18} />
                  )}
                </button>
                <button className="apply">APPLY</button>
              </div>
            </section>
            <section className="job-details-description-card">
              <h4>Description</h4>
              <hr className="job-deatils-hr-line" />

              <p>{jobData?.description}</p>
            </section>
          </section>
        )
      )}
    </div>
  );
};

export default JobDetails;
