import Internship from "../models/Internship.js";

export const createInternship = async (req, res) => {
  try {
    const {
      icon,
      title,
      company,
      location,
      stipend,
      gpaRequirement,
      skillsRequired,
      qualifications
    } = req.body;

    if (!title || !company || !location || !stipend) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: title, company, location, stipend"
      });
    }

    const skillsArray = skillsRequired
      ? skillsRequired.split(",").map((s) => s.trim())
      : [];

    const newInternship = new Internship({
      icon,
      title,
      company,
      location,
      stipend,
      gpaRequirement,
      skillsRequired: skillsArray,
      qualifications
    });

    await newInternship.save();

    res.status(201).json({
      success: true,
      message: "Internship created successfully",
      data: newInternship
    });
  } catch (err) {
    console.error("Error creating internship:", err);
    res.status(500).json({
      success: false,
      message: "Server error while creating internship"
    });
  }
};

export const getInternships = async (req, res) => {
  try {
    const internships = await Internship.find().sort({ createdAt: -1 }); // newest first

    res.status(200).json({
      success: true,
      data: internships
    });
  } catch (err) {
    console.error("Error fetching internships:", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching internships"
    });
  }
};
