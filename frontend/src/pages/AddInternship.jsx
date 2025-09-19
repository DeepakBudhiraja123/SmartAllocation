import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddInternshipForm({
  internships,
  setInternships,
  matched,
  setMatched,
  notMatched,
  setNotMatched,
  lastModelTime,
  setLastModelTime
}) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    image: "",
    title: "",
    company: "",
    location: "",
    stipend: "",
    gpa: "",
    skills: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔹 Increment internships count
    setInternships(internships + 1);

    // 🔹 Reset last model run time
    setLastModelTime("0 min ago");

    // 🔹 First toast: internship added
    toast.success("✅ Internship added successfully!", {
      position: "top-right",
      autoClose: 2000,
    });

    // 🔹 Reset form
    setFormData({
      image: "",
      title: "",
      company: "",
      location: "",
      stipend: "",
      gpa: "",
      skills: "",
    });

    // 🔹 Second toast: model generating matches
    setTimeout(() => {
      toast.info("🤖 Model detected new internship. Generating matches...", {
        position: "top-right",
        autoClose: 5000,
      });
    }, 2100); // after first toast ends

    // 🔹 Navigate to internships after second toast
    setTimeout(() => {
      navigate("/internships");
    }, 7500);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* ---------- Left: Form ---------- */}
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
            ➕ Add New Internship
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Icon / Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  placeholder="Enter image/logo URL"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Internship Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Software Engineering Intern"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  placeholder="Google"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="Bangalore, India"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Stipend
                </label>
                <input
                  type="text"
                  name="stipend"
                  placeholder="₹80,000/month"
                  value={formData.stipend}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Minimum GPA
                </label>
                <input
                  type="text"
                  name="gpa"
                  placeholder="7.5+"
                  value={formData.gpa}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Row 4 */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Skills (comma separated)
              </label>
              <textarea
                name="skills"
                placeholder="Python, C++, Algorithms, Data Structures"
                value={formData.skills}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition shadow"
            >
              Add Internship
            </button>
          </form>
        </div>

        {/* ---------- Right: Live Preview ---------- */}
        <div className="bg-gray-50 shadow-inner rounded-2xl p-8 flex flex-col">
          <h3 className="text-xl font-semibold mb-6 text-gray-700">
            Live Preview
          </h3>

          <div className="w-full bg-white shadow-lg rounded-xl p-6 border hover:shadow-xl transition">
            {formData.image ? (
              <img
                src={formData.image}
                alt="Logo"
                className="w-16 h-16 object-contain mb-4 rounded"
              />
            ) : (
              <div className="w-16 h-16 flex items-center justify-center bg-gray-200 text-gray-500 rounded mb-4">
                Logo
              </div>
            )}

            <h4 className="text-lg font-bold text-gray-900">
              {formData.title || "Software Engineering Intern"}
            </h4>
            <p className="text-gray-600 mb-2">
              {formData.company || "Company Name"}
            </p>

            <div className="space-y-1 text-sm text-gray-600">
              <p>{formData.location || "Location"}</p>
              <p>{formData.stipend || "Stipend"}</p>
              <p>Min GPA: {formData.gpa || "Required GPA"}</p>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {(formData.skills
                ? formData.skills.split(",").map((skill) => skill.trim())
                : ["Python", "C++", "Algorithms"]
              ).map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 transition"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Toast container */}
      <ToastContainer />
    </>
  );
}
