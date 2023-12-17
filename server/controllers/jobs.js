import Job from "../models/job.js";
import User from "../models/user.js";

//  get jobs
export const getJobs = async (req, res) => {
  let {
    currentPage = 1,
    searchQuery,
    selectedLocation,
    experience,
  } = req.params;

  const pageSize = 6;
  try {
    // search query
    const keyword =
      searchQuery.length < 3 || searchQuery === "default"
        ? {}
        : { jobTitle: { $regex: searchQuery, $options: "i" } };

    // experience
    experience = experience === "any" ? {} : { experience: experience };

    // location filter here location is an array
    const locationFilter =
      selectedLocation && selectedLocation.toLowerCase() !== "any"
        ? {
            location: {
              $elemMatch: { $regex: new RegExp(selectedLocation, "i") },
            },
          }
        : {};

    const jobs = await Job.find({
      ...keyword,
      ...experience,
      ...locationFilter,
    })
      .limit(pageSize)
      .skip(pageSize * (currentPage - 1));

    // count number of documents
    const count = await Job.countDocuments({
      ...keyword,
      ...experience,
      ...locationFilter,
    });

    res.status(200).json({
      jobs,
      pages: Math.ceil(count / pageSize),
      totalJobs: count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get job locations
export const getLocations = async (req, res) => {
  try {
    let set = new Set();

    let jobs = await Job.find({});

    jobs.forEach((item) => {
      let locations = item.location.map((ele) => {
        return ele.toLowerCase();
      });

      set.add(...locations);
    });

    const uniqueLocations = [...set];

    res.status(200).json({ locations: uniqueLocations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
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

export const createJob = async (req, res) => {
  const {
    image,
    jobTitle,
    companyName,
    experience,
    description,
    location,
    user,
  } = req.body;

  try {
    const job = new Job({
      image,
      jobTitle,
      companyName,
      experience,
      description,
      location,
      user,
    });

    const createdJob = await job.save();

    res.status(200).json({ message: "Job posted successfully", createdJob });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

export const getBookmarksJobs = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    const bookmarkJobsPromises = user.bookmarkItems.map(
      async (item) => await Job.findById(item.job)
    );

    const bookmarkJobs = await Promise.all(bookmarkJobsPromises);

    res.status(200).json({ jobs: bookmarkJobs });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

export const getAppliedJobs = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    const appliedJobsPromises = user.appliedJobs.map(
      async (item) => await Job.findById(item.job)
    );

    const appliedJobs = await Promise.all(appliedJobsPromises);

    res.status(200).json({ jobs: appliedJobs });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};
