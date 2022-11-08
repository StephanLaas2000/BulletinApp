const mongoose = require("mongoose");

const postschema = mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, required: true },
  description: { type: String, required: true },
  department: { type: String, required: true },
  username: { type: String, required: true },
  createdAt: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Post", postschema);
