import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { internshipDummyData, userDummyData } from "../assets/assets";

const sortCandidates = (candidates) =>
  [...candidates].sort((a, b) => b.score - a.score);

export default function InternshipDetails() {
  const { id } = useParams();
  const internship = internshipDummyData[id];
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  if (!internship) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 font-semibold">Internship not found.</p>
        <Link to="/internships" className="text-blue-500 underline">
          ← Back to list
        </Link>
      </div>
    );
  }

  const candidates = sortCandidates(internship.candidates || []);

  const handleCandidateClick = (c) => {
    if (selectedCandidate?.idx === c.idx) {
      setSelectedCandidate(null); // toggle off
    } else {
      setSelectedCandidate(c);
    }
  };

  return (
    <div className="py-6 max-w-6xl ml-6">
      {/* Back button */}
      <Link
        to="/internships"
        className="inline-block mb-6 text-sm text-blue-600 hover:underline"
      >
        ← Back to internships
      </Link>

      <div className="flex gap-10 items-start">
        {/* Left Column Full */}
        <div className="flex-1 space-y-6">
          {/* Internship Details */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={internship.pic}
                alt={internship.company}
                className="w-16 h-16 rounded-full object-contain bg-white p-2 border"
              />
              <div>
                <h2 className="text-2xl font-bold">{internship.role}</h2>
                <p className="text-gray-600">{internship.company}</p>
                <p className="text-blue-600 font-semibold">
                  Match Score: {internship.matchScore}
                </p>
              </div>
            </div>

            <p>
              <strong>Location:</strong> {internship.location}
            </p>
            <p>
              <strong>Stipend:</strong> {internship.stipend}
            </p>
            <p>
              <strong>GPA Required:</strong> {internship.gpa_barrier}+
            </p>
            <p>
              <strong>Qualifications:</strong> {internship.qualifications}
            </p>

            <div className="mt-3">
              <strong>Skills:</strong>
              <div className="flex flex-wrap gap-2 mt-2">
                {internship.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Matched Candidates */}
          <div className=" rounded-2xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">
              👥 Matched Candidates
            </h3>
            {candidates.length > 0 ? (
              <ul className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {candidates.map((c, i) => (
                  <li
                    key={i}
                    className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition ${
                      selectedCandidate?.idx === c.idx
                        ? "bg-blue-100 border border-blue-400"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                    onClick={() => handleCandidateClick(c)}
                  >
                    <span className="font-medium">
                      {userDummyData[c.idx].fullName}
                    </span>
                    <span className="text-sm font-bold text-blue-600">
                      Score: {c.score}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No candidates matched yet.</p>
            )}
          </div>
        </div>

        {/* Right Column: Candidate Details */}
        <div className="w-1/5 flex flex-col mt-84">
          <div className="bg-white h-[32vh] w-[30vw] p-6 rounded-2xl shadow-md mt-auto">
            {selectedCandidate ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">
                    {userDummyData[selectedCandidate.idx].fullName}
                  </h3>
                  {/* Score Circle */}
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 border-4 border-blue-500 text-blue-700 font-bold text-lg">
                    {selectedCandidate.score}
                  </div>
                </div>

                <p className="text-gray-600 mb-1">
                  <strong>Location:</strong>{" "}
                  {userDummyData[selectedCandidate.idx].location}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Pin Code:</strong>{" "}
                  {userDummyData[selectedCandidate.idx].pinCode}
                </p>

                <div className="mt-2">
                  <strong>Skills:</strong>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {userDummyData[selectedCandidate.idx].skills.map(
                      (skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-full"
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No profile selected
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
