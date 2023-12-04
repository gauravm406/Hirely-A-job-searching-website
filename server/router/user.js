import express from "express";
const router = express.Router();
import { protect, admin } from "../middleware/auth.js";

import {
  registerUser,
  authUser,
  logoutUser,
  updateUser,
  bookmarkItem,
  apply,
  getAllApplications,
  getApplicantionDetails,
} from "../controllers/user.js";

router.post("/register", registerUser);

router.post("/login", authUser);

router.get("/logout", logoutUser);

router.put("/update_user", protect, updateUser);

router.post("/bookmark_item", protect, bookmarkItem);

router.post("/apply", protect, apply);

router.get("/get_all_applications", protect, admin, getAllApplications);

router.put("/get_application_details", protect, admin, getApplicantionDetails);

export default router;
