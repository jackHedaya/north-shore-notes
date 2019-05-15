const mongoose = require("mongoose");

const Image = mongoose.Schema({
  image_id: {
    type: String,
    unique: true,
    required: true
  },

  base64: {
    type: String,
    unique: true,
    required: true
  }
});


module.exports = mongoose.model("Image", Image);
