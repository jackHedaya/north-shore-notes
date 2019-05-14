import React, { useState } from "react";
import Collapse from "@material-ui/core/Collapse";

import angleDown from "../../assets/angle-down.svg";

import useIssues from "../../hooks/useIssues";

import "./ThisWeek.scss";

function ThisWeek() {
  const issues = useIssues();

  return (
    <div className="this-week">
      <Header />
      {issues.map(({ title, body, author = "Anonymous" }) => (
        <Issue title={title} body={body} author={author} key={title} />
      ))}
    </div>
  );
}

function Header() {
  const { weekday, month, date, year } = getDateInformation();

  return (
    <div>
      <div className="main-header">
        <div className="volume">Volume X Issue Y</div>
        <div className="date">{`${weekday}, ${month} ${date}, ${year}`}</div>
      </div>
      <div className="break" />
    </div>
  );
}

function Issue(props) {
  const { title, body, author } = props;

  const [showBody, setShowBody] = useState(false);

  return (
    <div className="issue">
      <div className="header" onClick={() => setShowBody(!showBody)}>
        <div className="info">
          <div className="title">{title} </div>
          <div className="author">By: {author}</div>
        </div>
        <div className="dropdown-icon">
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
    <Collapse in={show} classes={{ wrapperInner: "body" }}>
      {props.children}
    </Collapse>
  );
}

/** Helper Functions */
function getDateInformation() {
  const now = new Date();

  const NUM_TO_DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const NUM_TO_MONTH = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  return {
    weekday: NUM_TO_DAY[now.getDay()],
    month: NUM_TO_MONTH[now.getMonth()],
    date: now.getUTCDate(),
    year: now.getUTCFullYear()
  };
}

export default ThisWeek;
