import React, { useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { Dropdown, DropdownHeader, DropdownMenu, DropdownToggle, DropdownItem } from "reactstrap";

import { AuthContext } from "../App";
import useUser from "../hooks/useUser";

import "./_styles/Navigation.scss";

function Navigation() {
  const { isLoggedIn, token } = useContext(AuthContext);
  const user = useUser(token);

  return (
    <ul className="navigation">
      <Link to="/" className="nsn">
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
          <NavLink to="/this-week/">THIS WEEK</NavLink>
          {isLoggedIn && user && <CustomDropdown name={user.first_name} />}
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

function CustomDropdown(props) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  return (
    <Dropdown isOpen={open} toggle={toggle} nav>
      <DropdownToggle caret className="greeting">HELLO, {props.name.toUpperCase()}</DropdownToggle>
      <DropdownMenu right>
        <DropdownItem>Manage Users</DropdownItem>
        <DropdownItem>Log Out</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default Navigation;
