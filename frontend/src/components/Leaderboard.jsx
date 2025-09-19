import React from "react";

const topStudents = [
  { name: "Rishit Sharma", matches: 30, department: "CSE", college: "IIT Delhi", location: "Delhi" },
  { name: "Nitin Goyal", matches: 28, department: "ECE", college: "DTU", location: "Delhi" },
  { name: "Aman Kumar", matches: 25, department: "DS", college: "IIT Bombay", location: "Mumbai" },
  { name: "Arshia", matches: 24, department: "EE", college: "NIT Trichy", location: "Trichy" },
  { name: "Ribhav", matches: 22, department: "CSE", college: "IIIT Hyderabad", location: "Hyderabad" },
  { name: "Deepak", matches: 20, department: "ME", college: "IIT Kanpur", location: "Kanpur" },
];

const colors = [
  "bg-gradient-to-r from-blue-200 to-blue-400",
  "bg-gradient-to-r from-purple-200 to-purple-400",
  "bg-gradient-to-r from-green-200 to-green-400",
  "bg-gradient-to-r from-yellow-200 to-yellow-400",
];

const Leaderboard = () => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-md p-4 h-[350px] overflow-y-auto overflow-x-hidden">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2">
        🏆 Top Achievers
      </h2>
      <div className="flex flex-col gap-4">
        {topStudents.map((student, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-4 p-3 rounded-lg shadow-sm transform transition duration-200 hover:scale-102 ${colors[idx % colors.length]}`}
          >
            {/* Avatar */}
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl font-bold text-gray-800">
              {student.name[0]}
            </div>

            {/* Student Info */}
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
              <div className="flex gap-4 text-gray-700 text-sm flex-wrap">
                <span>Dept: {student.department}</span>
                <span>Matches: {student.matches}</span>
                <span>College: {student.college}</span>
                <span>Location: {student.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
