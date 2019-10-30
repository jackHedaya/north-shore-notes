import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./_styles/Navigation.scss";

import NSN_Logo from "../assets/NSN_Logo.png";
import NSN_Logo_Text from "../assets/NSN_Logo_Text.png";

function Navigation() {
  return (
    <ul className="navigation">
      <Link to="/" className="navItem">
        <img src={NSN_Logo} className="logo" id="logo" />
        <img src={NSN_Logo_Text} className="logo" id="logo_text" />
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

const NavLink = withRouter(props => {
  const isSelected = () => props.location.pathname.includes(props.to);

  return (
    <li>
      <Link to={props.to} className={isSelected() ? "selected" : null}>
        {props.children}
      </Link>
    </li>
  );
});

export default Navigation;
