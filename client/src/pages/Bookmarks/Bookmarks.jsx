import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useSelector } from "react-redux";
import { JobCard } from "../../components/index";
import { toast } from "react-toastify";
import s from "./bookmarks.module.css";

const Bookmarks = () => {
  const [jobsData, setJobsData] = useState();
  const [isJobsFetching, setIsJobsFetching] = useState(false);
  const [currPage, setCurrPage] = useState(1);

  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    const fetchJobs = async () => {
      // loader
      setIsJobsFetching(true);

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_HOST}/api/job/get_bookmarks_jobs/${
            userInfo._id
          }`,
          { withCredentials: true }
        );

        // store respone in state
        if (response.status == 200) {
          setJobsData(response.data.jobs);
        }
      } catch (error) {
        toast.error(error.response.data.message || error.message);
      } finally {
        setIsJobsFetching(false);
      }
    };

    fetchJobs();
  }, [userInfo]);

  let itemsPerPage = 6;
  let totalPages = Math.ceil(jobsData?.length / itemsPerPage);
  let lastIndex = currPage * itemsPerPage;
  let firstIndex = lastIndex - itemsPerPage;

  return (
    <div className={s.all_jobs_main}>
      {isJobsFetching ? (
        <span className="loader-blue"></span>
      ) : (
        <div className={s.all_jobs}>
          <section className={s.jobs_grid}>
            {jobsData?.map(
              (job, index) =>
                index >= firstIndex &&
                index < lastIndex && <JobCard key={index} job={job} />
            )}
          </section>

          <section className={s.job_pagination_container}>
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
                          ? s.active_page_btn
                          : s.inactive_page_btn
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

export default Bookmarks;
