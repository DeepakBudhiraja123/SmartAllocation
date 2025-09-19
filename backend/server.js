import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import internshipRouter from "./routes/internshipRoute.js";

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

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});