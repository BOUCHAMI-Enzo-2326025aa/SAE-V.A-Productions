import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  comments: {
    type: String,
    required: false,
  },
  lastCall: {
    type: Date,
    required: false,
  },
  status: {
    type: String,
    enum: ["PROSPECT", "CLIENT"],
  },
  createDate: {
    type: Date,
    required: false,
    default: Date(),
  },
});

let Contact = mongoose.model("Contact", contactSchema);

export default Contact;
