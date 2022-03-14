import React from "react";
import { useState, useEffect } from "react";
import { Consumer } from "../Context";
import { Context } from "../Context";
import { useNavigate } from "react-router-dom";

function UserSignIn(props) {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const { context } = props;
  let navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    context.actions.signIn(emailAddress, password).then(() => {
      console.log("connected");
      navigate("/");
    });
  }
  return (
    <div id="root">
      <main>
        <div className="form--centered">
          <h2>Sign In</h2>

          <form onSubmit={handleSubmit}>
            <label htmlFor="emailAddress">Email Address</label>
            <input
              id="emailAddress"
              name="emailAddress"
              type="email"
              value={emailAddress}
              onChange={(event) => setEmailAddress(event.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button className="button" type="submit">
              Sign In
            </button>
            <button className="button button-secondary">Cancel</button>
          </form>
          <p>
            Don't have a user account? Click here to{" "}
            <a href="sign-up.html">sign up</a>!
          </p>
        </div>
      </main>
    </div>
  );
}

export default UserSignIn;
