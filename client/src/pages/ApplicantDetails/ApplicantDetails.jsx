import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoBagOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { CiLocationArrow1 } from "react-icons/ci";
import s from "./applicationdetails.module.css";

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
      } catch (error) {
        toast.error(error.response.data.message || error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [status]);

  return (
    <div className={s.all_jobs_main}>
      {isLoading ? (
        <span className="loader-blue"></span>
      ) : (
        data && (
          <section className={s.job_details}>
            <section className={s.job_details_main_card}>
              {" "}
              <div className={s.job_title_image_container}>
                <div className={s.job_title_container}>
                  <h4>{data.jobDetails.jobTitle}</h4>
                  <p>{data.jobDetails.companyName}</p>
                </div>
                <div className={s.job_image_container}>
                  <img src={data.jobDetails.image} alt="" />
                </div>
              </div>
              <p className={s.rating_and_reviews}>
                <FaStar style={{ color: "gold" }} /> {data.jobDetails.rating} |{" "}
                {data.jobDetails.reviews} reviews
              </p>
              <div className={s.job_location_experience_container}>
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
            <section className={s.job_details_main_card}>
              <div className={s.job_title_image_container}>
                <div className={s.job_title_container}>
                  <h4 className={s.applicant_details_head}>
                    APPLICANT DETAILS
                  </h4>
                  <hr style={{ margin: "0.5rem 0rem" }} />
                  <h4>{data.user.name}</h4>
                  <p>{data.user.bio}</p>
                </div>
                <div className={s.job_image_container}>
                  <div className={s.navbar_profile_pic_container}></div>
                </div>
              </div>
              <p className={s.rating_and_reviews}>{data.user.email}</p>
              <div className={s.job_location_experience_container}>
                <span>
                  <CiLocationArrow1 />
                  {data.user.location}
                </span>
                <span>
                  <IoBagOutline />
                  <p>{data.user.email} years</p>
                </span>
              </div>
              <p className={s.rating_and_reviews}>
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
              <section className={s.details_buttons_container}>
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
