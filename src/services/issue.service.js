import fetch from './fetch'

export function getIssue({ volume, issue }) {
  return fetch('/issue', { body: { volume, issue } })
}

export function postIssue({ volume, issue, articles, token }) {
  return fetch('/issue', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: { volume, issue, articles },
  })
}
