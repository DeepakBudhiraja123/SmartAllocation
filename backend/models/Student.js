import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    student_id: { type: String, required: true, unique: true },
    full_name: { type: String, required: true },
    location: { type: String, required: true },
    pin_code: { type: String, required: true },
    skills: { type: [String], required: true }, // array of skills
    cgpa: { type: Number, required: true },
    highest_degree: { type: String, required: true }, // e.g., B.Tech, M.Tech
    stream: { type: String, required: true }, // e.g., CSE, ECE
    past_participation: { type: Boolean, default: false },
    positions_of_responsibility: { type: String }, // e.g., "Class Rep, Club Head"
    preferred_locations: { type: [String] }, // multiple cities allowed
    preferred_sectors: { type: [String] }, // multiple sectors allowed
    rural_or_urban: { type: String, enum: ["Rural", "Urban"] },
    social_category: { type: String }, // e.g., General, OBC, SC, ST
    projects: { type: String } // comma-separated projects
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;