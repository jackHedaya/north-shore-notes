import fetch from "./fetch";

/**
 * @param {string} user user_id or "ALL"
 * @param {{ token: string }} 
 */
export function getUser(user, { token }) {
  return fetch("/user", { Authorization: `Bearer ${token}`, body: { user } })
}

/**
 * Gets current user with token
 */
export function getMe(token) {
  return fetch("/me", { Authorization: `Bearer ${token}` })
}