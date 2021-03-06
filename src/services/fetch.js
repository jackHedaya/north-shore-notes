import { encode } from 'querystring'

/**
 *
 * @param {string} url
 * @param {import("http").RequestOptions} options
 */
export default function newFetch(url, { method = 'GET', headers, body, ...options }) {
  const fullUrl = url + (method === 'GET' && body ? `?${encode(body)}` : '')

  return fetch(fullUrl, {
    headers: { 'Content-Type': 'application/json', ...headers },
    ...options,
    method,
    body: method !== 'GET' ? JSON.stringify(body) : undefined,
  })
    .then(async resp => {
      if (resp.ok) {
        try {
          const json = await resp.json()

          return json
        } catch (_) {
          return Promise.resolve()
        }
      }

      throw resp
    })
    .catch(e => {
      console.error(e)
      throw e
    })
}
