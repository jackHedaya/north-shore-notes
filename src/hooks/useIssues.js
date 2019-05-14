import { useState, useEffect } from "react";

export default () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetch("/issue", {})
      .then(resp => resp.json())
      .then(body => setIssues(body))
      .catch(e => console.log(e));
  }, []);

  return issues;
}