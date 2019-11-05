import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { Persist } from "react-persist";

import Navigation from "./components/Navigation";

// imports for the pages
import About from "./pages/about/About";
import ThisWeek from "./pages/issue-pages/ThisWeek";
import LastWeek from "./pages/issue-pages/LastWeek";
import StudentArt from "./pages/student-art/StudentArt";
import PreviousIssues from "./pages/issue-pages/PreviousIssues";
import AddIssue from "./pages/add-issue/AddIssue";
import Login from "./pages/login/Login";
import ManageUsers from "./pages/manage-users/ManageUsers";

import useUser from "./hooks/useUser";
import useAuth from "./hooks/useAuth";

import "./App.scss";

/**
 * @type {React.Context<{ isLoggedIn: boolean, token: string, setIsLoggedIn: () => void, setToken: () => void }>}
 */
const AuthContext = React.createContext();

function App() {
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState("");

  const user = useUser("ME");
  console.log(user)
  return (
    <AuthContext.Provider value={{ token, setToken, isLoggedIn, setIsLoggedIn }}>
      <Persist
        name="north-shore-notes"
        data={{ token, isLoggedIn }}
        debounce={500}
        onMount={data => {
          setIsLoggedIn(data.isLoggedIn);
          setToken(data.token);
        }}
      />
      <Router>
        <div className="app-container">
          <Navigation />
          <div className="content">
            <Switch>
              <Redirect exact from="/" to="this-week" />
              <Route exact path="/this-week/" component={ThisWeek} />
              <Route exact path="/last-week/" component={LastWeek} />
              <Route exact path="/previous-issues/" component={PreviousIssues} />
              <Route exact path="/student-art/" component={StudentArt} />
              <Route exact path="/about/" component={About} />
              <SecuredRoute exact path="/add-issue/" component={AddIssue} authenticated={isLoggedIn} />
              <Route exact path="/login/" component={Login} />
              <SecuredRoute
                exact
                path="/manage-users/"
                component={ManageUsers}
                authenticated={isLoggedIn && user && user.role === "ADMIN"}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

function SecuredRoute({ component: Component, authenticated, ...rest }) {
  const { isLoggedIn } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to={{ pathname: isLoggedIn ? "/" : "/login", state: { from: props.location } }} />
        )
      }
    />
  );
}

export default App;
export { AuthContext };
