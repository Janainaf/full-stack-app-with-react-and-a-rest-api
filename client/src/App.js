import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import NotFound from "./components/NotFound";
import withContext from "./Context";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

const UserSignUpWithContext = withContext(UserSignUp);
const HeaderWithContext = withContext(Header);
const UserSignOutWithContext = withContext(UserSignOut);

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios("http://localhost:5000/api/courses")
      .then((response) => setData(response.data))
      .catch((error) => console.log("Error fetching and parsing data", error));
  }, []);

  return (
    <div>
      <main>
        <HeaderWithContext />
        <Routes>
          <Route exact path="/" element={<Courses data={data} />} />
          <Route exact path="/courses" element={<Courses data={data} />} />
          <Route exact path="/createcourse" element={<CreateCourse />} />
          <Route exact path="/signin" element={<UserSignIn />} />
          <Route exact path="/signup" element={<UserSignUpWithContext />} />
          <Route exact path="/signout" element={<UserSignOutWithContext />} />
          <Route
            exact
            path={`courses/:id`}
            element={<CourseDetail data={data} />}
          />
          <Route
            exact
            path={`/courses/:id/update`}
            element={<UpdateCourse data={data} />}
          />{" "}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
