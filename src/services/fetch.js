import { encode } from 'querystring'

/**
 *
 * @param {string} url
 * @param {import("http").RequestOptions} options
 */
export default function newFetch(url, { method, headers, body, ...options }) {
  const fullUrl = url + (method === 'GET' && body ? `?${encode(body)}` : '')

  return fetch(fullUrl, {
    headers: { 'Content-Type': 'application/json', ...headers },
    ...options,
    method,
    body: method !== 'GET' ? JSON.stringify(body) : undefined,
  }).then(resp => {
    if (resp.ok) return resp.json()
    throw resp
  })
}
