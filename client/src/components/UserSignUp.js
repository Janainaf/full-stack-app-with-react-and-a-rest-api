import React from "react";
import { useState } from "react";
import { Consumer } from "../Context";
import { createUser } from "../Data.js";
import { useNavigate } from "react-router-dom";

function UserSignOut(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const { context } = props;
  let navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
    };
    context.data
      .createUser(user)
      .then(() => {
        context.actions.signIn(emailAddress, password).then(() => {
          navigate("/");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div id="root">
      <main>
        <div className="form--centered">
          <h2>Sign Up</h2>

          <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
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
              Sign Up
            </button>
            <button
              className="button button-secondary"
              // onClick={}
            >
              Cancel
            </button>
          </form>
          <p>
            Already have a user account? Click here to{" "}
            <a href="sign-in.html">sign in</a>!
          </p>
        </div>
      </main>
    </div>
  );
}

export default UserSignOut;
