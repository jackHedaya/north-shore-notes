import React from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";

import "./_styles/Navigation.scss"

export default function Navigation() {
  return (
    <Router>
      <ul className="navigation">
        <Link to="/" className="navItem">
          <Logo />
        </Link>
        <NavLink to="/this-week/">THIS WEEK</NavLink>
        <NavLink to="/last-week/">LAST WEEK</NavLink>
        <NavLink to="/previous-issues/">PREVIOUS ISSUES</NavLink>
        <NavLink to="/student-art/">STUDENT ART</NavLink>
        <NavLink to="/about/">ABOUT</NavLink>
      </ul>
    </Router>
  );
}

function NavLink(props) {
  return (
    <li>
      <Link to={props.to} activeStyle={{ fontWeight: "bold" }}>
        {props.children}
      </Link>
    </li>
  );
}

function Logo() {
  return (
    <img
      src="https://liveparker301.com/wp-content/uploads/2015/10/placeholder-circle.png"
      alt="logo"
      height="100"
      width="100"
    />
  );
}
