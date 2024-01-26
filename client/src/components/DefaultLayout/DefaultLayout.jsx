import { Panel, Navbar } from "../index";
import { Suspense } from "react";
import { useSelector } from "react-redux";

const DefaultLayout = ({ children }) => {
  const sidebar = useSelector((state) => state.user.sidebar);

  return (
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
};

export default DefaultLayout;
