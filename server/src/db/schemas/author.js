const mongoose = require("mongoose");

const Author = mongoose.Schema({
  author_id: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    unique: false,
    required: true
  }
});

module.exports = mongoose.model("Author", Author);