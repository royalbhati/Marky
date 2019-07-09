const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  }
});

const bookmark = mongoose.model("bookmark", bookmarkSchema);

module.exports = bookmark;
