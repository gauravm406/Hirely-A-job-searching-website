import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../store/slices/user.js";
import axios from "axios";
import s from "./register.module.css";

const Register = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // register user handler
  const handleRegisterUser = async (e) => {
    e.preventDefault();

    // loader
    setIsLoading(true);

    if (name.length < 3) {
      toast.error("Name should have atleast 3 charcters!");

      setIsLoading(false);
      return;
    }

    if (email.length < 3) {
      toast.error("Email should have atleast 3 charcters!");

      setIsLoading(false);
      return;
    }

    if (password.length < 3) {
      toast.error("Password should have atleast 3 charcters!");

      setIsLoading(false);
      return;
    }

    if (name === "" || email === "" || password === "") {
      toast.error("Fill all the detials !");

      setIsLoading(false);
      return;
    } else {
      try {
        const registerResponse = await axios.post(
          `${import.meta.env.VITE_REACT_APP_HOST}/api/user/register`,
          {
            name,
            email,
            password,
          },
          { withCredentials: true }
        );

        if (registerResponse.status === 200) {
          const userData = registerResponse.data.user;

          // Dispatch the addUser action with user information
          dispatch(addUser(userData));

          // home
          navigate("/");

          toast.success("Registered successfully!");
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error(error.response.data.message || error.message);
      }
    }
  };

  // login handler
  const handleLoginUser = async (e) => {
    e.preventDefault();

    // loader
    setIsLoading(true);

    if (email.length < 3) {
      toast.error("Email should have atleast 3 charcters!");

      setIsLoading(false);
      return;
    }

    if (password.length < 3) {
      toast.error("Password should have atleast 3 charcters!");

      setIsLoading(false);
      return;
    }

    if (email === "" || password === "") {
      toast.error("Fill all the detials !");

      setIsLoading(false);
      return;
    } else {
      try {
        const loginResponse = await axios.post(
          `${import.meta.env.VITE_REACT_APP_HOST}/api/user/login`,
          {
            email,
            password,
          },
          { withCredentials: true }
        );

        if (loginResponse.status === 200) {
          const userData = loginResponse.data.user;

          // Dispatch the addUser action with user information
          dispatch(addUser(userData));

          // navigate to home
          navigate("/");
        }
      } catch (error) {
        setIsLoading(false);
        toast.error(error.response.data.message || error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDemoUserLogin = () => {
    setEmail("john@gmail.com");
    setPassword("123456");
  };

  const handleAdminLogin = () => {
    setEmail("admin@gmail.com");
    setPassword("123456");
  };

  return (
    <div className={s.register_main}>
      {/* aside */}
      <aside className={s.register_aside_container}>
        <h2 className={s.register_aside_brandname}>HIRELY.</h2>
        <h2 className={s.register_aside_slogan}>Start your journey with us.</h2>
        <p className={s.register_aside_description}>
          Track your job search progress with Indago - Never miss an update on
          your job application status.
        </p>
        <div className={s.register_aside_review_container}>
          <p>
            Indago is a great web app for job seekers. It helps to keep track of
            job applications and their statuses. Highly recommended for anyone
            actively searching for a job.
          </p>
          <section>
            <h4>James Bond</h4>
            <p>Software Engineer</p>
          </section>
        </div>
      </aside>

      {/* register form */}
      <section className={s.register_form_container}>
        <h2 className={s.register_form_container_heading}>Hello Again!</h2>

        {isLogin ? (
          // login form
          <form className={s.register_login_form} onSubmit={handleLoginUser}>
            <label htmlFor="email" className={s.label_style}>
              Email
            </label>
            <input
              id="email"
              placeholder="Enter your email"
              type="text"
              name="email"
              className={s.input_style}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <label htmlFor="password" className={s.label_style}>
              Password
            </label>
            <input
              id="password"
              placeholder="Enter your password"
              type="password"
              name="password"
              className={s.input_style}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button type="submit">
              {" "}
              {isLoading ? <span className={s.loader}></span> : "LOGIN"}
            </button>
            <span
              className={s.register_demo_user}
              onClick={handleDemoUserLogin}
            >
              Demo user <FaLongArrowAltRight />
            </span>
            <span className={s.register_demo_user} onClick={handleAdminLogin}>
              Admin user <FaLongArrowAltRight />
            </span>
          </form>
        ) : (
          //  register form
          <form
            className={s.register_signup_form}
            onSubmit={handleRegisterUser}
          >
            <label htmlFor="name" className={s.label_style}>
              Name
            </label>
            <input
              id="name"
              placeholder="Enter your name"
              type="text"
              name="name"
              className={s.input_style}
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <label htmlFor="email" className={s.label_style}>
              Email
            </label>
            <input
              id="email"
              placeholder="Enter your email"
              type="text"
              name="email"
              className={s.input_style}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <label htmlFor="password" className={s.label_style}>
              Password
            </label>
            <input
              id="password"
              placeholder="Enter your password"
              type="password"
              name="password"
              className={s.input_style}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button type="submit">
              {isLoading ? <span className={s.loader}></span> : "REGISTER"}
            </button>
          </form>
        )}

        {isLogin ? (
          <p className={s.register_question}>
            New user?{" "}
            <span
              onClick={() => {
                setIsLogin(!isLogin);
                setEmail("");
                setPassword("");
                setName("");
              }}
            >
              Register
            </span>
          </p>
        ) : (
          <p className={s.register_question}>
            Already a user?{" "}
            <span
              onClick={() => {
                setIsLogin(!isLogin);
                setEmail("");
                setPassword("");
                setName("");
              }}
            >
              Login
            </span>
          </p>
        )}
      </section>
    </div>
  );
};

export default Register;
