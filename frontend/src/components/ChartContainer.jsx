// ChartContainer.jsx
import React from "react";
import { Briefcase, Users, CheckCircle } from "lucide-react";

const ChartContainer = ({ internships = 0, students = 0, matched = 0, notMatched = 0 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 py-6">
      {/* Internships Available */}
      <div className="flex flex-col items-center bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition h-36 justify-center">
        <Briefcase className="h-10 w-10 text-blue-600 mb-2" />
        <p className="text-2xl font-bold text-gray-800">{internships}</p>
        <p className="text-gray-600 text-sm font-medium">Internships Available</p>
      </div>

      {/* Students Registered */}
      <div className="flex flex-col items-center bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition h-36 justify-center">
        <Users className="h-10 w-10 text-green-600 mb-2" />
        <p className="text-2xl font-bold text-gray-800">{students}</p>
        <p className="text-gray-600 text-sm font-medium">Students Registered</p>
      </div>

      {/* Matches */}
      <div className="flex flex-col items-center bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition h-36 justify-center">
        <CheckCircle className="h-10 w-10 text-orange-600 mb-2" />
        <p className="text-2xl font-bold text-gray-800">
          {matched} <span className="text-gray-500 text-sm">/ {notMatched}</span>
        </p>
        <p className="text-gray-600 text-sm font-medium">Matched / Not Matched</p>
      </div>
    </div>
  );
};

export default ChartContainer;
