import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

// Signout a user using context and data helper
// for more information, please check Context.js and Data.js

function UserSignOut(props) {
  const { context } = props;
  let navigate = useNavigate();

  useEffect(() => {
    context.actions.signOut();
    navigate("/");
  });
  return <div></div>;
}
export default UserSignOut;
