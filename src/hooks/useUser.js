import { useState, useEffect } from "react";

export default (token, qUser) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) return undefined;

    fetch(`/user?${qUser ? "user=" + qUser : ""}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(resp => resp.json())
      .then(body => setUser(body))
      .catch(_ => setUser(null));
  }, [token, qUser]);

  return user;
};
