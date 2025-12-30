import mongoose from "mongoose";

const sourceSchema = new mongoose.Schema({
    text: {
        type: "String",
        required: true,
    }
})

const Source = mongoose.models.Source || mongoose.model("Source", sourceSchema);

export default Source;