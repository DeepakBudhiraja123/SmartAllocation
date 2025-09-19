import React from "react";
import { FaPlus, FaBell, FaFileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const actions = [
  { name: "Add New Internship", to: "/addInternship", icon: <FaPlus size={24} /> },
  { name: "Modify Notification",to: "/addInternship", icon: <FaBell size={24} /> },
  { name: "Generate Report", to: "/addInternship",icon: <FaFileAlt size={24} /> },
];

const QuickActions = () => {
  return (
    <div className="mt-25 w-20vw bg-white rounded-2xl shadow-md p-4 flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">⚡ Quick Actions</h2>
      {actions.map((action, idx) => (
        <button
          key={idx}
          className="flex items-center gap-3 p-3 bg-blue-500 text-white rounded-lg font-semibold shadow-md hover:bg-blue-600 transition duration-200"
        >
          {action.icon}
          <Link to={action.to}>{action.name}</Link>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
