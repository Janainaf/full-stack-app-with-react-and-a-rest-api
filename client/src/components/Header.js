import React from "react";
import UserSignOut from "./UserSignOut";
import { Link } from "react-router-dom";
import { Consumer } from "../Context";
import { Context } from "../Context";
import { useNavigate } from "react-router-dom";
import UserSignIn from "./UserSignIn";

function Header(props) {
  const { context } = props;
  const authUser = context.authenticatedUser;
  let navigate = useNavigate();

  function signout() {
    context.actions.signOut();
    console.log("disconnected");
    navigate("/");
  }
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/courses">Courses</Link>
        </h1>
        <nav>
          {authUser && (
            <ul className="header--signedin">
              <li>Welcome, {authUser.user.firstName}!</li>
              <li>
                <a onClick={signout}> Sign Out</a>
              </li>
            </ul>
          )}
          {!authUser && (
            <ul className="header--signedin">
              <li>
                <Link to="/signin">Sign In</Link>
                <Link to="/signup"> Sign Up</Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
}
export default Header;
