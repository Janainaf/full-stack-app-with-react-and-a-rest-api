import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function UserSignOut() {
  // const [remove, setRemove] = useState([]);
  // useEffect(() => {
  //   axios
  //     .delete("http://localhost:5000/api/courses/id")
  //     .then((response) => setRemove(response.data.id));
  // }, []);

  return (
    <p>
      <a href="sign-out.html">Sign Out</a>!
    </p>
  );
}

export default UserSignOut;
