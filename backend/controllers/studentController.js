// controllers/studentController.js
import Student from "../models/student.js";

// Add a new student
export const addStudent = async (req, res) => {
  try {
    const {
      student_id,
      full_name,
      location,
      pin_code,
      skills,
      cgpa,
      highest_degree,
      stream,
      past_participation,
      positions_of_responsibility,
      preferred_locations,
      preferred_sectors,
      rural_or_urban,
      social_category,
      projects,
    } = req.body;

    // Manual required field checks
    if (
      !student_id ||
      !full_name ||
      !location ||
      !pin_code ||
      !skills ||
      !cgpa ||
      !highest_degree ||
      !stream
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: student_id, full_name, location, pin_code, skills, cgpa, highest_degree, stream are mandatory",
      });
    }

    // Check if student_id already exists
    const existingStudent = await Student.findOne({ student_id });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "A student with this student_id already exists",
      });
    }

    // Create a new student
    const newStudent = new Student({
      student_id,
      full_name,
      location,
      pin_code,
      skills,
      cgpa,
      highest_degree,
      stream,
      past_participation: past_participation || false,
      positions_of_responsibility,
      preferred_locations,
      preferred_sectors,
      rural_or_urban,
      social_category,
      projects,
    });

    await newStudent.save();

    res.status(201).json({
      success: true,
      message: "Student added successfully",
      student: newStudent,
    });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add student",
      error: error.message,
    });
  }
};

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json({
      success: true,
      count: students.length,
      students,
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch students",
      error: error.message,
    });
  }
};
