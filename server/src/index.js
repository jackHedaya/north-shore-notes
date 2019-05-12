const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const authMiddleware = require("./routers/middleware");

const routers = {
  accounts: require("./routers/accounts"),
  auth_required: require("./routers/auth_required"),
  public: require("./routers/public")
};

const PORT = 3001 || process.env.PORT;

// Edit according to your project
mongoose.connect("mongodb://localhost/north-shore-notes");

app.use(bodyParser.urlencoded({ extended: false, limit: "2mb" }));
app.use(bodyParser.json({ limit: "2mb" }));

app.use(express.static(path.join(__dirname, "build")));

app.use("/auth", routers.accounts);

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Whatever you want that requires auth
app.use("/", routers.public);
app.use("/", authMiddleware, routers.auth_required);

app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));
