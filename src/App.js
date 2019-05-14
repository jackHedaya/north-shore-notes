import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Navigation from "./components/Navigation";

// imports for the pages
import About from "./pages/about/About";
import ThisWeek from "./pages/this-week/ThisWeek";
import LastWeek from "./pages/last-week/LastWeek";
import StudentArt from "./pages/student-art/StudentArt";
import PreviousIssues from "./pages/previous-issues/PreviousIssues";

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
      <Navigation />
      <Content />
    </div>
  );
}

function Content() {
  return (
    <Router>
      <Route exact path="/" component={ThisWeek} />
      <Route path="/this-week/" component={ThisWeek} />
      <Route path="/last-week/" component={LastWeek} />
      <Route path="/previous-issues/" component={PreviousIssues} />
      <Route path="/student-art/" component={StudentArt} />
      <Route path="/about/" component={About} />
    </Router>
  );
}

export default App;
