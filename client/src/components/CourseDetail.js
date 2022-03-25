import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

function CourseDetail(props) {
  const params = useParams();
  const { context } = props;
  const [selectedCourse, setselectedCourse] = useState("");
  const id = params.id;
  let navigate = useNavigate();
  const authUser = context.authenticatedUser;

  // Fetches the selected course by id  using context and data helper
  // for more information, please check Context.js and Data.js
  useEffect(() => {
    context.data
      .getCourse(id)
      .then((response) => {
        setselectedCourse(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [context.data, id]);

  // Deletes the selected course by id

  const handleRemoveCourse = (event) => {
    event.preventDefault();
    context.data
      .deleteCourse(
        id,
        authUser.user.emailAddress,
        context.authenticatedUser.password
      )
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main>
      {/* *** Course Detail header (can be refactored into a new component)
      - shows delete, update and return button depending on auth user *** */}

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
                {/* ***Only the user who created the course can update or delete it*** */}
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
      {/* *** This part can be later refactored into a component *** */}

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
                  {/* ***Added Markdown for better readability *** */}

                  <ReactMarkdown>
                    {selectedCourse.course.description}
                  </ReactMarkdown>
                </>
              )}
            </div>
            {/* *** This part can be later refactored into a component *** */}

            {selectedCourse && (
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
