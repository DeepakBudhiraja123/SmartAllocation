import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Node.js backend is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
