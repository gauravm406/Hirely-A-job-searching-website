import { useSelector } from "react-redux";
import { lazy, Suspense } from "react";

const Userhome = lazy(() => import("../../components/Userhome/Userhome.jsx"));
const AdminHome = lazy(() =>
  import("../../components/Adminhome/AdminHome.jsx")
);

import s from "./home.module.css";

const Home = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  return userInfo?.isAdmin ? (
    <Suspense
      fallback={
        <div className={s.home_loader_container}>
          <span className="loader-blue"></span>
        </div>
      }
    >
      <AdminHome />
    </Suspense>
  ) : (
    <Suspense
      fallback={
        <div className={s.home_loader_container}>
          <span className="loader-blue"></span>
        </div>
      }
    >
      <Userhome />
    </Suspense>
  );
};

export default Home;
