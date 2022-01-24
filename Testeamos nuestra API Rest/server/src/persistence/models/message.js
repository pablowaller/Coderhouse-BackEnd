const mongoose = require("mongoose");

const schema = mongoose.Schema({
  message: { type: String, require: true },
  author: {
    email: { type: String, require: true },
    name: { type: String, require: true },
    lastName: { type: String, require: true },
    age: { type: String, require: true },
    alias: { type: String, require: true },
    avatar: { type: String, require: true },
  },
  timestamp: { type: Date, default: new Date() },
});

const Message = mongoose.model("messages", schema);

module.exports = Message;
