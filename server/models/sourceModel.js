import mongoose from "mongoose";

const sourceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: "String",
    required: true,
  },
});

const Source = mongoose.models.Source || mongoose.model("Source", sourceSchema);

export default Source;
