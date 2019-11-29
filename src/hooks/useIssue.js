import { useState, useEffect } from 'react'
import { getIssue } from '../services/issue.service'

export default ({ volume, issue }) => {
  const [issues, setIssues] = useState([])

  useEffect(() => {
    if (!issue || !volume) return

    getIssue({ volume, issue })
      .then(body => setIssues(body))
      .catch(_ => setIssues([]))
  }, [issue, volume])

  return issues
}
