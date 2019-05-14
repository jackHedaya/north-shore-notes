const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/north-shore-notes");


const seed_issues = require("./issues");
const seed_accounts = require("./users-accounts");

seed_accounts()
.then(acct => seed_issues(acct))
.then(_ => mongoose.disconnect())
.then(_ => console.log("Seeding complete"))
.catch(x => console.error(x))
