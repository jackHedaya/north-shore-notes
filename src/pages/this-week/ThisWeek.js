import React from "react";

import useIssues from "../../hooks/useIssues";

import "./ThisWeek.scss";

function ThisWeek() {
  const issues = useIssues();

  return (
    <div className="this-week">
      {issues.map(({ title, body }) => (
        <div className="issue" key={title}>
          <div className="title">{title}</div>
          <div className="author">By: Jack Hedaya</div>
          <div className="body">{body}</div>
        </div>
      ))}
    </div>
  );
}

export default ThisWeek;
