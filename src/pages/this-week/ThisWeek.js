import React, { useState } from "react";

import angleDown from "../../assets/angle-down.svg";

import useIssues from "../../hooks/useIssues";

import "./ThisWeek.scss";

function ThisWeek() {
  const issues = useIssues();

  return (
    <div className="this-week">
      {issues.map(({ title, body, author = "Anonymous" }) => (
        <Issue title={title} body={body} author={author} key={title} />
      ))}
    </div>
  );
}

function Issue(props) {
  const { title, body, author } = props;

  const [showBody, setShowBody] = useState(false);

  return (
    <div className="issue">
      <div className="header">
        <div className="info">
          <div className="title">{title} </div>
          <div className="author">By: {author}</div>
        </div>
        <div className="dropdown-icon" onClick={() => setShowBody(!showBody)}>
          <img
            className="angle-down"
            style={{ transform: showBody ? "rotate(180deg)" : null }}
            src={angleDown}
            alt="angle-down"
          />
        </div>
      </div>
      <ExpandoBody show={showBody}>{body}</ExpandoBody>
    </div>
  );
}

function ExpandoBody(props) {
  const { show } = props;

  return (
    <div className="body" style={{ display: show ? undefined : "none" }}>
      {props.children}
    </div>
  );
}

export default ThisWeek;
