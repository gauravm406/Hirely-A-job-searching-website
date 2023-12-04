import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  jobTitle: {
    type: String,
    required: true,
  },
  location: {
    type: Array,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  reviews: {
    type: Number,
  },
  image: {
    type: String,
    required: true,
  },
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
