const app = require("express").Router();

const Blog = require("../db/schemas/blog");

app.post("/blog", async (req, res) => {
  const { blogTitle, blogBody } = req.body;
  const currentTime = Date.now();

  const { account_id } = req.body.account;

  Blog.create({ account_id: account_id, title: blogTitle, body: blogBody, date: currentTime })
    .then(x => res.status(200).send())
    .catch(x => res.status(400).send({ error: "Missing fields." }));
});

module.exports = app;
