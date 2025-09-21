import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import internshipRouter from "./routes/internshipRoute.js";
import studentRouter from "./routes/studentRoute.js";
import notificationRouter from "./routes/notificationRoute.js";
import matchResultRouter from "./routes/matchResultRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Node.js backend is running 🚀");
});

await connectDB();

app.use("/api/internships", internshipRouter);
app.use("/api/students", studentRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api/matchResult", matchResultRouter);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});