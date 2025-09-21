// ChartContainer.jsx
import React, { useContext, useMemo } from "react";
import { Briefcase, Users, CheckCircle } from "lucide-react";
import { InternshipContext } from "../../context/internshipsContext";
import { StudentsContext } from "../../context/studentsContext";
import { MatchResultsContext } from "../../context/matchResultContext";

const ChartContainer = () => {
  const { internships } = useContext(InternshipContext);
  const { students } = useContext(StudentsContext);
  const { matchResults } = useContext(MatchResultsContext);

  // Calculate matched / not matched (unique students)
  const { matchedCount, notMatchedCount } = useMemo(() => {
    const matchedStudentIds = new Set();

    matchResults.forEach((result) => {
      if (Array.isArray(result.candidates)) {
        result.candidates.forEach((c) => {
          if (c.student_id) matchedStudentIds.add(c.student_id);
        });
      }
    });

    const matched = matchedStudentIds.size;
    const notMatched = students.length - matched;

    return {
      matchedCount: matched,
      notMatchedCount: notMatched < 0 ? 0 : notMatched, // safety
    };
  }, [matchResults, students]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 py-6">
      {/* Internships Available */}
      <div className="flex flex-col items-center bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition h-36 justify-center">
        <Briefcase className="h-10 w-10 text-blue-600 mb-2" />
        <p className="text-2xl font-bold text-gray-800">{internships.length}</p>
        <p className="text-gray-600 text-sm font-medium">Internships Available</p>
      </div>

      {/* Students Registered */}
      <div className="flex flex-col items-center bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition h-36 justify-center">
        <Users className="h-10 w-10 text-green-600 mb-2" />
        <p className="text-2xl font-bold text-gray-800">{students.length}</p>
        <p className="text-gray-600 text-sm font-medium">Students Registered</p>
      </div>

      {/* Matches */}
      <div className="flex flex-col items-center bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition h-36 justify-center">
        <CheckCircle className="h-10 w-10 text-orange-600 mb-2" />
        <p className="text-2xl font-bold text-gray-800">
          {matchedCount} <span className="text-gray-500 text-sm">/ {notMatchedCount}</span>
        </p>
        <p className="text-gray-600 text-sm font-medium">Matched / Not Matched</p>
      </div>
    </div>
  );
};

export default ChartContainer;
