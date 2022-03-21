import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

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
