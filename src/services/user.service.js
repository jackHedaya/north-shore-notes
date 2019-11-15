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
 * @param {{ token: string, fields: {} }} obj
 */
export function addUser({ token, ...fields }) {
  return fetch('/user', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: fields,
  })
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
 *
 * @param {string} id user_id
 * @param {{ token: string }} token
 */
export function deleteUser(id, { token }) {
  return fetch('/user', {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
    body: { id },
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
