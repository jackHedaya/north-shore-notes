import React from "react";

import useIssues from "../../hooks/useIssues";

import "./ThisWeek.scss";

function ThisWeek() {
  const issues = useIssues();

  return (
    <div className="this-week">
      {issues.map(({ title, body, author = "Anonymous" }, index) => (
        <Issue title={title} body={body} author={author} key={title} break={index !== issues.length - 1} />
      ))}
    </div>
  );
}

function Issue(props) {
  const { title, body, author } = props;

  return (
    <div className="issue">
      <div className="title">{title}</div>
      <div className="author">By: {author}</div>
      <div className="body">{body}</div>
      {props.break ? <div className="break" /> : null}
    </div>
  );
}

export default ThisWeek;
