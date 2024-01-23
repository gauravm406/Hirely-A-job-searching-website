import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/slices/user.js";
import axios from "axios";
import s from "./profile.module.css";

const Profile = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  const [isLoading, setIsLoading] = useState(false);

  const [firstName, setFirstName] = useState(userInfo?.firstName);
  const [lastName, setLastName] = useState(userInfo?.lastName);
  const [location, setLocation] = useState(userInfo?.location);
  const [email, setEmail] = useState(userInfo?.email);
  const [bio, setBio] = useState(userInfo?.bio);

  const dispatch = useDispatch();

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    // loader
    setIsLoading(true);

    if (
      email.length <= 0 ||
      firstName.length <= 0 ||
      lastName.length <= 0 ||
      bio.length <= 0 ||
      location.length <= 0
    ) {
      toast.error("Fields can not be empty");

      setIsLoading(false);
      return;
    } else {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_REACT_APP_HOST}/api/user/update_user`,
          { firstName, lastName, email, location, bio, userId: userInfo._id },
          { withCredentials: true }
        );

        // loader off
        setIsLoading(false);

        if (response?.status == 200) {
          // success message
          toast.success(response.data.message);

          // dispacth to store
          dispatch(addUser(response.data.updatedUser));
        }
      } catch (error) {
        setIsLoading(false);
        toast.error(error.response.data.message || error.message);
      }
    }
  };

  return (
    <div className={s.profile_main}>
      <h3 className={s.profile_main_heading}>Account Settings</h3>

      <section className={s.profile_main_btns_container}>
        <button disabled>my details</button>
        <button disabled>profile</button>
        <button disabled>password</button>
      </section>

      <section className={s.profile_head_desc_container}>
        <h4>Profile</h4>
        <p>Update your phone and personal details here</p>
      </section>

      <form className={s.profile_form} onSubmit={handleUpdateUser}>
        <div className={s.profile_form_upper}>
          <div>
            <label htmlFor="firstname" className={s.label_style}>
              First Name
            </label>
            <input
              id="firstname"
              type="text"
              name="firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
          </div>

          <div>
            <label htmlFor="lastname" className={s.label_style}>
              Last Name
            </label>
            <input
              id="lastname"
              type="text"
              name="lastname"
              className={s.input_style}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></input>
          </div>

          <div>
            <label htmlFor="email" className={s.label_style}>
              Email
            </label>
            <input
              id="email"
              type="text"
              name="email"
              className={s.input_style}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              className={s.input_style}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            ></input>
          </div>
        </div>

        <div className={s.profile_form_bio_container}>
          <label htmlFor="bio" className={s.label_style}>
            Bio
          </label>
          <textarea
            name="bio"
            type="text"
            id="bio"
            cols="30"
            rows="5"
            maxLength="50"
            placeholder="Brief description about your job..."
            className={`${s.input_style} ${s.resize_none}`}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div className={s.profile_save_changes_btn_container}>
          <button type="submit">
            {isLoading ? <span className={s.loader}></span> : " Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
