import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import Forbidden from "./Forbidden";
import ReactMarkdown from "react-markdown";

function CourseDetail(props) {
  const params = useParams();
  const { context } = props;
  const [selectedCourse, setselectedCourse] = useState("");
  const id = params.id;
  const _isMounted = useRef(true);
  let navigate = useNavigate();
  const authUser = context.authenticatedUser;

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
  });

  const handleRemoveCourse = (event) => {
    event.preventDefault();
    context.data
      .deleteCourse(
        id,
        authUser.user.emailAddress,
        context.authenticatedUser.password
      )
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <main>
      <div className="actions--bar">
        {selectedCourse && (
          <div className="wrap">
            {authUser === null ||
            authUser.user.id !== selectedCourse.course.User.id ? (
              <Link to="/" className="button button-secondary">
                Return to List
              </Link>
            ) : (
              <>
                <Link
                  to={`/courses/${selectedCourse.course.id}/update`}
                  className="button"
                >
                  Update Course{" "}
                </Link>
                <Link to="/" className="button" onClick={handleRemoveCourse}>
                  Delete Course
                </Link>
                <Link to="/" className="button button-secondary">
                  Return to List
                </Link>
              </>
            )}
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
                  <ReactMarkdown>
                    {selectedCourse.course.description}
                  </ReactMarkdown>
                </>
              )}
            </div>
            {selectedCourse && selectedCourse.course.materialsNeeded && (
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{selectedCourse.course.estimatedTime}</p>
                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                  <ReactMarkdown>
                    {selectedCourse.course.materialsNeeded}
                  </ReactMarkdown>
                </ul>
              </div>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
export default CourseDetail;
