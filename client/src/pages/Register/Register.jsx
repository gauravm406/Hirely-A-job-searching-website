import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../store/slices/user.js";
import axios from "axios";
import "./register.css";

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
      toast.error("Name should have atleast 3 charcters!", {
        position: toast.POSITION.TOP_RIGHT,
      });

      setIsLoading(false);
      return;
    }

    if (email.length < 3) {
      toast.error("Email should have atleast 3 charcters!", {
        position: toast.POSITION.TOP_RIGHT,
      });

      setIsLoading(false);
      return;
    }

    if (password.length < 3) {
      toast.error("Password should have atleast 3 charcters!", {
        position: toast.POSITION.TOP_RIGHT,
      });

      setIsLoading(false);
      return;
    }

    if (name === "" || email === "" || password === "") {
      toast.error("Fill all the detials !", {
        position: toast.POSITION.TOP_RIGHT,
      });

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

          toast.success("Registered successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error(error.response.data || error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  // login handler
  const handleLoginUser = async (e) => {
    e.preventDefault();

    // loader
    setIsLoading(true);

    if (email.length < 3) {
      toast.error("Email should have atleast 3 charcters!", {
        position: toast.POSITION.TOP_RIGHT,
      });

      setIsLoading(false);
      return;
    }

    if (password.length < 3) {
      toast.error("Password should have atleast 3 charcters!", {
        position: toast.POSITION.TOP_RIGHT,
      });

      setIsLoading(false);
      return;
    }

    if (email === "" || password === "") {
      toast.error("Fill all the detials !", {
        position: toast.POSITION.TOP_RIGHT,
      });

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

          toast.success("Logged in successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error(error.response.data || error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
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
    <div className="register-main">
      {/* aside */}

      <aside className="register-aside-container">
        <h2 className="register-aside-brandname">HIRELY.</h2>
        <h2 className="register-aside-slogan">Start your journey with us.</h2>
        <p className="register-aside-description">
          Track your job search progress with Indago - Never miss an update on
          your job application status.
        </p>
        <div className="register-aside-review-container">
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

      {/* register from  */}
      <section className="register-form-container">
        <h2 className="register-form-container-heading">Hello Again!</h2>

        {isLogin ? (
          // login form

          <form className="register-login-form" onSubmit={handleLoginUser}>
            <label htmlFor="email" className="label_style">
              Email
            </label>
            <input
              id="email"
              placeholder="Enter your email"
              type="text"
              name="email"
              className="input_style"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <label htmlFor="password" className="label_style">
              Password
            </label>
            <input
              id="password"
              placeholder="Enter your password"
              type="password"
              name="password"
              className="input_style"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button type="submit">
              {" "}
              {isLoading ? <span className="loader"></span> : "LOGIN"}
            </button>
            <span className="register-demo-user" onClick={handleDemoUserLogin}>
              Demo user <FaLongArrowAltRight />
            </span>
            <span className="register-demo-user" onClick={handleAdminLogin}>
              Admin user <FaLongArrowAltRight />
            </span>
          </form>
        ) : (
          //  register form

          <form className="register-signup-form" onSubmit={handleRegisterUser}>
            <label htmlFor="name" className="label_style">
              Name
            </label>
            <input
              id="name"
              placeholder="Enter your name"
              type="text"
              name="name"
              className="input_style"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <label htmlFor="email" className="label_style">
              Email
            </label>
            <input
              id="email"
              placeholder="Enter your email"
              type="text"
              name="email"
              className="input_style"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <label htmlFor="password" className="label_style">
              Password
            </label>
            <input
              id="password"
              placeholder="Enter your password"
              type="password"
              name="password"
              className="input_style"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button type="submit">
              {isLoading ? <span className="loader"></span> : "REGISTER"}
            </button>
          </form>
        )}

        {isLogin ? (
          <p className="register-question">
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
          <p className="register-question">
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
