import React, { useState } from "react";
import { Info } from "lucide-react";
import { FaPlus, FaBell, FaFileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const actions = [
  { name: "Add Internship", to: "/addInternship", icon: <FaPlus size={16} /> },
  { name: "Modify Notifications", to: "/notifications", icon: <FaBell size={16} /> },
  { name: "Generate Reports", to: "/reports", icon: <FaFileAlt size={16} /> },
];

const Desc = ({ stats, setStats, lastModelTime, setLastModelTime }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRunMatcher = () => {
    setIsProcessing(true);

    // Update last run time immediately
    setLastModelTime("0 mins ago");

    // Show toast for running model
    toast.info(
      "Matcher is running... updating internship matches. Please wait for few seconds.",
      { position: "top-right", autoClose: 5000 }
    );

    // After toast duration (5s), update stats
    setTimeout(() => {
      setStats({
        ...stats,
        matched: stats.matched + 3,
        notMatched: Math.max(stats.notMatched - 3, 0),
      });
      setIsProcessing(false);
      toast.success(
        `Matcher finished! Updated matched: ${stats.matched + 3}, not matched: ${Math.max(stats.notMatched - 3, 0)}`,
        { position: "top-right", autoClose: 3000 }
      );
    }, 5000);
  };

  return (
    <>
      <div
        className={`w-[95vw] bg-white shadow-md rounded-2xl p-6 mx-8 flex items-start justify-between gap-6 ${
          isProcessing ? "pointer-events-none opacity-70" : ""
        }`}
      >
        {/* Left - Welcome */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-gray-800">
            👋 Hi, Welcome Back <span className="text-blue-600">Admin</span>!
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage internships, students and run smart matching easily.
          </p>
        </div>

        {/* Middle - Quick Actions */}
        <div className="flex gap-4 items-center">
          {actions.map((action, idx) => (
            <Link
              key={idx}
              to={action.to}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition shadow-sm"
            >
              {action.icon} {action.name}
            </Link>
          ))}
        </div>

        {/* Right - Run Matcher + Info + Last Ran */}
        <div className="flex flex-col items-center gap-2 relative">
          <div className="flex items-center gap-2">
            <button
              onClick={handleRunMatcher}
              disabled={isProcessing}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold shadow-md transition
                ${isProcessing
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-white hover:text-blue-600"
                }`}
            >
              🚀 Run Matcher
            </button>

            <div
              className="relative"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <Info
                size={20}
                className="text-gray-400 hover:text-blue-600 transition cursor-pointer"
              />
              {showTooltip && (
                <div className="absolute -top-20 right-0 w-64 p-3 bg-white text-gray-800 text-xs rounded shadow-lg z-10">
                  Model runs on internships or students updates. You may also trigger it by pressing this button.
                </div>
              )}
            </div>
          </div>

          {/* Last Ran Text */}
          <p className="text-gray-500 text-xs mt-1">Last ran: {lastModelTime}</p>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </>
  );
};

export default Desc;
