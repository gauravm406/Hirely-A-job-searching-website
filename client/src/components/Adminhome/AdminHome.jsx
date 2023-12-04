import { useEffect, useState } from "react";
import { MdPendingActions } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { IoHandRightOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { Bar } from "react-chartjs-2";
import { addApplication } from "../../store/slices/applications.js";
import axios from "axios";

const AdminHome = () => {
  const [isLoading, setIsLoading] = useState(false);

  const userInfo = useSelector((state) => state.user.userInfo);

  const applicationsData = useSelector(
    (state) => state.application.applicationsData
  );

  const [pendingApplications, setPendingApplications] = useState([]);
  const [approvedApplications, setApprovedApplications] = useState([]);
  const [declinedApplications, setDeclinedApplications] = useState([]);
  const [adminChartData, setAdminChartData] = useState();

  const dispatch = useDispatch();

  // fetching all applications
  useEffect(() => {
    setIsLoading(true);

    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_HOST
          }/api/user/get_all_applications`,
          { withCredentials: true }
        );

        setIsLoading(false);
        if (response?.status === 200) {
          dispatch(addApplication(response.data));
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchApplications();
  }, []);

  // catgorizing applications accordig to their status
  useEffect(() => {
    let tempPendingApp = [];
    let tempApprovedApp = [];
    let tempDeclinedApp = [];

    applicationsData?.forEach((app) => {
      if (app.status == "pending") {
        tempPendingApp.push(app);
      } else if (app.status == "approved") {
        tempApprovedApp.push(app);
      } else {
        tempDeclinedApp.push(app);
      }
    });

    setPendingApplications(tempPendingApp);
    setApprovedApplications(tempApprovedApp);
    setDeclinedApplications(tempDeclinedApp);
  }, [applicationsData]);

  // extractig informatio for chart
  useEffect(() => {
    if (applicationsData) {
      // Create a copy of the array before sorting
      const sortedApplicationsData = [...applicationsData];

      // Sorting the copied array according to dates
      sortedApplicationsData.sort(
        (a, b) => new Date(a.appliedAt) - new Date(b.appliedAt)
      );

      // Arrays to store dates and number of applications per day
      let dates = [];
      let noOfApplicationsPerDay = [];

      // Variables for tracking applications per day
      let applies = 0;
      let currDate = null;

      // Loop through the sorted applications data
      for (let i = 0; i < sortedApplicationsData.length; i++) {
        // Get the applied date as a string
        const appliedDate = new Date(sortedApplicationsData[i].appliedAt)
          .toISOString()
          .split("T")[0];

        // Initialize currDate if it's the first iteration
        if (currDate === null) {
          currDate = appliedDate;
        }

        // Check if the current date is the same as the applied date
        if (currDate === appliedDate) {
          applies++;
        } else {
          // If the date changes, push the previous date and the count to arrays
          dates.push(currDate);
          noOfApplicationsPerDay.push(applies);

          // Reset applies for the new date
          applies = 1;

          // Update currDate to the new date
          currDate = appliedDate;
        }
      }

      // Add the last date and its count after the loop ends
      if (currDate !== null) {
        dates.push(currDate);
        noOfApplicationsPerDay.push(applies);
      }

      // Prepare chart data for rendering
      const tempChartData = {
        labels: dates,
        datasets: [
          {
            label: "Number of Applications",
            data: noOfApplicationsPerDay,
            backgroundColor: "rgb(26, 77, 218)",
            borderWidth: 1,
          },
        ],
      };

      // Set the chart data in the state
      setAdminChartData(tempChartData);
    }
  }, [applicationsData]);

  return (
    <div className="home-main">
      {isLoading ? (
        <span
          className="loader-blue"
          style={{ marginTop: "35vh", marginLeft: "48%" }}
        ></span>
      ) : (
        <>
          <section className="home-stats-container">
            <div className="home-stats">
              <div className="home-status-logo-container">
                <MdPendingActions size={25} />
              </div>
              <div className="home-stats-desc">
                <p>Pending Applications</p>
              </div>
              <h2>{pendingApplications?.length}</h2>
            </div>
            <div className="home-stats">
              <div className="home-status-logo-container">
                <SlCalender size={25} />
              </div>
              <div className="home-stats-desc">
                <p>Approved Applications</p>
              </div>
              <h2>{approvedApplications?.length}</h2>
            </div>
            <div className="home-stats">
              <div className="home-status-logo-container">
                <IoHandRightOutline size={25} />
              </div>
              <div className="home-stats-desc">
                <p>Declined Applications</p>
              </div>
              <h2>{declinedApplications?.length}</h2>
            </div>
          </section>

          {userInfo?.isAdmin && adminChartData && (
            <section className="home-chart-container">
              <div className="chart-container">
                <Bar
                  data={adminChartData}
                  options={{
                    plugins: {
                      title: {
                        display: true,
                        text: "Applications recieved",
                      },
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        grid: {
                          display: false,
                        },
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default AdminHome;
