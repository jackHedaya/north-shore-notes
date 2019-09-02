import React from "react";
 
import useIssue from "../../hooks/useIssue";

import IssueDisplay from "../../components/IssueDisplay";

function ThisWeek() {
  const issue = useIssue({ volume: "LATEST", issue: "LATEST" });

  return <IssueDisplay issue={issue} />;
}

export default ThisWeek;
