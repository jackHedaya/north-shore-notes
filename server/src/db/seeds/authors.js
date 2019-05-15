const uuid = require("uuid/v4");

const Author = require("../schemas/author");

module.exports = async () => {
  const authors = [
    {
      author_id: uuid(),
      name: "Jack Hedaya"
    },
    {
      author_id: uuid(),
      name: "Kayla Kreinik"
    },
    {
      author_id: uuid(),
      name: "Dalia Etessami"
    },
    {
      author_id: uuid(),
      name: "Ron Laniado"
    },
    {
      author_id: uuid(),
      name: "Adriel Kohananoo"
    }
  ];

  await Author.create(authors);

  const a = await Author.findOne();

  return a.author_id;
};
