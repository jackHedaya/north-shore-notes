import fetch from './fetch'

/**
 * @param {string} user user_id or "ALL"
 * @param {{ token: string }}
 */
export function getUser(user, { token }) {
  return fetch('/user', { headers: { Authorization: `Bearer ${token}` }, body: { user } })
}

/**
 * Gets current user with token
 */
export function getMe(token) {
  return fetch('/me', { headers: { Authorization: `Bearer ${token}` } })
}

export function getRole(token) {
  return fetch('/me', { headers: { Authorization: `Bearer ${token}` } }).then(resp => resp.role)
}
