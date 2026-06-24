import mongoose from "mongoose";

const cacheSchema = new mongoose.Schema(
  {
    query: {
      type: String,
      required: true,
      trim: true,
    },
    response: {
      type: String,
      required: true,
      trim: true,
    },
    embedding: {
      type: [Number],
      required: true,
      default: [],
    },
    embeddingVersion: {
      type: Number,
      required: true,
      default: 3,
    },
  },
  {
    timestamps: true,
  }
);

const Cache = mongoose.models.Cache || mongoose.model("Cache", cacheSchema);

export default Cache;
