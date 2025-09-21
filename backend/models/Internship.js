import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    internship_id: { type: String, required: true, unique: true },
    company_name: { type: String, required: true },
    role_title: { type: String, required: true },
    location: { type: String, required: true },
    pin_code: { type: String, required: true },
    remote_option: { type: String, enum: ["Yes", "No"], default: "No" },
    required_skills: { type: [String], default: [] }, // array of skills
    min_cgpa: { type: Number, required: true },
    degree_eligibility: { type: [String], default: [] }, // array of eligible degrees
    stream_eligibility: { type: [String], default: [] }, // array of eligible streams
    preferred_sectors: { type: [String], default: [] },
    slots: { type: Number, required: true },
    diversity_focus: { type: String, default: "" }, // e.g., SC/ST/OBC
    past_participation_preference: { type: Boolean, default: false },
    duration_weeks: { type: Number, required: true },
    stipend: { type: Number, required: true } // numeric stipend
  },
  { timestamps: true }
);

const Internship = mongoose.model("Internship", internshipSchema);
export default Internship;
