import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/user.js";

// protect route
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // get token from the cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get users details excluding password
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorised, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorised, no token");
  }
});

// check user is admin or not
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorised as admin");
  }
};
