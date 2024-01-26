import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Toast } from "./components/index";
import {
  Welcome,
  Register,
  Home,
  Alljobs,
  Profile,
  AddJobs,
  JobDetails,
  Applies,
  Bookmarks,
  Applications,
  ApplicantDetails,
} from "./pages/index";

import "./app.css";

// chart
Chart.register(CategoryScale);

export default function App() {
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={userInfo ? <Home /> : <Navigate to="/welcome" />}
        />
        <Route path="/all_jobs" element={<Alljobs />} />
        <Route path="/add_jobs" element={<AddJobs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/job_details/:id" element={<JobDetails />} />
        <Route path="/applies" element={<Applies />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/applications" element={<Applications />} />
        <Route
          path="/applicant_details/:applicationId/:userId"
          element={<ApplicantDetails />}
        />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toast />
    </BrowserRouter>
  );
}
