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
          <Link to="/">
            <a href="index.html">Courses</a>
          </Link>
        </h1>
        <nav>
          {authUser && (
            <ul className="header--signedin">
              <li>Welcome, {authUser.user.firstName}!</li>
              <li>
                {/* <Link to="/signout"> */}
                <a onClick={signout}> Sign Out</a>
                {/* </Link>{" "} */}
              </li>
            </ul>
          )}
          {!authUser && (
            <ul className="header--signedin">
              <li>Welcome, Stranger!</li>
              <li>
                <Link to="/signup">
                  <a> Sign Up</a>
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
    //       <ul classNameName="header--signedout">
    //         <li>
    //           <a href="sign-up.html">Sign Up</a>
    //         </li>
    //         <li>
    //           <a href="sign-in.html">Sign In</a>
    //         </li>
    //       </ul>
    //     </nav>
    //   </div>
    // </header>
  );
}
export default Header;
