const mongoose = require("mongoose");

const solutionSchema = new mongoose.Schema(
  {
    solutionText: {
      type: String,
      required: true
    },

    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // 🔥 LIKE SYSTEM
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    dislikes: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
],
     replies: [
      {
        text: String,
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // ⭐ MUST
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  
  { timestamps: true }
);

module.exports = mongoose.model("Solution", solutionSchema);
