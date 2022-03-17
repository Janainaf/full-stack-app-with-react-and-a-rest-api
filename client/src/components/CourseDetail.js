import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function CourseDetail(props) {
  const params = useParams();
  const { context } = props;
  const [selectedCourse, setselectedCourse] = useState("");
  const id = params.id;
  const _isMounted = useRef(true);
  let navigate = useNavigate();

  useEffect(() => {
    context.data
      .getCourse(id)
      .then((response) => {
        setselectedCourse(response);
      })
      .catch((error) => {
        console.error("Error fetching and parsing data");
      });
    _isMounted.current = false;
  }, []);

  const handleRemoveCourse = (username, password) => {
    // const id = params.id;
    // axios
    //   .delete(`http://localhost:5000/api/courses/${id}`)
    //   .catch((error) => console.log("Error fetching and parsing data", error));
  };

  return (
    <main>
      <div className="actions--bar">
        {selectedCourse && (
          <div className="wrap">
            <Link to={`/courses/${selectedCourse.course.id}/update`}>
              <a className="button button-secondary">Update Course</a>{" "}
            </Link>{" "}
            <Link to={`/courses/`}>
              <a className="button">Delete Course</a>
            </Link>{" "}
            <Link to="/">
              <a className="button button-secondary">Return to List</a>{" "}
            </Link>
          </div>
        )}
      </div>
      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              {selectedCourse && (
                <>
                  <h4 className="course--name">
                    {selectedCourse.course.title}
                  </h4>
                  <p>
                    By {selectedCourse.course.User.firstName}{" "}
                    {selectedCourse.course.User.lastName}
                  </p>
                  <p>{selectedCourse.course.description}</p>
                </>
              )}
            </div>
            {selectedCourse && selectedCourse.course.materialsNeeded && (
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{selectedCourse.course.estimatedTime}</p>{" "}
                <h3 className="course--detail--title">Materials Needed</h3>
                <>
                  <ul className="course--detail--list">
                    <li>{selectedCourse.course.materialsNeeded}</li>
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
