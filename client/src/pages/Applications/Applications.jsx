import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { IoBagOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { CiLocationArrow1 } from "react-icons/ci";
import { addApplication } from "../../store/slices/applications.js";
import { useNavigate } from "react-router-dom";

const Applications = () => {
  const [isLoading, setIsLoading] = useState(false);

  const applicationsData = useSelector(
    (state) => state.application.applicationsData
  );

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // fetching all applications
  useEffect(() => {
    setIsLoading(true);

    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_HOST
          }/api/user/get_all_applications`,
          { withCredentials: true }
        );

        setIsLoading(false);
        if (response?.status === 200) {
          dispatch(addApplication(response.data));
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="all-jobs-main">
      {isLoading ? (
        <span className="loader-blue"></span>
      ) : (
        <div className="all-jobs">
          <section className="jobs-grid">
            {applicationsData?.map((job, index) => (
              <div
                className="job-card"
                key={index}
                onClick={() =>
                  navigate(
                    `/applicant_details/${job.applicationId}/${job.userId}`
                  )
                }
              >
                <div className="job-title-image-container">
                  <div className="job-title-container">
                    <h4>{job.jobTitle}</h4>
                    <p>{job.companyName}</p>
                  </div>
                  <div className="job-image-container">
                    <img
                      src={`${import.meta.env.VITE_REACT_APP_HOST}/${
                        job.image
                      }`}
                      alt=""
                    />
                  </div>
                </div>
                <p className="rating-and-reviews">
                  <FaStar style={{ color: "gold" }} /> {job.rating} |{" "}
                  {job.reviews} reviews
                </p>
                <div className="job-location-experience-container">
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

                <div>
                  <p className="rating-and-reviews">
                    Status:{" "}
                    <span
                      style={
                        job.status == "pending"
                          ? { color: "rgb(29, 78, 216)" }
                          : job.status == "approved"
                          ? { color: "green" }
                          : { color: "red" }
                      }
                    >
                      {job.status}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </section>
        </div>
      )}
    </div>
  );
};

export default Applications;
