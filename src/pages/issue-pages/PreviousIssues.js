import React from "react";
import useIssue from "../../hooks/useIssue";
import IssueDisplay from "../../components/IssueDisplay";

function PreviousIssues() {
    const issues = useIssue({ volume: "ALL", issue: "ALL" });

		return <div>{issues.map(issue => <IssueDisplay key={`${issue[0].issue} ${issue[0].volume}`} issue={issue} /> )}</div>;
}

export default PreviousIssues;