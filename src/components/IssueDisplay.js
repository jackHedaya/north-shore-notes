import React from "react";

import Interweave from "interweave";
import Scrollchor from "react-scrollchor";

import "./_styles/IssueDisplay.scss";

function IssueDisplay(props) {
  const { issue } = props;

  return (
    <div className="issue-display">
      <div className="articles">
        {issue.map(({ title, body, author, id }, index) => (
          <Article
            title={title}
            body={body}
            author={author}
            key={id}
            break={index !== issue.length - 1}
          />
        ))}
      </div>

      <div className="sidebar">
        <h3 className="issue">{"Volume 10 Issue 7"}</h3>
        <div className="divider" />
        {issue.map(({ title, id }) => (
          <Scrollchor
            key={id}
            to={`#${title.replace(/\s/g, "")}`}
            animate={{ offset: -100, duration: 500 }}
          >
            <Sidebar title={title}/>
          </Scrollchor>
        ))}
      </div>
    </div>
  );
}

function Article(props) {
  const { title, body, author } = props;

  return (
    <div className="issue">
      <div className="article">
        <div className="title" id={title.replace(/\s/g, "")}>
          {title}
        </div>
        <div className="author">By: {author}</div>
        <Interweave className="body" tagName="content" content={body} />
        {props.break ? <div className="break" /> : null}
      </div>
    </div>
  );
}

function Sidebar(props) {
  const { title } = props;

  return <p className="individualTitles">{title}</p>;
}

export default IssueDisplay;
