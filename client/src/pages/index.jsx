import { lazy } from "react";
import { DefaultLayout } from "../components/index.js";
import { Suspense } from "react";

// Lazy-loaded pages with default wrapper
const lazyWithDefaultLayout = (importFunction) => {
  const LazyComponent = lazy(importFunction);

  return (props) => (
    <DefaultLayout>
      <LazyComponent {...props} />
    </DefaultLayout>
  );
};

// Lazy-loaded pages without deafult wrapper

const lazyWithoutDefaultLayout = (importFunction) => {
  const Component = lazy(importFunction);

  return () => (
    <Suspense
      fallback={
        <div className="app-loader-container">
          <span className="loader-blue"></span>
        </div>
      }
    >
      <Component />
    </Suspense>
  );
};

// pages without default layout
const Welcome = lazyWithoutDefaultLayout(() => import("./Welcome/Welcome.jsx"));
const Register = lazyWithoutDefaultLayout(() =>
  import("./Register/Register.jsx")
);

// pages with default layout
const Home = lazyWithDefaultLayout(() => import("./Home/Home.jsx"));
const Alljobs = lazyWithDefaultLayout(() => import("./AllJobs/Alljobs.jsx"));
const Profile = lazyWithDefaultLayout(() => import("./Profile/Profile.jsx"));
const AddJobs = lazyWithDefaultLayout(() => import("./Addjobs/AddJobs.jsx"));
const JobDetails = lazyWithDefaultLayout(() =>
  import("./JobDetails/JobDetails.jsx")
);
const Applies = lazyWithDefaultLayout(() => import("./Applies/Applies.jsx"));
const Bookmarks = lazyWithDefaultLayout(() =>
  import("./Bookmarks/Bookmarks.jsx")
);
const Applications = lazyWithDefaultLayout(() =>
  import("./Applications/Applications.jsx")
);
const ApplicantDetails = lazyWithDefaultLayout(() =>
  import("./ApplicantDetails/ApplicantDetails.jsx")
);

export {
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
};
