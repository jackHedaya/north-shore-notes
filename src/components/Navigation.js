import React, { useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from "reactstrap";

import { AuthContext } from "../App";
import useUser from "../hooks/useUser";

import "./_styles/Navigation.scss";

function Navigation(props) {
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
          {isLoggedIn && user && (
            <CustomDropdown
              name={user.first_name}
              redirect={props.history.push}
            />
          )}
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
  const { setIsLoggedIn, setToken } = useContext(AuthContext);

  const toggle = () => setOpen(!open);

  const signOut = () => {
    setToken(null);
    setIsLoggedIn(false);
    props.redirect("/");
  };

  const DropdownLink = ({ to, ...other }) => (
    <DropdownItem onClick={() => props.redirect(to)} {...other} />
  );

  return (
    <Dropdown isOpen={open} toggle={toggle} nav>
      <DropdownToggle caret className="greeting">
        HELLO, {props.name.toUpperCase()}
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem header>Admin</DropdownItem>
        <DropdownLink to="/manage-users">Manage Users</DropdownLink>
        <DropdownItem header>Editor</DropdownItem>
        <DropdownLink to="/add-issue">Add Issue</DropdownLink>
        <DropdownItem divider>Admin</DropdownItem>
        <DropdownItem onClick={signOut}>Log Out</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default withRouter(Navigation);
