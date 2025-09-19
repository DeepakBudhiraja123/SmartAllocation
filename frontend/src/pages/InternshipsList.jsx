import React from "react";
import { Link } from "react-router-dom";
import { internshipDummyData } from "../assets/assets"; // ✅ Correct path

// Badge color helper
const getScoreColor = (score) => {
  if (score > 25) return "bg-green-500 text-white";
  if (score > 15) return "bg-yellow-400 text-black";
  return "bg-red-500 text-white";
};

export default function InternshipsList() {
  return (
    <div className="p-6">
      <h3 className="text-4xl font-bold mb-6 text-gray-800">
        🚀 Available Internships
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {internshipDummyData.map((item, idx) => {
          const scoreColor = getScoreColor(item.matchScore);

          return (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 relative flex flex-col"
            >
              {/* Score Badge */}
              <div
                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-bold ${scoreColor}`}
              >
                Match {item.matchScore}
              </div>

              {/* Card Content */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={item.pic}
                  alt={item.company}
                  className="w-12 h-12 rounded-full object-contain bg-white p-1 border"
                />
                <div>
                  <h4 className="text-lg font-semibold">{item.role}</h4>
                  <p className="text-sm text-gray-600">{item.company}</p>
                </div>
              </div>

              <p className="text-sm"><strong>Location:</strong> {item.location}</p>
              <p className="text-sm"><strong>Stipend:</strong> {item.stipend}</p>
              <p className="text-sm"><strong>GPA:</strong> {item.gpa_barrier}+</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mt-3">
                {item.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Small Button - aligned right */}
              <div className="mt-3 flex justify-end">
                <Link to={`/internship/${idx}`}>
                  <button className="text-xs px-3 py-1 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-50 transition">
                    View →
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
