import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
  const { context } = props;
  const authUser = context.authenticatedUser;

  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>
        <nav>
          {authUser && (
            <ul className="header--signedin">
              <li>Welcome, {authUser.user.firstName}!</li>
              <li>
                <Link to="/signout"> Sign Out</Link>
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
