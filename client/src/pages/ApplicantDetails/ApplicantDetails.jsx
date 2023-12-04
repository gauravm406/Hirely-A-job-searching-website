import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoBagOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { CiLocationArrow1 } from "react-icons/ci";
import "./applicationdetails.css";

const ApplicantDetails = () => {
  const { userId, applicationId } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState();

  // fetch applicant, job and application details
  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const response = await axios.put(
          `${
            import.meta.env.VITE_REACT_APP_HOST
          }/api/user/get_application_details`,
          { userId, applicationId, status },
          { withCredentials: true }
        );

        if (response?.status == 200) {
          setData(response.data);
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, [status]);

  return (
    <div className="all-jobs-main">
      {isLoading ? (
        <span className="loader-blue"></span>
      ) : (
        data && (
          <section className="job-details">
            <section className="job-details-main-card">
              {" "}
              <div className="job-title-image-container">
                <div className="job-title-container">
                  <h4>{data.jobDetails.jobTitle}</h4>
                  <p>{data.jobDetails.companyName}</p>
                </div>
                <div className="job-image-container">
                  <img src={data.jobDetails.image} alt="" />
                </div>
              </div>
              <p className="rating-and-reviews">
                <FaStar style={{ color: "gold" }} /> {data.jobDetails.rating} |{" "}
                {data.jobDetails.reviews} reviews
              </p>
              <div className="job-location-experience-container">
                <span>
                  <CiLocationArrow1 />
                  {data.jobDetails.location.map((location, index) => (
                    <p key={index}>{location},</p>
                  ))}
                </span>
                <span>
                  <IoBagOutline />
                  <p>{data.jobDetails.experience} years</p>
                </span>
              </div>
            </section>

            {/* applicant details */}
            <section className="job-details-main-card">
              <div className="job-title-image-container">
                <div className="job-title-container">
                  <h4 className="applicant-details-head">APPLICANT DETAILS</h4>
                  <hr style={{ margin: "0.5rem 0rem" }} />
                  <h4>{data.user.name}</h4>
                  <p>{data.user.bio}</p>
                </div>
                <div className="job-image-container">
                  <div className="navbar-profile-pic-container"></div>
                </div>
              </div>
              <p className="rating-and-reviews">{data.user.email}</p>
              <div className="job-location-experience-container">
                <span>
                  <CiLocationArrow1 />
                  {data.user.location}
                </span>
                <span>
                  <IoBagOutline />
                  <p>{data.user.email} years</p>
                </span>
              </div>
              <p className="rating-and-reviews">
                Status:{" "}
                <span
                  style={
                    data.applicationDetails[0].status == "pending"
                      ? { color: "rgb(29, 78, 216)" }
                      : data.applicationDetails[0].status == "approved"
                      ? { color: "green" }
                      : { color: "red" }
                  }
                >
                  {data.applicationDetails[0].status}
                </span>
              </p>
            </section>

            {data.applicationDetails[0].status == "pending" && (
              <section className="details-buttons-container">
                <button onClick={() => setStatus("approved")}>APPROVE</button>
                <button onClick={() => setStatus("declined")}>DECLINE</button>
              </section>
            )}
          </section>
        )
      )}
    </div>
  );
};

export default ApplicantDetails;
