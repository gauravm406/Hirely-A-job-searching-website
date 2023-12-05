import React, { useState } from "react";
import "./addjobs.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AddJobs = () => {
  const [image, setImage] = useState();
  const [jobTitle, setJobTitle] = useState();
  const [companyName, setCompanyName] = useState();
  const [experience, setExperience] = useState();
  const [description, setDescription] = useState();
  const [location, setLocation] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const userInfo = useSelector((state) => state.user.userInfo);

  const uploadHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_HOST}/api/upload`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        // image name
        setImage(response.data.image);

        toast.success(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const postJobHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (
      image.length < 3 ||
      jobTitle.length < 3 ||
      companyName.length < 3 ||
      experience.length < 1 ||
      description.length < 3 ||
      location.length < 3
    ) {
      toast.error("All details are required", {
        position: toast.POSITION.TOP_RIGHT,
      });

      setIsLoading(false);
      return;
    } else {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_HOST}/api/job/post_job`,
          {
            image,
            jobTitle,
            companyName,
            experience,
            description,
            location: [location],
            user: userInfo._id,
          },
          { withCredentials: true }
        );

        setIsLoading(false);

        console.log(response);

        if (response.status == 200) {
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  return (
    <div className="add-jobs-main">
      <h3 className="profile-main-heading">Add Jobs</h3>

      <section className="profile-main-btns-container">
        <button disabled>job title</button>
        <button disabled>company</button>
        <button disabled>experience</button>
      </section>

      <section
        className="profile-head-desc-container"
        style={{ marginBottom: "2rem" }}
      >
        <h4>Job</h4>
        <p>Provide details about job and job description in this section.</p>
      </section>

      <form action="" onSubmit={postJobHandler}>
        <section className="add-job-form">
          <div>
            <label htmlFor="jobtitle" className="label_style">
              Job Title
            </label>
            <input
              id="jobtitle"
              type="text"
              name="jobtitle"
              onChange={(e) => setJobTitle(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="companyname" className="label_style">
              Company Name
            </label>
            <input
              id="companyname"
              type="text"
              name="companyname"
              onChange={(e) => setCompanyName(e.target.value)}
            ></input>
          </div>

          <div>
            <label htmlFor="experience" className="label_style">
              Experience Required
            </label>
            <input
              id="experience"
              type="text"
              name="experience"
              onChange={(e) => setExperience(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="description" className="label_style">
              Description
            </label>
            <input
              id="description"
              type="text"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            ></input>
          </div>

          <div>
            <label htmlFor="location" className="label_style">
              Location
            </label>
            <input
              id="location"
              type="text"
              name="location"
              onChange={(e) => setLocation(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="companylogo" className="label_style">
              Company Logo
            </label>
            <input
              id="companylogo"
              type="file"
              name="companylogo"
              onChange={uploadHandler}
            ></input>
          </div>
        </section>

        <div className="profile-save-changes-btn-container">
          <button type="submit">
            {isLoading ? <span className="loader"></span> : "ADD JOB"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJobs;
