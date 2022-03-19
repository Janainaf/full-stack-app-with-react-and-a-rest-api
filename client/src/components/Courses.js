import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Courses(props) {
  const { context } = props;
  const [data, setData] = useState("");

  useEffect(() => {
    context.data
      .getCourses()
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.error("Error fetching and parsing data");
      });
  }, []);

  return (
    <div className="wrap main--grid">
      {data &&
        data.map((course) => (
          <a className="course--module course--link">
            <Link to={`/courses/${course.id}`}>
              <h2 className="course--label">Course</h2>
              <h3 className="course--title">{course.title}</h3>
            </Link>
          </a>
        ))}
      <a className="course--module course--add--module">
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
          <Link to={"/createcourse"}>New Course </Link>
        </span>
      </a>
    </div>
  );
}
export default Courses;
