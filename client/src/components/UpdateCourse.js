import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Forbidden from "./Forbidden";

function UpdateCourse(props) {
  const params = useParams();
  const { context } = props;
  const [selectedCourse, setselectedCourse] = useState("");
  const id = params.id;
  let navigate = useNavigate();
  const authUser = context.authenticatedUser;
  const _isMounted = useRef(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setestimatedTime] = useState("");
  const [materialsNeeded, setmaterialsNeeded] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    context.data
      .getCourse(id)
      .then((response) => {
        setselectedCourse(response);
      })
      .catch((err) => {
        console.log(err);
      });
    _isMounted.current = false;
  });

  const handleUpdateCourse = (event) => {
    event.preventDefault();
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: authUser.user.id,
    };
    context.data
      .updateCourse(
        id,
        course,
        authUser.user.emailAddress,
        context.authenticatedUser.password
      )
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="wrap">
      {selectedCourse && (
        <>
          {authUser === null ||
          authUser.user.id !== selectedCourse.course.User.id ? (
            <Forbidden />
          ) : (
            selectedCourse && (
              <>
                <h2>Update Course</h2>
                {errors.length > 0 && (
                  <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <h3>{errors}</h3>
                    {/* <ul>
                <li> </li>}
              </ul> */}
                  </div>
                )}
                <form onSubmit={handleUpdateCourse}>
                  <div className="main--flex">
                    <div>
                      <label htmlFor="courseTitle">Course Title</label>
                      <input
                        id="courseTitle"
                        name="courseTitle"
                        type="text"
                        placeholder={selectedCourse.course.title}
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                      />
                      <p>
                        By {selectedCourse.course.User.firstName}{" "}
                        {selectedCourse.course.User.lastName}
                      </p>

                      <label htmlFor="courseDescription">
                        Course Description
                      </label>
                      <textarea
                        id="courseDescription"
                        name="courseDescription"
                        placeholder={selectedCourse.course.description}
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label htmlFor="estimatedTime">Estimated Time</label>
                      <input
                        id="estimatedTime"
                        name="estimatedTime"
                        type="text"
                        placeholder={selectedCourse.course.estimatedTime}
                        value={estimatedTime}
                        onChange={(event) =>
                          setestimatedTime(event.target.value)
                        }
                      />

                      <label htmlFor="materialsNeeded">Materials Needed</label>
                      <textarea
                        id="materialsNeeded"
                        name="materialsNeeded "
                        value={materialsNeeded}
                        onChange={(event) =>
                          setmaterialsNeeded(event.target.value)
                        }
                        placeholder={selectedCourse.course.materialsNeeded}
                      ></textarea>
                    </div>
                  </div>
                  <button className="button" type="submit">
                    Update Course
                  </button>
                  <button className="button button-secondary">Cancel</button>
                </form>
              </>
            )
          )}
        </>
      )}
    </div>
  );
}

export default UpdateCourse;
