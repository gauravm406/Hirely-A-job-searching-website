import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Welcome from "./pages/Welcome/Welcome.jsx";
import Home from "./pages/Home/Home.jsx";
import Register from "./pages/Register/Register.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Panel from "./components/Panel/Panel.jsx";
import Alljobs from "./pages/AllJobs/Alljobs.jsx";
import Pofile from "./pages/Profile/Profile.jsx";
import AddJobs from "./pages/Addjobs/AddJobs.jsx";
import JobDetails from "./pages/JobDetails/JobDetails.jsx";
import Applies from "./pages/Applies/Applies.jsx";
import Bookmarks from "./pages/Bookmarks/Bookmarks.jsx";
import Applications from "./pages/Applications/Applications.jsx";
import { useSelector } from "react-redux";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import "./app.css";
import ApplicantDetails from "./pages/ApplicantDetails/ApplicantDetails.jsx";

Chart.register(CategoryScale);

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
      {children}
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
              <Pofile />
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
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
