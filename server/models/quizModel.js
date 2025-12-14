import mongoose from "mongoose";

const quizSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  mcqs: [
    {
      question: { type: String, required: true },
      options: [String],
      ans: { type: Number, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("quiz", quizSchema);
