const mongoose = require("mongoose");

const Issue = mongoose.Schema({
  account_id: {
    type: String,
    unique: false,
    required: true
  },

  issue_id: {
    type: String,
    unique: true,
    require: true
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

module.exports = mongoose.model("Issue", Issue);
