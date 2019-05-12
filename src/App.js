import React, { useState, useEffect } from "react";
import { HashRouter, Route, Link } from "react-router-dom";

//imports for the pages
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
			<HashRouter>
				<ul>
					<li>
						<Link to="/">HOME</Link>
					</li>
					<li>
						<Link to="/this-week/">THIS WEEK</Link>
					</li>
					<li>
						<Link to="/last-week">LAST WEEK</Link>
					</li>
					<li>
						<Link to="/previous-issues/">PREVIOUS ISSUES</Link>
					</li>
					<li>
						<Link to="/student-art">STUDENT ART</Link>
					</li>
					<li>
						<Link to="/about/">ABOUT</Link>
					</li>
				</ul>
				<Route exact path="/" component={ThisWeek} />
				<Route path="/this-week/" component={ThisWeek} />
				<Route path="/last-week/" component={LastWeek} />
				<Route path="/previous-issues/" component={PreviousIssues} />
				<Route path="/student-art/" component={StudentArt} />
				<Route path="/about/" component={About} />
			</HashRouter>
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
