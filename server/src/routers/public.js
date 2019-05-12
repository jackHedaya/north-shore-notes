const app = require("express").Router();

const Issue = require("../db/schemas/issue");

app.get("/issue", async (req, res) => {
  const { issue_id } = req.body;

  Issue.find(issue_id ? { issue_id } : undefined)
    .sort({ date: -1 })
    .then(r => {
      return res.status(200).send(r);
    })
    .catch(_ => res.status(500).send("Something went wrong while grabbing issues"));
});

module.exports = app;
