const app = require("express").Router();

const Issue = require("../db/schemas/issue");
const ArtImage = require("../db/schemas/art_image");

app.post("/issue", async (req, res) => {
  const { issue_title, issue_body } = req.body;
  const currentTime = Date.now();

  const { account_id } = req.account;

  Issue.create({ account_id: account_id, title: issue_title, body: issue_body, date: currentTime })
    .then(_ => res.status(200).send())
    .catch(_ => res.status(400).send({ error: "Missing fields" }));
});

app.post("/art_image", async (req, res) => {
  const { base64, image_author } = req.body;

  ArtImage.create({ base64, author: image_author })
  .then(_ => res.status(200).send())
  .catch(_ => res.status(400).send({ message: "Something went wrong saving the image" }))
});

module.exports = app;
