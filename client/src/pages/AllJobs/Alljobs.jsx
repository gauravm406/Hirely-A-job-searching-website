import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import "./alljobs.css";
import JobCard from "../../components/JobCard/JobCard";

const Alljobs = () => {
  const [jobsData, setJobsData] = useState();
  const [locations, setLocations] = useState(["any"]);
  const [highestExp, setHighestExp] = useState(0);
  const [isJobsFetching, setIsJobsFetching] = useState(false);
  const [sortByValue, setSortByValue] = useState("Experience (Lowest)");
  const [selectedLocation, setSelectedLocation] = useState("any");
  const [selectedExperience, setSelectedExperience] = useState("any");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState();
  const [currPage, setCurrPage] = useState(1);

  const sortByFilters = [
    "Experience (Lowest)",
    "Experience (Highest)",
    "Title (A-Z)",
    "Title (Z-A)",
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      // loader
      setIsJobsFetching(true);

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_HOST}/api/job/get_jobs`,
          { withCredentials: true }
        );

        setIsJobsFetching(false);

        // store respone in state
        if (response.status == 200) {
          setJobsData(response.data.jobs);
        }
      } catch (error) {
        setIsJobsFetching(false);
        console.log(error);
        toast.error(error.response.data.message || error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };

    fetchJobs();
  }, []);

  // get unique locations
  useEffect(() => {
    if (jobsData) {
      const uniqueLocations = Array.from(
        new Set([
          ...locations,
          ...jobsData.flatMap((job) =>
            job.location.map((loc) => loc.toLowerCase())
          ),
        ])
      );

      setLocations([...uniqueLocations]);
    }
  }, [jobsData]);

  // get highest experience
  useEffect(() => {
    let highExp = 0;

    jobsData?.forEach((job) => {
      if (job.experience > highExp) {
        highExp = job.experience;
      }
    });

    setHighestExp(highExp);
  }, [jobsData]);

  useEffect(() => {
    if (jobsData) {
      let tempJobs = jobsData?.filter((job) =>
        job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (selectedLocation !== "any") {
        tempJobs = tempJobs.filter((job) =>
          job.location
            .map((loc) => loc.toLowerCase())
            .includes(selectedLocation.toLowerCase())
        );
      }

      if (selectedExperience !== "any") {
        tempJobs = tempJobs.filter(
          (job) => job.experience == selectedExperience
        );
      }

      if (sortByValue === "Experience (Lowest)") {
        tempJobs.sort((a, b) => a.experience - b.experience);
      }

      if (sortByValue === "Experience (Highest)") {
        tempJobs.sort((a, b) => b.experience - a.experience);
      }

      if (sortByValue === "Title (Z-A)") {
        tempJobs.sort((a, b) => {
          if (a.jobTitle > b.jobTitle) {
            return -1;
          } else if (a.jobTitle < b.jobTitle) {
            return 1;
          } else {
            return 0;
          }
        });
      }

      if (sortByValue === "Title (A-Z)") {
        tempJobs.sort((a, b) => {
          if (a.jobTitle > b.jobTitle) {
            return 1;
          } else if (a.jobTitle < b.jobTitle) {
            return -1;
          } else {
            return 0;
          }
        });
      }

      setFilteredJobs([...tempJobs]);
    }
  }, [
    jobsData,
    searchQuery,
    selectedLocation,
    selectedExperience,
    sortByValue,
  ]);

  // set filteres to default
  const handleClearFilters = () => {
    setSortByValue("Experience (Lowest)");
    setSelectedLocation("any");
    setSelectedExperience("any");
    setSearchQuery("");
    setCurrPage(1);
  };

  let itemsPerPage = 6;
  let totalPages = Math.ceil(filteredJobs?.length / itemsPerPage);
  let lastIndex = currPage * itemsPerPage;
  let firstIndex = lastIndex - itemsPerPage;

  return (
    <div className="all-jobs-main">
      {isJobsFetching ? (
        <span className="loader-blue"></span>
      ) : (
        <div className="all-jobs">
          <section className="all-jobs-filters-container">
            <input
              className="search-bar"
              type="text"
              placeholder="Search by job title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              {locations.map((loc, index) => (
                <option key={index} value={loc}>
                  {loc}
                </option>
              ))}
            </select>

            <select
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
            >
              <option value="any">any</option>
              {Array.from({ length: highestExp }, (_, index) => index + 1).map(
                (exp, index) => (
                  <option key={index} value={exp}>
                    {exp}
                  </option>
                )
              )}
            </select>

            <button onClick={handleClearFilters}>Clear filters</button>
          </section>

          <section className="job-length-sort-filter-container">
            <div className="job-p-length-head">
              <p>{filteredJobs?.length} products found</p>
            </div>

            <div className="job-sort-filter">
              <p>sort by</p>
              <select
                value={sortByValue}
                onChange={(e) => setSortByValue(e.target.value)}
              >
                {sortByFilters?.map((ele, index) => (
                  <option key={index} value={ele}>
                    {ele}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <section className="jobs-grid">
            {filteredJobs?.map(
              (job, index) =>
                index >= firstIndex &&
                index < lastIndex && <JobCard key={index} job={job} />
            )}
          </section>

          <section className="job-pagination-container">
            <button onClick={() => setCurrPage(1)}>
              <MdOutlineKeyboardDoubleArrowLeft />
            </button>
            <button
              onClick={() => {
                if (currPage <= 1) {
                  setCurrPage(1);
                } else {
                  setCurrPage(currPage - 1);
                }
              }}
            >
              <MdOutlineKeyboardArrowLeft />
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNum) => {
                return (
                  pageNum >= currPage - 1 &&
                  pageNum <= currPage + 1 && (
                    <button
                      key={pageNum}
                      className={
                        pageNum === currPage
                          ? "active-page-btn"
                          : "inactive-page-btn"
                      }
                      onClick={() => setCurrPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  )
                );
              }
            )}
            <button
              onClick={() => {
                if (currPage >= totalPages) {
                  setCurrPage(totalPages);
                } else {
                  setCurrPage(currPage + 1);
                }
              }}
            >
              <MdOutlineKeyboardArrowRight />
            </button>
            <button onClick={() => setCurrPage(totalPages)}>
              <MdOutlineKeyboardDoubleArrowRight />
            </button>
          </section>
        </div>
      )}
    </div>
  );
};

export default Alljobs;
