const mongoose = require("mongoose");

const ArtImage = mongoose.Schema({
  base64: {
    type: String,
    unique: true,
    required: true
  },
  author: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model("ArtImage", ArtImage);
