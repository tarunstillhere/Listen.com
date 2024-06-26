const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const receiverSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
    required: true,
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  language: [String],
  status: {
    type: String,
    enum: ["active", "inactive", "in-call", "busy", "offline", "blocked"],
    default: "offline",
  },
});



const Receiver = mongoose.model("Receiver", receiverSchema);

module.exports = Receiver;
