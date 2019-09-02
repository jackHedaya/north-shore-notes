/**
 *
 * @param {string} url
 * @param {import("http").RequestOptions} options
 */
function req(url, options) {
  return fetch(url, { headers: { "Content-Type": "application/json" }, ...options }).then(resp => {
    if (resp.ok) return resp.json();
    throw new Error("Request Error");
  });
}

export function login(username, password) {
  return req("/login", { method: "POST", body: JSON.stringify({ username, password }) });
}
