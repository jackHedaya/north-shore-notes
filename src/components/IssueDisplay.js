import React, { useEffect, useState } from "react";

import Interweave from "interweave";
import Scrollchor from "react-scrollchor";
import { useInView } from "react-intersection-observer";

import "./_styles/IssueDisplay.scss";

function IssueDisplay(props) {
  const { issue } = props;

  // visibleIssues will be in the format { id: boolean }
  const [visibleArticles, setVisibleArticles] = useState({});
  const setVisibleArticle = (articleId, isVisible) => setVisibleArticles({ ...visibleArticles, articleId: isVisible })
  
  return (
    <div className="issue-display">
      <div className="articles">
        {issue.map(({ title, body, author, id }, index) => {
         return (<Article
            title={title}
            body={body}
            author={author}
            key={id}
            setIsVisible={(inView) => setVisibleArticle(id, inView)}
            isVisible={visibleArticles[id]}
            break={index !== issue.length - 1}
          />)
        })}
      </div>

      <div className="sidebar">
        <h3 className="currentIssue">{"Volume 10 Issue 7"}</h3>
        <div className="divider" />
        {issue.map(({ title, id }) => (
          <Scrollchor
            key={id}
            to={`#${title.replace(/\s/g, "")}`}
            animate={{ offset: -100, duration: 500 }}
          >
            <Sidebar title={title} isVisible={visibleArticles[id]} />
          </Scrollchor>
        ))}
      </div>
    </div>
  );
}

function Article(props) {
  const { title, body, author, setIsVisible, isVisible } = props;
  
  const [ref, inView] = useInView({ threshold: 0 });
  
  useEffect(() => {
    if (isVisible === inView) return
    
    setIsVisible(inView);
  }, [inView, setIsVisible, isVisible]);

  return (
    <div className="issue" ref={ref}>
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
  const { title, isVisible } = props;

  return <p className="individualTitles" style={{ fontWeight: isVisible ? "900" : undefined }}>{title}</p>;
}

export default IssueDisplay;