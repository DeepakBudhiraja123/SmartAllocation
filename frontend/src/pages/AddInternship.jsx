import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { InternshipContext } from "../../context/internshipsContext";

export default function AddInternshipForm() {
  const { addInternship } = useContext(InternshipContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    logo: "",
    role_title: "",
    company_name: "",
    location: "",
    pin_code: "",
    remote_option: "No",
    required_skills: "",
    min_cgpa: "",
    degree_eligibility: "",
    stream_eligibility: "",
    preferred_sectors: "",
    slots: "",
    diversity_focus: "",
    past_participation_preference: false,
    duration_weeks: "",
    stipend: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      ...formData,
      min_cgpa: Number(formData.min_cgpa),
      slots: Number(formData.slots),
      duration_weeks: Number(formData.duration_weeks),
      stipend: Number(formData.stipend),
    };

    try {
      await addInternship(body);
      navigate("/internships");
    } catch (err) {
      toast.error(err.message || "❌ Something went wrong");
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto mt-10 p-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ---------- Form ---------- */}
        <div className="bg-white shadow-lg rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-bold mb-4">➕ Add New Internship</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-medium mb-1">Logo URL</label>
                <input
                  type="text"
                  name="logo"
                  value={formData.logo}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 w-full"
                  placeholder="https://example.com/logo.png"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Company Name</label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Role Title</label>
                <input
                  type="text"
                  name="role_title"
                  value={formData.role_title}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 w-full"
                />
              </div>
            </div>

            {/* Location Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-medium mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Pin Code</label>
                <input
                  type="text"
                  name="pin_code"
                  value={formData.pin_code}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Remote Option</label>
                <select
                  name="remote_option"
                  value={formData.remote_option}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 w-full"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>

            {/* Eligibility */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-medium mb-1">Minimum CGPA</label>
                <input
                  type="number"
                  name="min_cgpa"
                  value={formData.min_cgpa}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Degree Eligibility
                </label>
                <input
                  type="text"
                  name="degree_eligibility"
                  value={formData.degree_eligibility}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 w-full"
                  placeholder="B.Tech, M.Tech"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Stream Eligibility
                </label>
                <input
                  type="text"
                  name="stream_eligibility"
                  value={formData.stream_eligibility}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 w-full"
                  placeholder="CSE, AI"
                />
              </div>
            </div>

            {/* Skills & Sectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">
                  Required Skills
                </label>
                <textarea
                  name="required_skills"
                  value={formData.required_skills}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 w-full h-24"
                  placeholder="Python, AI, ML"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Preferred Sectors
                </label>
                <textarea
                  name="preferred_sectors"
                  value={formData.preferred_sectors}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 w-full h-24"
                  placeholder="IT, Finance"
                />
              </div>
            </div>

            {/* Slots, Diversity, Past Participation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-medium mb-1">Slots</label>
                <input
                  type="number"
                  name="slots"
                  value={formData.slots}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Diversity Focus
                </label>
                <input
                  type="text"
                  name="diversity_focus"
                  value={formData.diversity_focus}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 w-full"
                />
              </div>
              <div className="flex items-center mt-6 space-x-2">
                <input
                  type="checkbox"
                  name="past_participation_preference"
                  checked={formData.past_participation_preference}
                  onChange={handleChange}
                  className="h-5 w-5"
                />
                <label>Past Participation</label>
              </div>
            </div>

            {/* Duration & Stipend */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">
                  Duration (weeks)
                </label>
                <input
                  type="number"
                  name="duration_weeks"
                  value={formData.duration_weeks}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Stipend (₹)</label>
                <input
                  type="number"
                  name="stipend"
                  value={formData.stipend}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 w-full"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Add Internship
            </button>
          </form>
        </div>

        {/* ---------- Live Preview Card ---------- */}
        <div className="flex justify-center h-[40vh] p-6">
          <div className="bg-white shadow-xl rounded-2xl border w-full max-w-xl flex p-4 gap-6 hover:shadow-2xl transition">
            {/* Logo */}
            <div className="flex-shrink-0">
              {formData.logo ? (
                <img
                  src={formData.logo}
                  alt="Logo"
                  className="w-28 h-28 object-contain rounded"
                />
              ) : (
                <div className="w-28 h-28 flex items-center justify-center bg-gray-200 text-gray-500 rounded">
                  Logo
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-xl font-bold text-gray-900">
                  {formData.role_title || "Role Title"}
                </h4>
                <p className="text-gray-700">
                  {formData.company_name || "Company Name"}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  {formData.location || "Location"} | Pin:{" "}
                  {formData.pin_code || "XXXXXX"} | Remote:{" "}
                  {formData.remote_option}
                </p>

                <div className="mt-2 text-sm text-gray-600 space-y-1">
                  <p>Min GPA: {formData.min_cgpa || "X.X"}</p>
                  <p>Slots: {formData.slots || 0}</p>
                  <p>Duration: {formData.duration_weeks || 0} wks</p>
                  <p>Stipend: ₹{formData.stipend || 0}</p>
                  <p>Diversity: {formData.diversity_focus || "Any"}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {(formData.required_skills
                  ? formData.required_skills.split(",").map((s) => s.trim())
                  : ["Skills"]
                ).map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
