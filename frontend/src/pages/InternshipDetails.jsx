import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { InternshipContext } from "../../context/internshipsContext";
import { MatchResultsContext } from "../../context/matchResultContext";
import { StudentsContext } from "../../context/studentsContext";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

ChartJS.register(ArcElement, Tooltip, Legend);

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
      setSelectedCandidate(null);
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

  // Doughnut data
  const matchedCount = candidates.length;
  const nonMatchedCount = students.length - matchedCount;

  const doughnutData = {
    labels: ["Matched", "Unmatched"],
    datasets: [
      {
        data: [matchedCount, nonMatchedCount > 0 ? nonMatchedCount : 0],
        backgroundColor: ["#3B82F6", "#E5E7EB"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6">
      <Link
        to="/internships"
        className="inline-block mb-4 text-sm text-blue-600 hover:underline"
      >
        ← Back to internships
      </Link>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex gap-8">
        {/* Left: Internship Details & Candidates */}
        <div className="w-32/50 min-w-[400px]">
          {/* Internship Info */}
          <div className="flex items-center gap-6 mb-6">
            <img
              src={internship.logo || "/default-company.png"}
              alt={internship.company_name}
              className="w-20 h-20 rounded-full object-contain bg-white p-2 border"
            />
            <div>
              <h2 className="text-2xl font-bold">{internship.role_title}</h2>
              <p className="text-gray-600">{internship.company_name}</p>
              <p className="text-blue-600 font-semibold">
                Slots: {internship.slots}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <p>
              <strong>Location:</strong> {internship.location}
            </p>
            <p>
              <strong>Stipend:</strong> ₹{internship.stipend}
            </p>
            <p>
              <strong>Min GPA:</strong> {internship.min_cgpa}+
            </p>
            <p>
              <strong>Duration:</strong> {internship.duration_weeks} weeks
            </p>
            <p>
              <strong>Diversity Focus:</strong>{" "}
              {internship.diversity_focus || "None"}
            </p>
            <p>
              <strong>Remote:</strong> {internship.remote_option || "No"}
            </p>
          </div>

          {/* Skills */}
          <div className="mb-6">
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

          {/* Matched Candidates */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-3 border-b border-gray-300 pb-1">
              👥 Matched Candidates
            </h3>
            {candidates.length > 0 ? (
              <ul
                className="space-y-2 overflow-y-auto pr-2 bg-gray-50 p-3 rounded-lg border border-gray-200"
                style={{ maxHeight: "400px" }} // shows 8 items approx
              >
                {candidates.map((c, i) => {
                  const student = students.find((s) => s._id === c.student_id);
                  return (
                    <li
                      key={i}
                      className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition ${
                        selectedCandidate?.student_id === c.student_id
                          ? "bg-blue-100 border border-blue-400"
                          : "bg-white hover:bg-gray-100"
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

        <div className="w-18/50 min-w-[320px] flex flex-col gap-4">
          {/* Doughnut: Fixed height at the top */}
          <div className="bg-white rounded-2xl p-4 shadow-md h-[320px] flex flex-col items-center justify-center">
            <h4 className="text-center font-semibold mb-2">
              Matched Vs Unmatched Candidates
            </h4>

            <div className="w-62 h-62">
              <Doughnut
                data={doughnutData}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-md flex-1 overflow-y-auto flex flex-col items-center">
            {selectedCandidate ? (
              (() => {
                const student = students.find(
                  (s) => s._id === selectedCandidate.student_id
                );
                if (!student)
                  return (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      Student data not found
                    </div>
                  );

                const metrics = selectedCandidate.explain;

                // Continuous metrics
                const continuousMetrics = {
                  "Skill Similarity": metrics.skill_similarity,
                  "Sector Match": metrics.sector_match,
                  "Weighted Score": metrics.weighted_score,
                };

                // Binary metrics
                const binaryMetrics = {
                  "Location Match": metrics.location_match,
                  "Diversity Match": metrics.diversity_match,
                  "Past Participation": metrics.past_participation_bonus,
                };

                // Generate plain-English summary
                const summary = [];
                if (metrics.skill_similarity >= 0.7)
                  summary.push("The candidate has strong skill match");
                else summary.push("The candidate's skill match could improve");

                if (metrics.sector_match)
                  summary.push("fits well in the preferred sector");
                else summary.push("observes sector mismatch");

                if (metrics.location_match)
                  summary.push("location matches with the requirements");
                else
                  summary.push(
                    "location could not matched as per the requirements"
                  );

                if (metrics.diversity_match)
                  summary.push("diversity criteria bonus met");

                if (metrics.past_participation_bonus)
                  summary.push("even has past participation bonus");

                const summaryText = summary.join(", ") + ".";

                return (
                  <div className="flex flex-col w-full gap-4">
                    {/* Header */}
                    <div className="flex items-center justify-between w-full mb-4">
                      <h3 className="text-lg font-bold text-gray-800">
                        {student.full_name}
                      </h3>
                      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold text-lg">
                        {(selectedCandidate.score * 100).toFixed(0)}%
                      </div>
                    </div>

                    {/* Top Info */}
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                      <p>
                        <strong>Degree:</strong> {student.stream}
                      </p>
                      <p>
                        <strong>CGPA:</strong> {student.cgpa}
                      </p>
                      <p>
                        <strong>Location:</strong> {student.location}
                      </p>
                      <p>
                        <strong>Pin Code:</strong> {student.pin_code}
                      </p>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4 w-full">
                      {student.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Insights: Combined Rows */}
                    <div className="flex flex-col gap-3 w-full">
                      {/* Row 1 */}
                      <div className="flex items-center justify-between gap-4">
                        {/* Left: Continuous Metric */}
                        <div className="flex-1 flex flex-col gap-1">
                          <span className="text-xs font-semibold text-gray-700">
                            Skill Similarity
                          </span>
                          <div className="w-[80%] bg-gray-200 h-1 rounded-full overflow-hidden">
                            <div
                              className="h-2 rounded-full bg-blue-500"
                              style={{
                                width: `${Math.round(
                                  continuousMetrics["Skill Similarity"] * 100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                        {/* Right: Binary Metric */}
                        <div className="flex items-center gap-2 px-2 py-1 rounded-full border border-gray-300">
                          <span className="text-xs font-semibold text-black">
                            Location
                          </span>
                          <span
                            className={`text-sm font-bold ${
                              binaryMetrics["Location Match"]
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {binaryMetrics["Location Match"] ? "✅" : "❌"}
                          </span>
                        </div>
                      </div>

                      {/* Row 2 */}
                      <div className="flex items-center justify-between gap-4">
                        {/* Left: Continuous Metric */}
                        <div className="flex-1 flex flex-col gap-1">
                          <span className="text-xs font-semibold text-gray-700">
                            Sector Match
                          </span>
                          <div className="w-[80%] bg-gray-200 h-1 rounded-full overflow-hidden">
                            <div
                              className="h-2 rounded-full bg-purple-500"
                              style={{
                                width: `${Math.round(
                                  continuousMetrics["Sector Match"] * 100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                        {/* Right: Binary Metric */}
                        <div className="flex items-center gap-2 px-2 py-1 rounded-full border border-gray-300">
                          <span className="text-xs font-semibold text-black">
                            Diversity
                          </span>
                          <span
                            className={`text-sm font-bold ${
                              binaryMetrics["Diversity Match"]
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {binaryMetrics["Diversity Match"] ? "✅" : "❌"}
                          </span>
                        </div>
                      </div>

                      {/* Row 3 */}
                      <div className="flex items-center justify-between gap-4">
                        {/* Left: Continuous Metric */}
                        <div className="flex-1 flex flex-col gap-1">
                          <span className="text-xs font-semibold text-gray-700">
                            Weighted Score
                          </span>
                          <div className="w-[92%] bg-gray-200 h-1 rounded-full overflow-hidden">
                            <div
                              className="h-2 rounded-full bg-green-500"
                              style={{
                                width: `${Math.round(
                                  continuousMetrics["Weighted Score"] * 100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                        {/* Right: Binary Metric */}
                        <div className="flex items-center gap-2 px-2 py-1 rounded-full border border-gray-300">
                          <span className="text-xs font-semibold text-black">
                            Past Participation
                          </span>
                          <span
                            className={`text-sm font-bold ${
                              binaryMetrics["Past Participation"]
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {binaryMetrics["Past Participation"] ? "✅" : "❌"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="w-full bg-gray-50 rounded-lg p-3 mt-4 shadow-sm text-gray-700 text-sm">
                      <strong>Summary:</strong> {summaryText}
                    </div>
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
