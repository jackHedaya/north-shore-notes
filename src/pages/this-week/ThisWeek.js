import React from "react";

import angleDown from "../../assets/angle-down.svg";

import useIssues from "../../hooks/useIssues";

import "./ThisWeek.scss";

function ThisWeek() {
  const issues = useIssues();

  return (
    <div className="this-week">
      {issues.map(({ title, body, author = "Anonymous" }) => (
        <div className="issue" key={title}>
          <div className="info">
            <div className="title">{title} </div>
            <div className="author">By: {author}</div>
          </div>
          <div className="dropdown-icon">
            <img className="angle-down" src={angleDown} alt="angle-down" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ThisWeek;
