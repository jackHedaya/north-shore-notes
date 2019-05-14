const uuid = require("uuid/v4");

const Issue = require("../schemas/issue");

module.exports = (account_id = uuid()) => {
  const issues = [
    {
      account_id: account_id,
      issue_id: uuid(),
      title: "A Really Important Article",
      body: "This is a really important article written by yours truly.",
      date: new Date("December 17, 1995 03:24:00")
    },
    {
      account_id: account_id,
      issue_id: uuid(),
      title: "A Really Unimportant Article",
      body: "Time is money, so stop reading this.",
      date: new Date("October 3, 2002 04:00:00")
    },
    {
      account_id: account_id,
      issue_id: uuid(),
      title: "Breaking News: You Sunk My Battleship!",
      body: "And to be honest, I'm kinda pissed.",
      date: new Date("February 2, 2016 07:18:00")
    },
    {
      account_id: account_id,
      issue_id: uuid(),
      title: "A Night To Remember",
      body: "Not exactly sure where I was going with this.",
      date: Date.now()
    }
  ];

  return Issue.create(issues);
};
