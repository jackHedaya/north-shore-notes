import { useState, useEffect } from "react";

export default token => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) return undefined;

    fetch(`/user`, { headers: { Authorization: `Bearer ${token}` } })
      .then(resp => resp.json())
      .then(body => setUser(body))
      .catch(_ => setUser(null));
  }, [token]);

  return user;
};
