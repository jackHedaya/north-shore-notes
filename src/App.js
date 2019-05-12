import React, { useState, useEffect } from "react";

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
