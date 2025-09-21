import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { InternshipContext } from "../../context/internshipsContext";
import { MatchResultsContext } from "../../context/matchResultContext";
import { StudentsContext } from "../../context/studentsContext"; // for student names

const sortCandidates = (candidates) =>
  [...candidates].sort((a, b) => b.score - a.score);

export default function InternshipDetails() {
  const { id } = useParams();
  const { internships, fetchInternships } = useContext(InternshipContext);
  const { matchResults, fetchMatchResults } = useContext(MatchResultsContext);
  const { students, fetchStudents } = useContext(StudentsContext);

  const [internship, setInternship] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    fetchInternships();
    fetchMatchResults();
    fetchStudents();
  }, []);

  useEffect(() => {
    if (internships.length > 0 && matchResults.length > 0) {
      const intern = internships.find((i) => i._id === id);
      setInternship(intern);

      if (intern) {
        const match = matchResults.find((m) => m.internship_id === intern._id);
        if (match) setCandidates(sortCandidates(match.candidates));
      }
    }
  }, [internships, matchResults, id]);

  const handleCandidateClick = (c) => {
    if (selectedCandidate?.student_id === c.student_id) {
      setSelectedCandidate(null); // toggle off
    } else {
      setSelectedCandidate(c);
    }
  };

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

  return (
    <div className="w-[70vw] py-6 mx-5">
      {/* Back button */}
      <Link
        to="/internships"
        className="inline-block mb-6 text-sm text-blue-600 hover:underline"
      >
        ← Back to internships
      </Link>

      <div className="flex gap-10 items-start">
        {/* Left Column */}
        <div className="flex-1 space-y-6">
          {/* Internship Details */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={internship.logo || "/default-company.png"}
                alt={internship.company_name}
                className="w-16 h-16 rounded-full object-contain bg-white p-2 border"
              />
              <div>
                <h2 className="text-2xl font-bold">{internship.role_title}</h2>
                <p className="text-gray-600">{internship.company_name}</p>
                <p className="text-blue-600 font-semibold">
                  Slots: {internship.slots}
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
              <strong>Min GPA:</strong> {internship.min_cgpa}+
            </p>
            <p>
              <strong>Duration:</strong> {internship.duration_weeks} weeks
            </p>
            <p>
              <strong>Diversity Focus:</strong> {internship.diversity_focus || "None"}
            </p>

            <div className="mt-3">
              <strong>Skills:</strong>
              <div className="flex flex-wrap gap-2 mt-2">
                {internship.required_skills?.map((skill, i) => (
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
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">👥 Matched Candidates</h3>
            {candidates.length > 0 ? (
              <ul className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {candidates.map((c, i) => {
                  const student = students.find((s) => s._id === c.student_id);
                  return (
                    <li
                      key={i}
                      className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition ${
                        selectedCandidate?.student_id === c.student_id
                          ? "bg-blue-100 border border-blue-400"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                      onClick={() => handleCandidateClick(c)}
                    >
                      <span className="font-medium">
                        {student ? student.full_name : "Unknown Student"}
                      </span>
                      <span className="text-sm font-bold text-blue-600">
                        Score: {c.score}
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-gray-500">No candidates matched yet.</p>
            )}
          </div>
        </div>

        {/* Right Column: Candidate Details */}
        <div className="w-1/5 flex flex-col mt-24">
          <div className="bg-white h-[32vh] w-[30vw] p-6 rounded-2xl shadow-md mt-auto">
            {selectedCandidate ? (
              (() => {
                const student = students.find(
                  (s) => s._id === selectedCandidate.student_id
                );
                return student ? (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold">{student.full_name}</h3>
                      {/* Score Circle */}
                      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 border-4 border-blue-500 text-blue-700 font-bold text-lg">
                        {selectedCandidate.score}
                      </div>
                    </div>

                    <p className="text-gray-600 mb-1">
                      <strong>Location:</strong> {student.location}
                    </p>
                    <p className="text-gray-600 mb-1">
                      <strong>Pin Code:</strong> {student.pinCode}
                    </p>

                    <div className="mt-2">
                      <strong>Skills:</strong>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {student.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Student data not found
                  </div>
                );
              })()
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
