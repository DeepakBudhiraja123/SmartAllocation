import React, { useState, useContext, useMemo } from "react";
import { Doughnut, Bar, Line, Pie, PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
} from "chart.js";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { StudentsContext } from "../../context/studentsContext";
import { MatchResultsContext } from "../../context/matchResultContext";
import { InternshipContext } from "../../context/internshipsContext";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale
);

const LowerSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { students } = useContext(StudentsContext);
  const { matchResults } = useContext(MatchResultsContext);
  const { internships } = useContext(InternshipContext);

  // Calculate matched students, last run time, top internship & top department
  const { matchedCount, lastModelTime, topInternship, topDepartment, internshipMatches, departmentCounts } = useMemo(() => {
    const matchedStudentIds = new Set();
    let lastRunTime = "N/A";

    const internshipMatchesTemp = {}; // internship_id -> matched count
    const departmentCountsTemp = {}; // stream -> matched count

    matchResults.forEach((result) => {
      if (Array.isArray(result.candidates)) {
        result.candidates.forEach((c) => {
          if (c.student_id) {
            matchedStudentIds.add(c.student_id);

            // Count department matches
            const student = students.find((s) => s._id === c.student_id);
            if (student?.stream) {
              departmentCountsTemp[student.stream] = (departmentCountsTemp[student.stream] || 0) + 1;
            }

            // Count internship matches
            internshipMatchesTemp[result.internship_id] = (internshipMatchesTemp[result.internship_id] || 0) + 1;
          }
        });
      }

      // Track last run
      if (result?.run_id) lastRunTime = new Date(result.run_id);
    });

    // Top internship based on matched candidates
    let topInternshipObj = null;
    if (internships.length > 0) {
      topInternshipObj = internships.reduce((prev, curr) => {
        const prevCount = internshipMatchesTemp[prev._id] || 0;
        const currCount = internshipMatchesTemp[curr._id] || 0;
        return currCount > prevCount ? curr : prev;
      }, internships[0]);
      topInternshipObj.matchedCount = internshipMatchesTemp[topInternshipObj._id] || 0;
    }

    // Top department
    const topDept = Object.entries(departmentCountsTemp).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

    return {
      matchedCount: matchedStudentIds.size,
      lastModelTime: lastRunTime !== "N/A" ? lastRunTime.toLocaleString() : "N/A",
      topInternship: topInternshipObj,
      topDepartment: topDept,
      internshipMatches: internshipMatchesTemp,
      departmentCounts: departmentCountsTemp,
    };
  }, [matchResults, internships, students]);

  const insights = [
    {
      title: "Students Matched",
      description: `${matchedCount} students matched with internships.`,
      chartType: "Doughnut",
      chartData: {
        labels: ["Matched", "Remaining"],
        datasets: [
          {
            data: [matchedCount, students.length - matchedCount],
            backgroundColor: ["#2563eb", "#93c5fd"],
          },
        ],
      },
      cardColor: "bg-blue-50",
      depthDescription: `The last internship matching run successfully placed ${matchedCount} students. The model continues to optimize placements based on student skills and internship requirements.`,
    },
    {
      title: "Top Internship",
      description: topInternship
        ? `Top role: ${topInternship.role_title} at ${topInternship.company_name} (${topInternship.matchedCount} students matched)`
        : "No internships yet",
      chartType: "Bar",
      chartData: {
        labels: internships.map((i) => i.role_title || "Unknown"),
        datasets: [
          {
            label: "Students Matched",
            data: internships.map((i) => internshipMatches[i._id] || 0),
            backgroundColor: ["#059669", "#6ee7b7", "#10b981", "#34d399"],
          },
        ],
      },
      cardColor: "bg-green-50",
      depthDescription: topInternship
        ? `The internship "${topInternship.role_title}" at "${topInternship.company_name}" attracted the most students, making it the leading choice in the last run.`
        : "No internship data available to determine top role.",
    },
    {
      title: "Average Runtime",
      description: "Average runtime of the last model was 3.5 seconds.",
      chartType: "Line",
      chartData: {
        labels: ["Run1", "Run2", "Run3", "Run4", "Run5"],
        datasets: [
          {
            label: "Seconds",
            data: [3.2, 3.5, 3.4, 3.6, 3.3],
            borderColor: "#f59e0b",
            backgroundColor: "#fef3c7",
            fill: false,
            tension: 0.3,
          },
        ],
      },
      cardColor: "bg-amber-50",
      depthDescription:
        "The model processed the last internship matching run with an average runtime of 3.5 seconds, demonstrating optimized efficiency.",
    },
    {
      title: "Last Run Time",
      description: `Last model run: ${lastModelTime}`,
      chartType: "Pie",
      chartData: {
        labels: ["Elapsed", "Remaining"],
        datasets: [
          {
            data: [
              lastModelTime !== "N/A" ? 1 : 0,
              lastModelTime !== "N/A" ? 0 : 1,
            ],
            backgroundColor: ["#ef4444", "#fca5a5"],
          },
        ],
      },
      cardColor: "bg-red-50",
      depthDescription: `The last execution of the internship matching algorithm was completed ${lastModelTime}. Frequent runs ensure data stays up-to-date.`,
    },
    {
      title: "Top Department",
      description: `Top department with highest matches: ${topDepartment}`,
      chartType: "PolarArea",
      chartData: {
        labels: Object.keys(departmentCounts),
        datasets: [
          {
            data: Object.values(departmentCounts),
            backgroundColor: ["#7c3aed", "#c4b5fd", "#a78bfa", "#d8b4fe", "#f472b6"],
          },
        ],
      },
      cardColor: "bg-purple-50",
      depthDescription: `The "${topDepartment}" department has the most internship matches, reflecting strong student participation and alignment with available internship roles.`,
    },
  ];

  const currentInsight = insights[currentIndex];

  const renderChart = (insight) => {
    switch (insight.chartType) {
      case "Doughnut":
        return <Doughnut data={insight.chartData} />;
      case "Bar":
        return <Bar data={insight.chartData} />;
      case "Line":
        return <Line data={insight.chartData} />;
      case "Pie":
        return <Pie data={insight.chartData} />;
      case "PolarArea":
        return <PolarArea data={insight.chartData} />;
      default:
        return null;
    }
  };

  return (
    <div className="px-6 py-10 bg-gray-50 w-full mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Last Model Run: Results Overview
      </h2>

      <div className="flex space-x-6">
        {/* Left Column - Insights List */}
        <div className="w-1/4 space-y-4">
          {insights.map((insight, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                idx === currentIndex
                  ? `bg-white shadow-2xl border-l-4 border-blue-500`
                  : insight.cardColor
              }`}
              onClick={() => setCurrentIndex(idx)}
            >
              <h3 className="font-semibold text-gray-700">{insight.title}</h3>
              <p className="text-gray-600 text-sm">{insight.description}</p>
            </div>
          ))}
        </div>

        {/* Right Column - White card with description + chart */}
        <div className="w-3/4 bg-white rounded-2xl shadow-lg p-6 flex flex-row items-center justify-between">
          <div className="flex-1 flex flex-col justify-center items-center px-4">
            <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
              {currentInsight.title}
            </h3>
            <p className="text-gray-700 text-base text-center leading-relaxed">
              {currentInsight.depthDescription}
            </p>
          </div>

          <div className="w-96 h-96 flex items-center justify-center">
            {renderChart(currentInsight)}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={() =>
            setCurrentIndex(
              (prev) => (prev - 1 + insights.length) % insights.length
            )
          }
          className="bg-gray-100 p-2 rounded-full shadow hover:bg-gray-200 transition"
        >
          <FiChevronLeft size={20} />
        </button>
        <button
          onClick={() =>
            setCurrentIndex((prev) => (prev + 1) % insights.length)
          }
          className="bg-gray-100 p-2 rounded-full shadow hover:bg-gray-200 transition"
        >
          <FiChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default LowerSection;
