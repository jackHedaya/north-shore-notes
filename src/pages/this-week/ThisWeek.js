import React from "react";

import useIssues from "../../hooks/useIssues";

import "./ThisWeek.scss";

function ThisWeek() {
  const issues = useIssues();

  return (
    <div className="content">
      {issues.map(({ title, body }) => (
        <div key={title}>
          <div className="title">{title}</div>
          <div className="body">{body}</div>
        </div>
      ))}
    </div>
  );
}

export default ThisWeek;
