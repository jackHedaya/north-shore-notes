import React from "react";

import Interweave from "interweave";

import "./_styles/IssueDisplay.scss";

function IssueDisplay(props) {
  const { issue } = props;

  return (
    <div>
      {issue.map(({ title, body, author = "Anonymous" }, index) => (
        <Article title={title} body={body} author={author} key={title} break={index !== issue.length - 1} />
      ))}
    </div>
  );
}

function Article(props) {
  const { title, body, author } = props;

  return (
    <div className="issue">
      <div className="title">{title}</div>
      <div className="author">By: {author}</div>
      <Interweave className="body" content={body}></Interweave>
      {props.break ? <div className="break" /> : null}
    </div>
  );
}

export default IssueDisplay;
