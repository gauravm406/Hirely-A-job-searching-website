import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import s from "./addjobs.module.css";

const AddJobs = () => {
  const [image, setImage] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
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

        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
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
      toast.error("All details are required");

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

        if (response.status == 200) {
          toast.success(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message || error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={s.add_jobs_main}>
      <h3 className={s.profile_main_heading}>Add Jobs</h3>

      <section className={s.profile_main_btns_container}>
        <button disabled>job title</button>
        <button disabled>company</button>
        <button disabled>experience</button>
      </section>

      <section
        className={s.profile_head_desc_container}
        style={{ marginBottom: "2rem" }}
      >
        <h4>Job</h4>
        <p>Provide details about job and job description in this section.</p>
      </section>

      <form action="" onSubmit={postJobHandler}>
        <section className={s.add_job_form}>
          <div>
            <label htmlFor="jobtitle" className={s.label_style}>
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
            <label htmlFor="companyname" className={s.label_style}>
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
            <label htmlFor="experience" className={s.label_style}>
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
            <label htmlFor="description" className={s.label_style}>
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
            <label htmlFor="location" className={s.label_style}>
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
            <label htmlFor="companylogo" className={s.label_style}>
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

        <div className={s.profile_save_changes_btn_container}>
          <button type="submit">
            {isLoading ? <span className={s.loader}></span> : "ADD JOB"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJobs;
