import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./_styles/Navigation.scss";

export default class Navigation extends React.Component {
	addShadow() {
		console.log("scrolled!!!");
	}
	render() {
		return (
			<ul className={"navigation"}>
				<Link to="/" className="navItem">
					NSN
				</Link>
				<div className="tabs-container">
					<div className="other-tabs">
						<NavLink to="/about/">ABOUT</NavLink>
						<NavLink to="/student-art/">STUDENT ART</NavLink>
					</div>
					<div className="article-tabs">
						<NavLink to="/previous-issues/">PREVIOUS ISSUES</NavLink>
						<NavLink to="/last-week/">LAST WEEK</NavLink>
						<NavLink to="/this-week/">THIS WEEK</NavLink>
					</div>
				</div>
			</ul>
		);
	}
}

const NavLink = withRouter((props) => {
	const isSelected = () => props.location.pathname.includes(props.to);

	return (
		<li>
			<Link to={props.to} className={isSelected() ? "selected" : null}>
				{props.children}
			</Link>
		</li>
	);
});
