import Internship from "../models/Internship.js";

// Create a new internship
export const createInternship = async (req, res) => {
  try {
    const {
      internship_id,
      company_name,
      role_title,
      location,
      pin_code,
      remote_option,
      required_skills,
      min_cgpa,
      degree_eligibility,
      stream_eligibility,
      preferred_sectors,
      slots,
      diversity_focus,
      past_participation_preference,
      duration_weeks,
      stipend,
    } = req.body;

    // Check mandatory fields
    if (
      !internship_id ||
      !company_name ||
      !role_title ||
      !location ||
      !pin_code ||
      !min_cgpa ||
      !slots ||
      !duration_weeks ||
      !stipend
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: internship_id, company_name, role_title, location, pin_code, min_cgpa, slots, duration_weeks, stipend are mandatory",
      });
    }

    // Check if internship_id already exists
    const existing = await Internship.findOne({ internship_id });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "An internship with this internship_id already exists",
      });
    }

    // Convert comma-separated strings to arrays
    const skillsArray = required_skills
      ? required_skills.split(",").map((s) => s.trim())
      : [];
    const degreeArray = degree_eligibility
      ? degree_eligibility.split(",").map((d) => d.trim())
      : [];
    const streamArray = stream_eligibility
      ? stream_eligibility.split(",").map((s) => s.trim())
      : [];
    const sectorsArray = preferred_sectors
      ? preferred_sectors.split(",").map((s) => s.trim())
      : [];

    // Create internship document
    const newInternship = new Internship({
      internship_id,
      company_name,
      role_title,
      location,
      pin_code,
      remote_option: remote_option || "No",
      required_skills: skillsArray,
      min_cgpa,
      degree_eligibility: degreeArray,
      stream_eligibility: streamArray,
      preferred_sectors: sectorsArray,
      slots,
      diversity_focus,
      past_participation_preference: past_participation_preference || false,
      duration_weeks,
      stipend,
    });

    await newInternship.save();

    res.status(201).json({
      success: true,
      message: "Internship created successfully",
      data: newInternship,
    });
  } catch (err) {
    console.error("Error creating internship:", err);
    res.status(500).json({
      success: false,
      message: "Server error while creating internship",
      error: err.message,
    });
  }
};

// Get all internships
export const getInternships = async (req, res) => {
  try {
    const internships = await Internship.find().sort({ createdAt: -1 }); // newest first

    res.status(200).json({
      success: true,
      data: internships,
    });
  } catch (err) {
    console.error("Error fetching internships:", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching internships",
      error: err.message,
    });
  }
};
s