const mongoose = require("mongoose");

const Blog = mongoose.Schema({
  account_id: {
    type: String,
    unique: true,
    required: true
  },
  
  title: {
    type: String,
    unique: true,
    required: true
  },

  body: {
    type: String,
    unique: false,
    required: true
  },

  date: {
    type: Date,
    unique: false,
    required: true
  }
});

module.exports = mongoose.model("Blog", Blog);
