import { useEffect, useState } from "react";
import { MdPendingActions } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { IoHandRightOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import { Helmet } from "react-helmet";

const Userhome = () => {
  const [pendingApplications, setPendingApplications] = useState([]);
  const [approvedApplications, setApprovedApplications] = useState([]);
  const [declinedApplications, setDeclinedApplications] = useState([]);
  const [userChartData, setUserChartData] = useState();
  const userInfo = useSelector((state) => state.user.userInfo);

  // getting pending applications
  useEffect(() => {
    const tempPendingApp = userInfo?.appliedJobs?.filter(
      (item) => item.status === "pending"
    );

    const tempApprovedApp = userInfo?.appliedJobs?.filter(
      (item) => item.status === "approved"
    );

    const tempDeclinedApp = userInfo?.appliedJobs?.filter(
      (item) => item.status === "declined"
    );

    setPendingApplications(tempPendingApp);
    setApprovedApplications(tempApprovedApp);
    setDeclinedApplications(tempDeclinedApp);
  }, [userInfo]);

  // getting date and jobs applied on that date
  useEffect(() => {
    let tempData = [];
    let applies = 0;
    let currDate = null;
    let dates = [];

    userInfo?.appliedJobs.forEach((item) => {
      const appliedDate = new Date(item.appliedAt).toISOString().split("T")[0];

      if (!dates.includes(appliedDate)) {
        dates.push(appliedDate);
      }

      if (currDate !== appliedDate) {
        if (currDate !== null) {
          tempData.push({ applies, date: currDate });
        }
        currDate = appliedDate;
        applies = 1;
      } else {
        applies++;
      }
    });

    // Push the last set of data
    if (currDate !== null) {
      tempData.push({ applies, date: currDate });
    }

    // Extract applies values into a separate array
    const appliesValues = tempData.map((dataPoint) => dataPoint.applies);

    const tempChartData = {
      labels: dates,
      datasets: [
        {
          label: "Number of Applications",
          data: appliesValues,
          backgroundColor: "rgb(26, 77, 218)", // Change the color
          borderWidth: 1,
        },
      ],
    };

    setUserChartData(tempChartData);
  }, [userInfo]);

  return (
    <>
      {/* SEO CONFIGURATIONS */}
      <Helmet>
        <title>{`${userInfo?.name} - Hirely.com`}</title>
        <meta name="description" content={userInfo?.description} />
        <meta property="og:title" content={`${userInfo?.name} - Hirely.com`} />
      </Helmet>

      {!userInfo.isAdmin && (
        <div className="home-main">
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

          {!userInfo?.isAdmin && userChartData && (
            <section className="home-chart-container">
              <div className="chart-container">
                <Bar
                  data={userChartData}
                  options={{
                    plugins: {
                      title: {
                        display: true,
                        text: "Applications sent",
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
        </div>
      )}
    </>
  );
};

export default Userhome;
