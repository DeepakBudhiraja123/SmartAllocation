import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const MatchResultsContext = createContext();

export const MatchResultsProvider = ({ children }) => {
  const [matchResults, setMatchResults] = useState([]);

  // Fetch all match results
  const fetchMatchResults = async () => {
    try {
      const { data } = await axios.get("/api/matchResult/get");
      if (data.success !== false) {
        setMatchResults(data.results); // handle your backend response
      } else {
        toast.error("Failed to fetch match results");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchMatchResults();
  }, []);

  const value = {
    matchResults,
    fetchMatchResults,
  };

  return (
    <MatchResultsContext.Provider value={value}>
      {children}
    </MatchResultsContext.Provider>
  );
};
