const { object, string, required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const callerSchema = new Schema({
    username: {
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


callerSchema.plugin(passportLocalMongoose);

const Caller = mongoose.model("Caller", callerSchema);

module.exports = Caller;