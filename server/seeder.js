import dotenv from "dotenv";
import users from "./data/users.js";
import jobs from "./data/jobs.js";
import User from "./models/user.js";
import Job from "./models/job.js";
import { connectToDatabse } from "./config/db.js";

dotenv.config();

connectToDatabse();

// add experience, reviews and rating
let modifiedJobs = jobs.map((job) => {
  return {
    ...job,
    experience: Math.floor(Math.random() * 10) + 1,
    rating: Number((Math.random() * 5).toFixed(1)),
    reviews: Math.floor(Math.random() * 250) + 1,
  };
});

// create data in database
const importData = async () => {
  try {
    await User.deleteMany();
    await Job.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleJobs = modifiedJobs.map((job) => {
      return { ...job, user: adminUser };
    });

    await Job.insertMany(sampleJobs);
    console.log("data imported");
    process.exit();
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

// destroy data from database
const destroyData = async () => {
  try {
    await Job.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

// terminal commands
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
