import React, { useState, useContext, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from "reactstrap";

import { AuthContext } from "../App";
import useUser from "../hooks/useUser";

import NSN_Logo from "../assets/NSN_Logo.png";
import NSN_Logo_Text from "../assets/NSN_Logo_Text.png";
import "./_styles/Navigation.scss";

function Navigation(props) {

  const { isLoggedIn, token } = useContext(AuthContext);
  const user = useUser(token);

  useEffect(() => {
    window.addEventListener("scroll", resizeHeaderOnScroll);
  }, []);

  const resizeHeaderOnScroll = () => {
    const distanceY = window.pageYOffset || document.documentElement.scrollTop,
      shrinkOn = 200,
      navBar = document.getElementById("navBar");

      if (distanceY > shrinkOn) {
        navBar.classList.add("resizeNavBar");
      } else {
        navBar.classList.remove("resizeNavBar");
      }
  };

  return (
    <ul className="navigation" id="navBar">
      <Link to="/" className="logo">
        <img
          src={NSN_Logo}
          className="logo"
          id="logo"
          alt="North Shore Hebrew Academy High School"
        />
        <img
          src={NSN_Logo_Text}
          className="logo"
          id="logo_text"
          alt="North Shore Notes"
        />
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
