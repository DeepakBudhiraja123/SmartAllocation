import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    score: { type: Number, required: true },
    explain: {
      skill_similarity: { type: Number },
      location_match: { type: Number },
      sector_match: { type: Number },
      past_participation_bonus: { type: Number },
      diversity_match: { type: Number },
      rural_urban_match: { type: Number },
      weighted_score: { type: Number }
    }
  },
  { _id: false }
);

const matchResultSchema = new mongoose.Schema(
  {
    internship_id: { type: mongoose.Schema.Types.ObjectId, ref: "Internship", required: true },
    candidates: [candidateSchema],
    run_id: { type: String, default: () => new Date().toISOString() }
  },
  { timestamps: true }
);

const MatchResult = mongoose.model("MatchResult", matchResultSchema);
export default MatchResult;
