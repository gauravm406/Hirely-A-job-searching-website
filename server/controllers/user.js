import User from "../models/user.js";
import Job from "../models/job.js";
import generateToken from "../utils/generateToken.js";

// crate user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json("User already exists");
    } else {
      // create user
      const user = await User.create({
        name,
        email,
        password,
      });

      if (user) {
        // generate token
        generateToken(res, user._id);

        res.status(200).json({
          user,
        });
      } else {
        res.status(400).json("Invalid user data");
      }
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

export const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      // Generate token
      generateToken(res, user._id);

      res.status(200).json({
        user,
      });
    } else {
      res.status(401).json("Invalid email or password");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

// logout
export const logoutUser = async (req, res) => {
  res
    .clearCookie("jwt")
    .status(200)
    .json({ message: "Logged out successfully" });
};

export const updateUser = async (req, res) => {
  const { userId, firstName, lastName, location, email, bio } = req.body;

  try {
    const user = await User.findById({ _id: userId });

    if (user) {
      user.email = email || user.email;
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.LastName;
      user.location = location || user.location;
      user.bio = bio || user.bio;
    }

    // save updated password
    const updatedUser = await user.save();

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

// bookmark item
export const bookmarkItem = async (req, res) => {
  const { userId, jobId } = req.body;

  try {
    const user = await User.findById({ _id: userId });

    if (user) {
      const bookmarkIndex = user.bookmarkItems.findIndex(
        (item) => item.job.toString() === jobId.toString()
      );
      if (bookmarkIndex !== -1) {
        // If the job is already bookmarked, remove it
        user.bookmarkItems.splice(bookmarkIndex, 1);
      } else {
        // If the job is not bookmarked, add it
        user.bookmarkItems.push({ job: jobId });
      }
    }

    // save updated password
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

// apply job
export const apply = async (req, res) => {
  const { userId, jobId } = req.body;

  try {
    const user = await User.findById({ _id: userId });

    if (user) {
      user.appliedJobs.push({ job: jobId });
      // user.appliedJobs = [];
    }

    // save updated password
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

// admin user -->
// get all information about all job applications
// Import necessary modules
export const getAllApplications = async (req, res) => {
  try {
    // Find users with non-empty appliedJobs arrays
    const usersWithApplications = await User.find({
      appliedJobs: { $exists: true, $ne: [] },
    });

    // Retrieve job details for each application and map them to a structured format
    const applications = await Promise.all(
      usersWithApplications.map(async (user) => {
        // Map over each applied job for the user
        const tempApp = await Promise.all(
          user.appliedJobs.map(async (job) => {
            // Retrieve job details from the Job collection
            const jobDetails = await Job.findById(job.job);
            // Structure the application information
            return {
              ...jobDetails.toObject(), // Convert jobDetails to plain object
              status: job.status,
              userId: user._id,
              applicationId: job._id,
              appliedAt: job.appliedAt,
            };
          })
        );

        return tempApp;
      })
    );

    // Flatten the nested array of applications
    const flattenedApplications = applications.flat();

    // Return the flattened applications as a JSON response
    return res.status(200).json(flattenedApplications);
  } catch (error) {
    // Handle any errors that occur during the process
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// get applicant details and job details
export const getApplicantionDetails = async (req, res) => {
  const { userId, applicationId, status } = req.body;
  try {
    if (userId && applicationId) {
      const user = await User.findById(userId);

      let applicationDetails = user.appliedJobs.filter(
        (item) => item._id == applicationId
      );

      if (status) {
        user.appliedJobs.forEach((item) => {
          if (item._id == applicationId) {
            item.status = status;
          }
        });

        await user.save();
      }

      const jobDetails = await Job.findById(applicationDetails[0].job);

      res.status(200).json({
        user: user,
        applicationDetails: applicationDetails,
        jobDetails: jobDetails,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
