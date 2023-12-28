import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { lazy, Suspense } from "react";

const Welcome = lazy(() => import("./pages/Welcome/Welcome.jsx"));
const Register = lazy(() => import("./pages/Register/Register.jsx"));
const Home = lazy(() => import("./pages/Home/Home.jsx"));
const Navbar = lazy(() => import("./components/Navbar/Navbar.jsx"));
const Panel = lazy(() => import("./components/Panel/Panel.jsx"));
const Alljobs = lazy(() => import("./pages/AllJobs/Alljobs.jsx"));
const Profile = lazy(() => import("./pages/Profile/Profile.jsx"));
const AddJobs = lazy(() => import("./pages/Addjobs/AddJobs.jsx"));
const JobDetails = lazy(() => import("./pages/JobDetails/JobDetails.jsx"));
const Applies = lazy(() => import("./pages/Applies/Applies.jsx"));
const Bookmarks = lazy(() => import("./pages/Bookmarks/Bookmarks.jsx"));
const Applications = lazy(() =>
  import("./pages/Applications/Applications.jsx")
);
const ApplicantDetails = lazy(() =>
  import("./pages/ApplicantDetails/ApplicantDetails.jsx")
);

import "./app.css";

// chart
Chart.register(CategoryScale);

// default layout
const DefaultLayout = ({ children, sidebar }) => (
  <div className="app-container">
    <div
      className={
        sidebar === "active" ? "active app-panel" : "inactive app-panel"
      }
    >
      <Panel />
    </div>
    <div className="app-page">
      <Navbar />
      <Suspense
        fallback={
          <div className="app-loader-container">
            <span className="loader-blue"></span>
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  </div>
);

export default function App() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const sidebar = useSelector((state) => state.user.sidebar);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            userInfo ? (
              <DefaultLayout sidebar={sidebar}>
                <Home />
              </DefaultLayout>
            ) : (
              <Navigate to="/welcome" />
            )
          }
        />
        <Route
          path="/all_jobs"
          element={
            <DefaultLayout sidebar={sidebar}>
              <Alljobs />
            </DefaultLayout>
          }
        />
        <Route
          path="/add_jobs"
          element={
            <DefaultLayout sidebar={sidebar}>
              <AddJobs />
            </DefaultLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <DefaultLayout sidebar={sidebar}>
              <Profile />
            </DefaultLayout>
          }
        />
        <Route
          path="/job_details/:id"
          element={
            <DefaultLayout sidebar={sidebar}>
              <JobDetails />
            </DefaultLayout>
          }
        />
        <Route
          path="/applies"
          element={
            <DefaultLayout sidebar={sidebar}>
              <Applies />
            </DefaultLayout>
          }
        />
        <Route
          path="/bookmarks"
          element={
            <DefaultLayout sidebar={sidebar}>
              <Bookmarks />
            </DefaultLayout>
          }
        />
        <Route
          path="/applications"
          element={
            <DefaultLayout sidebar={sidebar}>
              <Applications />
            </DefaultLayout>
          }
        />
        <Route
          path="/applicant_details/:applicationId/:userId"
          element={
            <DefaultLayout sidebar={sidebar}>
              <ApplicantDetails />
            </DefaultLayout>
          }
        />

        <Route
          path="/welcome"
          element={
            <Suspense
              fallback={
                <div className="app-loader-container">
                  <span className="loader-blue"></span>
                </div>
              }
            >
              <Welcome />
            </Suspense>
          }
        />

        <Route
          path="/register"
          element={
            <Suspense
              fallback={
                <div className="app-loader-container">
                  <span className="loader-blue"></span>
                </div>
              }
            >
              <Register />
            </Suspense>
          }
        />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
