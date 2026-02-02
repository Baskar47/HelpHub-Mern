const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
        enum: [
    "Education",
    "Job",
    "Health",
    "Lost",
    "Personal",
    "Technical",
    "Finance",
    "Other"
  ],
      required: true
    },
    status: {
      type: String,
      enum: ["Open", "Solved"],
      default: "Open"
    },

    // 🔥 WHO CREATED THE PROBLEM
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
