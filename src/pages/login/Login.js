import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Loader from 'react-loader-spinner'

import useAuth from '../../hooks/useAuth'

import * as authenticationService from '../../services/authentication.service'
import { getRole } from '../../services/user.service'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './Login.scss'

function Login(props) {
  const { isLoggedIn, setIsLoggedIn, setToken, setUserRole } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)

  function login() {
    setIsLoading(true)
    authenticationService
      .login(username, password)
      .then(data => {
        setToken(data.jwt)

        return getRole(data.jwt)
      })
      .then(role => {
        setUserRole(role)
        setIsLoggedIn(true)
      })
      .catch(e => {
        setIsLoading(false)
        setIsInvalid(true)
        setTimeout(() => setIsInvalid(false), 3000)
      })
  }

  return isLoggedIn ? (
    <Redirect to={props.location.state ? props.location.state.from.pathname : '/'} />
  ) : isLoading ? (
    <Loader
      type="CradleLoader"
      color="#78E88E"
      style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
    />
  ) : (
    <div className="login">
      <div className="volume-issue-title">Login</div>
      <div className="inputs">
        <input
          type="text"
          placeholder="username"
          onChange={e => setUsername(e.currentTarget.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={e => setPassword(e.currentTarget.value)}
        />
        <LoginButton loading={isLoading} login={login} error={isInvalid} />
      </div>
    </div>
  )
}

function LoginButton(props) {
  return (
    <div
      className="submit"
      style={{
        width: props.loading ? '30px' : undefined,
        backgroundColor: props.error ? 'red' : undefined,
        textIndent: props.loading ? 30 : undefined,
      }}
      onClick={props.login}
    >
      Login
    </div>
  )
}

export default Login
