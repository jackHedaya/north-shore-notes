const User = require("../schemas/user");
const Token = require("../schemas/token");

const users = [
  { email: "jackehedaya@gmail.com", password: "nightlight42"},
  { email: "laniado.ron@gmail.com", password: "reactfanatic" },
  { email: "detessami@nshahs.org", password: "columbiaahellyeah" },
  { email: "akohananoo@nshahs.org", password: "crusingalong" }
]

module.exports = async () => {
  var token;
  var account;

  for (var { email, password } of users) {
    await User.createUser({ email, password })
    token = await User.login(email, password)
  }

  account = await Token.getAccount(token);

  return account;
}