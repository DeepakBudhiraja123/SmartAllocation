import MatchResult from "../models/MatchResult.js";

export const getMatchResults = async (req, res) => {
  try {
    const results = await MatchResult.find();

    res.status(200).json({
      success: true,
      count: results.length,
      results,
    });
  } catch (error) {
    console.error("Error fetching match results:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch match results",
      error: error.message,
    });
  }
};
