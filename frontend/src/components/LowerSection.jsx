import React, { useState } from "react";
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

const LowerSection = ({ stats, lastModelTime }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const insights = [
    {
      title: "Students Matched",
      description: `${stats.matched} students matched with internships.`,
      chartType: "Doughnut",
      chartData: {
        labels: ["Matched", "Remaining"],
        datasets: [
          { data: [stats.matched, stats.students - stats.matched], backgroundColor: ["#2563eb", "#93c5fd"] },
        ],
      },
      cardColor: "bg-blue-50",
      depthDescription: `The last internship matching run successfully placed ${stats.matched} students. The model continues to optimize placements based on student skills and internship requirements.`,
    },
    {
      title: "Top Internship",
      description: "The internship with the highest number of matches had 40 students.",
      chartType: "Bar",
      chartData: {
        labels: ["Software Engineer", "Data Scientist", "Hardware Related", "Other"],
        datasets: [
          { label: "Students", data: [25, 20, 15, 15], backgroundColor: ["#059669", "#6ee7b7", "#10b981", "#34d399"] },
        ],
      },
      cardColor: "bg-green-50",
      depthDescription:
        "The Software Engineer internship attracted 25 students, making it the top choice in the last round. This helps in planning future internship opportunities accordingly.",
    },
    {
      title: "Average Runtime",
      description: "Average runtime of the last model was 3.5 seconds.",
      chartType: "Line",
      chartData: {
        labels: ["Run1", "Run2", "Run3", "Run4", "Run5"],
        datasets: [{ label: "Seconds", data: [3.2, 3.5, 3.4, 3.6, 3.3], borderColor: "#f59e0b", backgroundColor: "#fef3c7", fill: false, tension: 0.3 }],
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
        datasets: [{ data: [lastModelTime.includes("hrs") ? parseInt(lastModelTime) : 0, 24 - (lastModelTime.includes("hrs") ? parseInt(lastModelTime) : 0)], backgroundColor: ["#ef4444", "#fca5a5"] }],
      },
      cardColor: "bg-red-50",
      depthDescription:
        `The last execution of the internship matching algorithm was completed ${lastModelTime}. Frequent runs ensure data stays up-to-date.`,
    },
    {
      title: "Top Department",
      description: "Top department with highest matches: Computer Science.",
      chartType: "PolarArea",
      chartData: {
        labels: ["CS", "EE", "Data Science", "Other"],
        datasets: [{ data: [25, 20, 10, 5], backgroundColor: ["#7c3aed", "#c4b5fd", "#a78bfa", "#d8b4fe"] }],
      },
      cardColor: "bg-purple-50",
      depthDescription:
        "Computer Science leads in internship matches, reflecting high student participation and strong alignment with current internship offerings.",
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
          {/* Depth Description with title (left) */}
          <div className="flex-1 flex flex-col justify-center items-center px-4">
            <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{currentInsight.title}</h3>
            <p className="text-gray-700 text-base text-center leading-relaxed">{currentInsight.depthDescription}</p>
          </div>

          {/* Chart (right) */}
          <div className="w-96 h-96 flex items-center justify-center">{renderChart(currentInsight)}</div>
        </div>
      </div>

      {/* Navigation Arrows below the card */}
      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={() =>
            setCurrentIndex((prev) => (prev - 1 + insights.length) % insights.length)
          }
          className="bg-gray-100 p-2 rounded-full shadow hover:bg-gray-200 transition"
        >
          <FiChevronLeft size={20} />
        </button>
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % insights.length)}
          className="bg-gray-100 p-2 rounded-full shadow hover:bg-gray-200 transition"
        >
          <FiChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default LowerSection;
