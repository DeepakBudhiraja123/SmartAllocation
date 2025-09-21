import express from "express";
import { getMatchResults } from "../controllers/matchResultController.js"; // adjust path

const matchResultRouter = express.Router();

// Route to get all match results
matchResultRouter.get("/get", getMatchResults);

export default matchResultRouter;
