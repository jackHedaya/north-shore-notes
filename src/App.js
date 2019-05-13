import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import "./App.css";

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
			.then((resp) => resp.json())
			.then((body) => setIssues(body))
			.catch((e) => console.log(e));
	}, []);

	return (
		<div className="App">
			<Router>
				<ul className="nav">
					<NavLink to="/" className="navItem">
						<img src="https://liveparker301.com/wp-content/uploads/2015/10/placeholder-circle.png" alt="logo" height="100" width="100" />
					</NavLink>
					<li>
						<NavLink
							to="/this-week/"
							activeStyle={{
								fontWeight: "bold",
							}}>
							THIS WEEK
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/last-week/"
							activeStyle={{
								fontWeight: "bold",
							}}>
							LAST WEEK
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/previous-issues/"
							activeStyle={{
								fontWeight: "bold",
							}}>
							PREVIOUS ISSUES
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/student-art/"
							activeStyle={{
								fontWeight: "bold",
							}}>
							STUDENT ART
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/about/"
							activeStyle={{
								fontWeight: "bold",
							}}>
							ABOUT
						</NavLink>
					</li>
				</ul>
				<Route exact path="/" component={ThisWeek} />
				<Route path="/this-week/" component={ThisWeek} />
				<Route path="/last-week/" component={LastWeek} />
				<Route path="/previous-issues/" component={PreviousIssues} />
				<Route path="/student-art/" component={StudentArt} />
				<Route path="/about/" component={About} />
			</Router>
			{issues.map((issue) => (
				<div>
					<div>{issue.title}</div>
					<div>{issue.body}</div>
				</div>
			))}
		</div>
	);
}

export default App;
