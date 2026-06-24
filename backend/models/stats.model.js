import mongoose from "mongoose";

const statsSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: "global",
      unique: true,
    },
    totalRequests: {
      type: Number,
      default: 0,
    },
    ruleHits: {
      type: Number,
      default: 0,
    },
    cacheHits: {
      type: Number,
      default: 0,
    },
    llmCalls: {
      type: Number,
      default: 0,
    },
    totalCost: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Stats = mongoose.models.Stats || mongoose.model("Stats", statsSchema);

export default Stats;
