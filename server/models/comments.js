const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  name: String,
  email: String,
  comment: String,
  replies: Array,
  created: Date,
});

const commentsModel = mongoose.model("comments", commentSchema);

module.exports = commentsModel;
