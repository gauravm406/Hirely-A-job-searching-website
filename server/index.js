import express from "express";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
import cookieParser from "cookie-parser";
import { connectToDatabse } from "./config/db.js";
import userRoutes from "./router/user.js";
import jobRoutes from "./router/job.js";
import uploadRoutes from "./router/upload.js";

// database connection
connectToDatabse();

// app
const app = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// origin configurations
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
});

// Sample route
app.get("/", (req, res) => {
  res.send("Hello world");
});

const PORT = process.env.PORT || 5000;

// api routes
app.use("/api/user", userRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/upload", uploadRoutes);

// making upload folder static
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.listen(PORT, () => {
  console.log(`Server is runnig on port ${PORT}`);
});
