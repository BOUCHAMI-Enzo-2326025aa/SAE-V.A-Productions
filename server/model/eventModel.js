import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  description: { type: String },
});

const eventModel = mongoose.model("Event", eventSchema);

export default eventModel;
