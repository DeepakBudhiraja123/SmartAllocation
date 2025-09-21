import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const InternshipContext = createContext();

export const InternshipProvider = ({ children }) => {
  const [internships, setInternships] = useState([]);

  // Fetch all internships
  const fetchInternships = async () => {
    try {
      const { data } = await axios.get("/api/internships/getInternships");
      if (data.success) {
        setInternships(data.data); // backend returns { success: true, data: internships }
      } else {
        toast.error("Failed to fetch internships");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Add a new internship
const addInternship = async (body) => {
  try {
    const response = await axios.post("/api/internships/createInternship", body);
    // console.log("Backend response:", response); // DEBUG

    const data = response.data;
    
    if (data.success) {
      setInternships((prev) => [data.data, ...prev]);
      toast.success(data.message || "Internship created successfully");
    } else {
      toast.error(data.message || "Failed to create internship");
    }
  } catch (err) {
    // Axios may wrap errors
    console.error("Axios error:", err);
    toast.error(err.response?.data?.message || err.message || "Failed to add internship");
  }
};

  useEffect(() => {
    fetchInternships();
  }, []);

  const value = {
    internships,
    fetchInternships,
    addInternship,
  };

  return (
    <InternshipContext.Provider value={value}>
      {children}
    </InternshipContext.Provider>
  );
};
