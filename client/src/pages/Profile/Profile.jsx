import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/slices/user.js";
import axios from "axios";
import "./profile.css";

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
      toast.error("Fields can not be empty", {
        position: toast.POSITION.TOP_RIGHT,
      });

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
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });

          // dispacth to store
          dispatch(addUser(response.data.updatedUser));
        }
      } catch (error) {
        setIsLoading(false);
        toast.error(error.response.data || error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  return (
    <div className="profile-main">
      <h3 className="profile-main-heading">Account Settings </h3>

      <section className="profile-main-btns-container">
        <button disabled>my details</button>
        <button disabled>profile</button>
        <button disabled>password</button>
      </section>

      <section className="profile-head-desc-container">
        <h4>Profile</h4>
        <p>Update your phone and personal details here</p>
      </section>

      <form className="profile-form" onSubmit={handleUpdateUser}>
        <div className="profile-form-upper">
          <div>
            <label htmlFor="firstname" className="label_style">
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
            <label htmlFor="lastname" className="label_style">
              Last Name
            </label>
            <input
              id="lastname"
              type="text"
              name="lastname"
              className="input_style"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></input>
          </div>

          <div>
            <label htmlFor="email" className="label_style">
              Email
            </label>
            <input
              id="email"
              type="text"
              name="email"
              className="input_style"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              className="input_style"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            ></input>
          </div>
        </div>

        <div className="profile-form-bio-container">
          <label htmlFor="bio" className="label_style">
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
            className="input_style resize-none"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div className="profile-save-changes-btn-container">
          <button type="submit">
            {isLoading ? <span className="loader"></span> : " Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
