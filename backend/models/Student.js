import mongoose from "mongoose";

const qualificationSchema = new mongoose.Schema({
  program: { type: String, required: true }, // e.g., BTech, MTech
  domain: { type: String, required: true },  // e.g., CSE, ECE
  GPA: { type: Number, required: true }
});

const studentSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    location: { type: String, required: true },
    pinCode: { type: String, required: true },
    skills: { type: [String], default: [] },
    qualifications: { type: [qualificationSchema], default: [] },
    email: { type: String, unique: true, sparse: true }, // optional
    password: { type: String, minLength: 6 },           // optional
    profilePic: { type: String, default: "" }           // optional
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
