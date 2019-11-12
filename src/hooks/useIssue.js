import { useState, useEffect } from 'react'

export default ({ volume, issue }) => {
  const [issues, setIssues] = useState([])

  useEffect(() => {
    fetch(`/issue?volume=${volume}&issue=${issue}`)
      .then(resp => resp.json())
      .then(body => setIssues(body))
      .catch(_ => setIssues([]))
  }, [issue, volume])

  return issues
}
