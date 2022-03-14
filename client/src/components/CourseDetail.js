import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";

function CourseDetail(props) {
  const params = useParams();
  const location = useLocation();
  const courses = props.data;

  const selectedCourse = courses.find((course) => course.id == params.id);

  //  **** Delete works, but needs to be auth. Also, fix redirect and re-render **** //

  const handleRemoveCourse = () => {
    const id = params.id;
    axios
      .delete(`http://localhost:5000/api/courses/${id}`)
      .catch((error) => console.log("Error fetching and parsing data", error));
  };

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          <Link to={`/courses/${selectedCourse.id}/update`}>
            <a className="button button-secondary">Update Course</a>{" "}
          </Link>{" "}
          <Link to={`/courses/`}>
            <a className="button" onClick={handleRemoveCourse}>
              Delete Course
            </a>
          </Link>{" "}
          <Link to="/">
            <a className="button button-secondary">Return to List</a>{" "}
          </Link>
        </div>
      </div>

      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              {selectedCourse && (
                <>
                  <h4 className="course--name">{selectedCourse.title}</h4>
                  <p>
                    {" "}
                    By {selectedCourse.User.firstName}{" "}
                    {selectedCourse.User.lastName}
                  </p>{" "}
                  <p>{selectedCourse.description}</p>
                </>
              )}
            </div>
            {selectedCourse && selectedCourse.materialsNeeded && (
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{selectedCourse.estimatedTime}</p>{" "}
                <h3 className="course--detail--title">Materials Needed</h3>
                <>
                  <ul className="course--detail--list">
                    <li>{selectedCourse.materialsNeeded}</li>
                  </ul>
                </>
              </div>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
export default CourseDetail;
