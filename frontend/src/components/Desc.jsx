import React, { useState, useEffect } from "react";
import { Info } from "lucide-react";
import { FaPlus, FaBell, FaFileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const actions = [
  { name: "Add Internship", to: "/addInternship", icon: <FaPlus size={16} /> },
  { name: "Modify Notifications", to: "/notifications", icon: <FaBell size={16} /> },
  { name: "Generate Reports", to: "/reports", icon: <FaFileAlt size={16} /> },
];

const Desc = ({ stats, setStats }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastRunTime, setLastRunTime] = useState(null);
  const [elapsedText, setElapsedText] = useState("Never");

  // Update elapsed time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      if (lastRunTime) {
        const now = new Date();
        const diffMs = now - lastRunTime;
        const hours = Math.floor(diffMs / 3600000);
        const mins = Math.floor((diffMs % 3600000) / 60000);
        setElapsedText(
          `${hours > 0 ? hours + " hrs " : ""}${mins} mins ago`
        );
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [lastRunTime]);

  const handleRunMatcher = () => {
    setIsProcessing(true);

    const runStart = new Date();
    setLastRunTime(runStart);
    setElapsedText("0 mins ago");

    toast("Matcher is running... updating internship matches.", {
      icon: "🚀",
      duration: 5000,
    });

    // Simulate matcher process
    setTimeout(() => {
      const matchedUpdate = stats.matched + 3;
      const notMatchedUpdate = Math.max(stats.notMatched - 3, 0);
      setStats({ ...stats, matched: matchedUpdate, notMatched: notMatchedUpdate });

      toast.success(
        `Matcher finished! Matched: ${matchedUpdate}, Not Matched: ${notMatchedUpdate}`,
        { duration: 3000 }
      );

      setIsProcessing(false);
    }, 5000);
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
                <div className="absolute -top-20 right-0 w-64 p-3 bg-white text-gray-800 text-xs rounded shadow-lg z-10">
                  Model runs on internships or students updates. You may also trigger it manually by pressing this button.
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
