import express from "express";
import { createInternship, getInternships } from "../controllers/internshipController.js";

const internshipRouter = express.Router();

internshipRouter.post("/createInternship", createInternship);
internshipRouter.get("/getInternships", getInternships);

export default internshipRouter;