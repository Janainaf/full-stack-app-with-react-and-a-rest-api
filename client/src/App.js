import React from "react";
import { Routes, Route } from "react-router-dom";
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
import PrivateRoute from "./PrivateRoute";

// Used context to get authenticated User for all components.
// Can be refactored to use {useContext} within each component

const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInUpWithContext = withContext(UserSignIn);
const UserSignOutUpWithContext = withContext(UserSignOut);
const CreateCourseWithContext = withContext(CreateCourse);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseDetailWithContext = withContext(UpdateCourse);
const PrivateRouteWithContext = withContext(PrivateRoute);

function App() {
  return (
    <div>
      {/* ***** Routes for every component **** */}
      <main>
        <HeaderWithContext />
        <Routes>
          <Route exact path="/" element={<CoursesWithContext />} />
          <Route path={`courses/:id`} element={<CourseDetailWithContext />} />
          <Route path="/courses/create" element={<CreateCourseWithContext />} />

          {/* ***** Private Routes ONLY FOR authenticated User **** */}
          {/* ***** Check PrivateRoute component **** */}

          <Route
            path="/courses/:id/update"
            element={<PrivateRouteWithContext />}
          >
            <Route
              path="/courses/:id/update"
              element={<UpdateCourseDetailWithContext />}
            />
          </Route>

          <Route path="/courses/create" element={<PrivateRouteWithContext />}>
            <Route
              path="/courses/create"
              element={<CreateCourseWithContext />}
            />
          </Route>

          <Route exact path="/signin" element={<UserSignInUpWithContext />} />
          <Route exact path="/signup" element={<UserSignUpWithContext />} />
          <Route exact path="/signout" element={<UserSignOutUpWithContext />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
