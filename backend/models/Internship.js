import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    company_name: { type: String, required: true },
    role_title: { type: String, required: true },
    location: { type: String, required: true },
    pin_code: { type: String, required: true },
    remote_option: { type: String, enum: ["Yes", "No"], default: "No" },
    required_skills: { type: [String], default: [] },
    min_cgpa: { type: Number, required: true },
    degree_eligibility: { type: [String], default: [] },
    stream_eligibility: { type: [String], default: [] },
    preferred_sectors: { type: [String], default: [] },
    slots: { type: Number, required: true },
    diversity_focus: { type: String, default: "" },
    past_participation_preference: { type: Boolean, default: false },
    duration_weeks: { type: Number, required: true },
    stipend: { type: Number, required: true },
    logo: { type: String, default: "" } // URL to company logo
  },
  { timestamps: true }
);

const Internship = mongoose.model("Internship", internshipSchema);
export default Internship;
