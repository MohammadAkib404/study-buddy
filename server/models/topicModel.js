import mongoose from "mongoose";

const topicNodeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    sectionLevel: {
      type: String,
      required: true,
      enum: ["Chapter", "Main-Topic", "Topic", "Sub-Topic"],
    },
    children: {
      type: [this],
      default: [],
    },
  },
  { _id: false }
);

const topicTreeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tree: {
    type: topicNodeSchema,
    required: true
  }
}, {timestamps: true});

export default mongoose.model("TopicTree", topicTreeSchema)
