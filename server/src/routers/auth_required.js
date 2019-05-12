const app = require("express").Router();
const uuid = require("uuid/v4");

const Issue = require("../db/schemas/issue");
const ArtImage = require("../db/schemas/art_image");

app.post("/issue", async (req, res) => {
  const { issue_title, issue_body } = req.body;
  const currentTime = Date.now();

  const { account_id } = req.account;
  const issue_id = uuid();

  Issue.create({ issue_id: issue_id, account_id: account_id, title: issue_title, body: issue_body, date: currentTime })
    .then(_ => res.status(200).send())
    .catch(e => {console.log(e); return res.status(400).send({ error: "Missing fields" })});
});

app.post("/art_image", async (req, res) => {
  const { base64, author } = req.body;

  ArtImage.create({ base64, author: author })
    .then(_ => res.status(200).send())
    .catch(_ => res.status(400).send({ message: "Missing fields" }));
});

module.exports = app;
