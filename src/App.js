import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import Navigation from "./components/Navigation";

// imports for the pages
import About from "./pages/about/About";
import ThisWeek from "./pages/this-week/ThisWeek";
import LastWeek from "./pages/last-week/LastWeek";
import StudentArt from "./pages/student-art/StudentArt";
import PreviousIssues from "./pages/previous-issues/PreviousIssues";
import AddIssue from "./pages/add-issue/AddIssue";

import "./App.scss";

function App() {
  return (
    <Router>
      <div className="container">
        <Navigation />
        <div className="content">
          <Switch>
            <Redirect exact from="/" to="this-week" />
            <Route exact path="/this-week/" component={ThisWeek} />
            <Route exact path="/last-week/" component={LastWeek} />
            <Route exact path="/previous-issues/" component={PreviousIssues} />
            <Route exact path="/student-art/" component={StudentArt} />
            <Route exact path="/about/" component={About} />
            <Route exact path="/add-issue/" component={AddIssue} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
