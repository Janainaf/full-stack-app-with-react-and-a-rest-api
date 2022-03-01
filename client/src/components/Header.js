import React from "react";
import UserSignOut from "./UserSignOut";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">
            <a href="index.html">Courses</a>
          </Link>
        </h1>
        <nav>
          {true && (
            <ul className="header--signedin">
              <li>Welcome, Joe Smith!</li>
              <li>
                <a href="sign-out.html">
                  <UserSignOut />
                </a>
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
