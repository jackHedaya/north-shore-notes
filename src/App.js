import React, { useState, useEffect } from "react";
import { HashRouter, Route, Link } from "react-router-dom";

function App() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetch("/issue", {})
      .then(resp => resp.json())
      .then(body => setIssues(body))
      .catch(e => console.log(e));
  }, []);

  return (
    <div className="App">
      <HashRouter>
        <ul>
          <li><Link to="/this-week/">THIS WEEK</Link></li>
          <li><Link to="/last-week">LAST WEEK</Link></li>
          <li><Link to="/previous-issues/">PREVIOUS ISSUES</Link></li>
          <li><Link to="/student-art">STUDENT ART</Link></li>
          <li><Link to="/about/">ABOUT</Link></li>
        </ul>
      </HashRouter>
      {issues.map(issue => (
        <div>
          <div>{issue.title}</div>
          <div>{issue.body}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
