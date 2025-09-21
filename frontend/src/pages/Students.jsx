import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StudentsContext } from "../../context/studentsContext"; // adjust path

const Students = () => {
  const { students, fetchStudents } = useContext(StudentsContext);
  // console.log(students);
  
  useEffect(() => {
    fetchStudents();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  // Filters
  const [filters, setFilters] = useState([]);
  const [newFilter, setNewFilter] = useState({
    field: "location",
    condition: "is",
    value: "",
  });

  const addFilter = () => {
    if (!newFilter.value.trim()) return;
    setFilters([...filters, newFilter]);
    setNewFilter({ field: "location", condition: "is", value: "" });
    setCurrentPage(1);
  };

  const removeFilter = (index) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const filteredStudents = students.filter((s) => {
    return filters.every((f) => {
      const fieldValue =
        f.field === "cgpa" ? parseFloat(s[f.field]) : s[f.field]?.toString().toLowerCase();
      const filterValue = f.value.toLowerCase();

      switch (f.condition) {
        case "is":
          return fieldValue === filterValue;
        case "is not":
          return fieldValue !== filterValue;
        case ">=":
          return parseFloat(fieldValue) >= parseFloat(filterValue);
        case "<=":
          return parseFloat(fieldValue) <= parseFloat(filterValue);
        case "contains":
          return fieldValue.includes(filterValue);
        default:
          return true;
      }
    });
  });

  // Pagination
  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  return (
    <div className="w-full flex justify-center mt-6">
      <div className="w-4/5 bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">🎓 Students Directory</h2>

        {/* Filters Card */}
        <div className="bg-gray-50 border rounded-xl p-4 mb-6">
          <h3 className="text-lg font-semibold mb-3">Filters</h3>

          {/* Active Filters */}
          {filters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {filters.map((f, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-blue-100 rounded-full flex items-center gap-2 text-sm"
                >
                  {f.field} {f.condition} {f.value}
                  <button
                    onClick={() => removeFilter(idx)}
                    className="text-red-500 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* ➕ Add Filter Builder */}
          <div className="flex flex-wrap gap-3 items-center">
            <select
              value={newFilter.field}
              onChange={(e) => setNewFilter({ ...newFilter, field: e.target.value })}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="location">Location</option>
              <option value="cgpa">CGPA</option>
              <option value="full_name">Name</option>
            </select>

            <select
              value={newFilter.condition}
              onChange={(e) =>
                setNewFilter({ ...newFilter, condition: e.target.value })
              }
              className="px-3 py-2 border rounded-lg"
            >
              <option value="is">is</option>
              <option value="is not">is not</option>
              <option value=">=">≥</option>
              <option value="<=">≤</option>
              <option value="contains">contains</option>
            </select>

            <input
              type={newFilter.field === "cgpa" ? "number" : "text"}
              placeholder="Value"
              value={newFilter.value}
              onChange={(e) => setNewFilter({ ...newFilter, value: e.target.value })}
              className="px-3 py-2 border rounded-lg"
            />

            <button
              onClick={addFilter}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              ➕ Add Filter
            </button>
          </div>
        </div>

        {/* Students Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse overflow-hidden rounded-lg shadow-sm">
            <thead>
              <tr className="bg-blue-50 text-gray-700 text-left">
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Location</th>
                <th className="p-3 border">CGPA</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {currentStudents.map((student, idx) => (
                  <motion.tr
                    key={student._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`hover:bg-gray-50 transition ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="border p-3 font-medium">{student.full_name}</td>
                    <td className="border p-3">{student.location}</td>
                    <td className="border p-3">{student.cgpa}</td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === index + 1 ? "bg-blue-500 text-white" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;
