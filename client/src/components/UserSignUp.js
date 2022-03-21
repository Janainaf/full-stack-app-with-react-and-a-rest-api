import React from "react";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

function UserSignOut(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

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

    try {
      context.data.createUser(user).then((errors) => {
        if (errors.length) {
          setErrors(errors);
        } else {
          context.actions.signIn(emailAddress, password).then(() => {
            navigate("/");
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id="root">
      <main>
        <div className="form--centered">
          <h2>Sign Up</h2>
          {errors.length > 0 && (
            <div className="validation--errors">
              <h3>Validation Errors</h3>
              <h3>{errors}</h3>
              {/* <ul>
                <li> </li>}
              </ul> */}
            </div>
          )}
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
            <button className="button button-secondary">Cancel</button>
          </form>
          <p>
            Already have a user account? Click here to{" "}
            <Link to="/signin">Sign in!</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default UserSignOut;
