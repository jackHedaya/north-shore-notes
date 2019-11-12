import React from 'react'

import IssueDisplay from '../../components/IssueDisplay'
import useIssue from '../../hooks/useIssue'

function LastWeek() {
  const issue = useIssue({ volume: 'LAST_WEEK', issue: 'LAST_WEEK' })

  return <IssueDisplay issue={issue} />
}

export default LastWeek
