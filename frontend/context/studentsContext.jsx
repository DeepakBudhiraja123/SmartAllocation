import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const StudentsContext = createContext();

export const StudentsProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  // Fetch all students
  const fetchStudents = async () => {
    try {
      const { data } = await axios.get("/api/students/getStudent"); // adjust API path
      setStudents(data.students || []);
    } catch (error) {
      toast.error(error.message || "Failed to fetch students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const value = {
    students,
    fetchStudents,
    axios
  };

  return (
    <StudentsContext.Provider value={value}>
      {children}
    </StudentsContext.Provider>
  );
};
