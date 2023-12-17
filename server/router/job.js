import express from "express";
import { protect, admin } from "../middleware/auth.js";
import {
  getJobs,
  getJobById,
  createJob,
  getLocations,
  getBookmarksJobs,
  getAppliedJobs,
} from "../controllers/jobs.js";
const router = express.Router();

router.get(
  "/get_jobs/:currentPage/:searchQuery/:selectedLocation/:experience",
  protect,
  getJobs
);

router.get("/get_locations", protect, getLocations);

router.get("/get_job_by_id/:jobId", protect, getJobById);

router.get("/get_bookmarks_jobs/:userId", protect, getBookmarksJobs);

router.get("/get_applied_jobs/:userId", protect, getAppliedJobs);

router.post("/post_job", protect, admin, createJob);

export default router;
