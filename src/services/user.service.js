import fetch from './fetch'

/**
 * @param {string} user user_id or "ALL"
 * @param {{ token: string }}
 */
export function getUser(user, { token }) {
  return fetch('/user', { headers: { Authorization: `Bearer ${token}` }, body: { user } })
}

/**
 *
 * @param {string} user user_id
 * @param {{ token: string }}
 */
export function updateUser(user, { token, changes }) {
  return fetch('/user', {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: { id: user, changes },
  })
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
