import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  stipend: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  qualifications: {
    type: String,
    default: ""
  },
  gpaRequirement: {
    type: Number,
    required: true
  },
  skillsRequired: {
    type: [String],   // array of skills
    default: []
  },
  icon: {
    type: String,
    default: ""
  }
}, { timestamps: true });

const Internship = mongoose.model("Internship", internshipSchema);

export default Internship;
