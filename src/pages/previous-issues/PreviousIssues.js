import React from "react";
import "./PreviousIssues.scss";
import useIssue from "../../hooks/useIssue";
import IssueDisplay from "../../components/IssueDisplay";

function PreviousIssues() {
    const issues = useIssue({ volume: "ALL", issue: "ALL" });
		const groupedIssues = groupByIssue(issues);		

		return <div>{groupedIssues.map(issue => <IssueDisplay key={`${issue[0].issue} ${issue[0].volume}`} issue={issue} /> )}</div>;
  
}

function groupByIssue(articles) {
	if (articles.length < 1)
		return [];

	let out = [[ articles[0] ]];

	for (let i = 1; i < articles.length; i++) {
		const current = articles[i];
		const last = articles[i - 1];

		if (current.volume !== last.volume && current.issue !== last.issue) {
			out.push([]);
		}

		out[ out.length - 1].push(current)
	}

	return out;
}

export default PreviousIssues;