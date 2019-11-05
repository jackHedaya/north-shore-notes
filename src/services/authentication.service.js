import fetch from "./fetch";

/**
 *
 * @param {string} url
 * @param {import("http").RequestOptions} options
 */
export function login(username, password) {
  return fetch("/login", { method: "POST", body: { username, password } });
}
