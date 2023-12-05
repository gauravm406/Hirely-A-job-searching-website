import express from "express";
import { protect, admin } from "../middleware/auth.js";
import { getJobs, getJobById, createJob } from "../controllers/jobs.js";
const router = express.Router();

router.get("/get_jobs", protect, getJobs);

router.get("/get_job_by_id/:jobId", protect, getJobById);

router.post("/post_job", protect, admin, createJob);

export default router;
