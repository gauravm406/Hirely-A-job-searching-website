import Job from "../models/job.js";

//  get all jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.status(200).json({ jobs });
  } catch (error) {
    console.log(error);
  }
};

// get job by id
export const getJobById = async (req, res) => {
  const jobId = req.params.jobId;

  try {
    const job = await Job.findById(jobId);

    if (job) {
      res.status(200).json(job);
    } else {
      res.status(404).json("Resource not found");
    }
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};
