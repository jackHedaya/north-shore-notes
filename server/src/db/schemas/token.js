const mongoose = require("mongoose");

const Account = require("./account");

const Token = mongoose.Schema({
  token_id: {
    type: String,
    unique: true,
    required: true
  },
  account_id: {
    type: String,
    required: true
  }
});

Token.statics.getAccount = async function(token_id) {
  try {
    const token = await this.findOne({ token_id });

    return Account.findOne({ account_id: token.account_id });
  } catch (_) {
    return null;
  }
};

module.exports = mongoose.model("Token", Token);
