import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function UserSignIn(props) {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { context } = props;
  let navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    try {
      context.actions.signIn(emailAddress, password).then((user) => {
        if (user === null) {
          setError(true);
          console.log(error);
        } else {
          console.log("Success");
          navigate("/");
        }
      });
    } catch {
      console.log("Unauthorized - 401");
    }
  }
  return (
    <div id="root">
      <main>
        <div className="form--centered">
          <h2>Sign In</h2>
          {error === true && (
            <div className="validation--errors">
              <h3>Validation Errors</h3>
              <ul>
                <li> Credentials don't match</li>
              </ul>
            </div>
          )}
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
            <Link to="/">
              <button className="button button-secondary">Cancel</button>{" "}
            </Link>
          </form>
          <p>
            Don't have a user account? Click here to
            <Link to="/signup"> Sign Up</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default UserSignIn;
