const app = require("express")();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const authMiddleware = require("./routers/middleware");

const routers = {
  accounts: require("./routers/accounts"),
  main: require("./routers/main")
};

const PORT = 3000 || process.env.PORT;

// Edit according to your project
mongoose.connect("mongodb://localhost/north-shore-notes");

app.use(bodyParser.urlencoded({ extended: false, limit: "2mb" }));
app.use(bodyParser.json({ limit: "2mb" }));

app.use("/auth", routers.accounts);

// Whatever you want that requires auth
app.use("/", authMiddleware, routers.main);

app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));
