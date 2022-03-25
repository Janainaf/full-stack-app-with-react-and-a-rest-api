import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Courses(props) {
  const { context } = props;
  const [data, setData] = useState("");

  // Fetches all courses using context and data helper
  // for more information, please check Context.js and Data.js
  useEffect(() => {
    context.data
      .getCourses()
      .then((response) => {
        setData(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [context.data]);

  return (
    <div className="wrap main--grid">
      {/* Maps all courses fetched and displays them on individual cards - 
      each course is linked to a course detail component by its id */}
      {data &&
        data.map((course) => (
          <Link
            to={`/courses/${course.id}`}
            className="course--module course--link"
            key={course.id}
          >
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{course.title}</h3>
          </Link>
        ))}
      <Link to="/courses/create" className="course--module course--add--module">
        <span className="course--add--title">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 13 13"
            className="add"
          >
            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
          </svg>
          New Course
        </span>
      </Link>
    </div>
  );
}
export default Courses;
