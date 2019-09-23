import React, { useContext } from "react";

import { AuthContext } from "../../App";
import UserTable from "./UserTable";
import useUser from "../../hooks/useUser";

import "./ManageUsers.scss";

const tableStyle = {
  position: "absolute",
  left: "5vw",
  top: "9vw",
  width: "90vw",
  height: "75vh"
};

function ManageUsers() {
  const { token } = useContext(AuthContext);
  const user  = useUser(token, "ALL")

  return <UserTable style={tableStyle} data={user ? user.map(({password, ...rest}) => rest) : []} />;
}

export default ManageUsers;
