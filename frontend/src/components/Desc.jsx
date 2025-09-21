import React, { useState, useEffect, useContext } from "react";
import { Info } from "lucide-react";
import { FaPlus, FaBell, FaFileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { MatchResultsContext } from "../../context/matchResultContext"; // adjust path

const actions = [
  { name: "Add Internship", to: "/addInternship", icon: <FaPlus size={16} /> },
  { name: "Modify Notifications", to: "/notifications", icon: <FaBell size={16} /> },
  { name: "Generate Reports", to: "/reports", icon: <FaFileAlt size={16} /> },
];

const Desc = () => {
  const { matchResults } = useContext(MatchResultsContext);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [elapsedText, setElapsedText] = useState("Never");

  // Update elapsed time every second using latest run_id
  useEffect(() => {
    if (!matchResults || matchResults.length === 0) {
      setElapsedText("Never");
      return;
    }

    const latest = [...matchResults].sort(
      (a, b) => new Date(b.run_id) - new Date(a.run_id)
    )[0];

    const lastRunTime = new Date(latest.run_id);

    const updateElapsed = () => {
      const now = new Date();
      const diffMs = now - lastRunTime;

      const hours = Math.floor(diffMs / 3600000);
      const mins = Math.floor((diffMs % 3600000) / 60000);
      const secs = Math.floor((diffMs % 60000) / 1000);

      setElapsedText(
        hours > 0
          ? `${hours} hrs ${mins} mins ago`
          : mins > 0
          ? `${mins} mins ${secs} secs ago`
          : `${secs} secs ago`
      );
    };

    updateElapsed(); // run immediately
    const interval = setInterval(updateElapsed, 1000);
    return () => clearInterval(interval);
  }, [matchResults]);

  const handleRunMatcher = () => {
    toast("Matcher is running... updating internship matches.", {
      icon: "🚀",
      duration: 5000,
    });
  };

  return (
    <>
      <Toaster position="top-right" />

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
                <div className="absolute -top-20 right-0 w-64 p-3 bg-white text-black text-xs rounded shadow-lg z-10">
                  The model automatically runs when internships or students are updated. You can also trigger it manually by pressing this button.
                </div>
              )}
            </div>
          </div>

          {/* Last Ran Text */}
          <p className="text-gray-500 text-xs mt-1">Last ran: {elapsedText}</p>
        </div>
      </div>
    </>
  );
};

export default Desc;
