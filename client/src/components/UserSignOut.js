import React from "react";
import { useState } from "react";
import { Consumer } from "../Context";
import { createUser } from "../Data.js";
import { useNavigate } from "react-router-dom";
import { signOut } from "../Data.js";
import { Context } from "../Context";

function UserSignOut(props) {
  const { context } = props;
  let navigate = useNavigate();

  context.actions.signOut().then(() => {
    console.log("disconnected");
    navigate("/");
  });

  // context.actions.signOut().then(() => {
  //   console.log(context.authenticatedUser.user.firstName);
  //   navigate("/");
  // });
}

export default UserSignOut;
