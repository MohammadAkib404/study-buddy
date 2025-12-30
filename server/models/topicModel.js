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
  sourceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Source",
    required: true,
  },
  tree: {
    type: topicNodeSchema,
    required: true
  }
}, {timestamps: true});

const Topics = mongoose.models.Topics || mongoose.model("Topics", topicTreeSchema);

export default Topics;
