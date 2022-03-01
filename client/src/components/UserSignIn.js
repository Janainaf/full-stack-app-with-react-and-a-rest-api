import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function UserSignIn() {
  // const [remove, setRemove] = useState([]);
  // useEffect(() => {
  //   axios
  //     .delete("http://localhost:5000/api/courses/id")
  //     .then((response) => setRemove(response.data.id));
  // }, []);

  return (
    <div id="root">
      <main>
        <div class="form--centered">
          <h2>Sign In</h2>

          <form>
            <label for="emailAddress">Email Address</label>
            <input
              id="emailAddress"
              name="emailAddress"
              type="email"
              value=""
            />
            <label for="password">Password</label>
            <input id="password" name="password" type="password" value="" />
            <button class="button" type="submit">
              Sign In
            </button>
            <button
              class="button button-secondary"
              onclick="event.preventDefault(); location.href='index.html';"
            >
              Cancel
            </button>
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
