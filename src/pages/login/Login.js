import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import Loader from "react-loader-spinner";

import { AuthContext } from "../../App"

import * as authenticationService from "../../services/authentication.service";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./Login.scss";

function Login(props) {
  const { isLoggedIn, setIsLoggedIn, setToken } = useContext(AuthContext)
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  function login() {
    setIsLoading(true);
    authenticationService
      .login(username, password)
      .then(data => {
        setToken(data.jwt)
        setIsLoggedIn(true)
      })
      .catch(_ => {
        setIsInvalid(true);
        setTimeout(() => setIsInvalid(false), 3000);
      })
  }

  return isLoggedIn ? ( // logged in
    <Redirect to={props.location.state ? props.location.state.from.pathname : "/"} />
  ) : isLoading ? (
    <Loader type="CradleLoader" color="#78E88E" width="100" height="100" />
  ) : (
    <div className="login">
      <div className="volume-issue-title">Login</div>
      <div className="inputs">
        <Input type="text" name="username" value={username} onChange={e => setUsername(e.currentTarget.value)} />
        <Input type="password" name="password" value={password} onChange={e => setPassword(e.currentTarget.value)} />
        <LoginButton loading={isLoading} login={login} error={isInvalid} />
      </div>
    </div>
  );
}

function Input(props) {
  return (
    <>
      <div className="name">{props.name}</div>
      <input {...props} />
    </>
  );
}

function LoginButton(props) {
  return (
    <div
      className="submit"
      style={{
        width: props.loading ? "30px" : undefined,
        backgroundColor: props.error ? "red" : undefined,
        textIndent: props.loading ? 30 : undefined
      }}
      onClick={props.login}
    >
      Login
    </div>
  );
}

export default Login;
