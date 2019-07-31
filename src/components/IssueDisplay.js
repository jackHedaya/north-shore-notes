import React from "react";

import Interweave from "interweave";

import "./_styles/IssueDisplay.scss";

function IssueDisplay(props) {
  const { issue } = props;
  const anyArticle = issue[0];

  return (
    <div>
      {anyArticle && (
        <div className="volume-issue-title">
          Volume {anyArticle.volume} Issue {anyArticle.issue}
        </div>
      )}
      {issue.map(({ title, body, author, id }, index) => (
        <Article title={title} body={body} author={author} key={id} break={index !== issue.length - 1} />
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
      <Interweave className="body" content={body} />
      {props.break ? <div className="break" /> : null}
    </div>
  );
}

export default IssueDisplay;
