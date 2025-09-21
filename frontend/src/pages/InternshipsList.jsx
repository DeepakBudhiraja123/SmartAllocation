import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { InternshipContext } from "../../context/internshipsContext";
import { MatchResultsContext } from "../../context/matchResultContext";

// Badge color based on filtered students vs slots
const getScoreColor = (filteredCount, slots) => {
  if (filteredCount > slots) return "bg-green-500 text-white";
  if (filteredCount === slots) return "bg-yellow-400 text-black";
  return "bg-red-500 text-white";
};

export default function InternshipsList() {
  const { internships, fetchInternships } = useContext(InternshipContext);
  const { matchResults, fetchMatchResults } = useContext(MatchResultsContext);

  const [internshipsWithScore, setInternshipsWithScore] = useState([]);

  useEffect(() => {
    fetchInternships();
    fetchMatchResults();
  }, []);
  console.log(matchResults);
  console.log(internships);
  
  
  useEffect(() => {
    if (internships.length > 0) {
      const combined = internships.map((internship) => {
        const match = matchResults.find(
          (m) => m.internship_id === internship._id
        );

        const filteredStudents = match ? match.candidates.length : 0;

        return { ...internship, filteredStudents };
      });
      setInternshipsWithScore(combined);
    }
  }, [internships, matchResults]);

  return (
    <div className="p-6">
      <h3 className="text-4xl font-bold mb-6 text-gray-800">
        🚀 Available Internships
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {internshipsWithScore.map((item) => {
          const scoreColor = getScoreColor(item.filteredStudents, item.slots);

          return (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 relative flex flex-col"
            >
              {/* Filtered Students Badge */}
              <div
                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-bold ${scoreColor}`}
              >
                Match Score: {item.filteredStudents}
              </div>

              {/* Card Content */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={item.logo}
                  alt={item.company_name}
                  className="w-12 h-12 rounded-full object-contain bg-white p-1 border"
                />
                <div>
                  <h4 className="text-lg font-semibold">{item.role_title}</h4>
                  <p className="text-sm text-gray-600">{item.company_name}</p>
                </div>
              </div>

              <p className="text-sm">
                <strong>Location:</strong> {item.location}
              </p>
              <p className="text-sm">
                <strong>Stipend:</strong> {item.stipend}
              </p>
              <p className="text-sm">
                <strong>GPA:</strong> {item.min_cgpa}+
              </p>
              <p className="text-sm">
                <strong>Slots Available:</strong> {item.slots}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mt-3">
                {item.required_skills?.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Small Button */}
              <div className="mt-3 flex justify-end">
                <Link to={`/internship/${item._id}`}>
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
