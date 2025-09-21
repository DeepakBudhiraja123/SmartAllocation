// routes/studentRoutes.js
import express from "express";
import { addStudent, getAllStudents } from "../controllers/studentController.js";

const studentRouter = express.Router();

// Add a student
studentRouter.post("/addStudent", addStudent);
// Get all students
studentRouter.get("/getStudent", getAllStudents);

export default studentRouter;