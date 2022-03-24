import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Forbidden from "./Forbidden";
import axios from "axios";

function UpdateCourse(props) {
  const params = useParams();
  const { context } = props;
  const [selectedCourse, setselectedCourse] = useState("");
  const id = params.id;
  let navigate = useNavigate();
  const authUser = context.authenticatedUser;
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/courses/${id}`)
      .then((response) => {
        setselectedCourse(response.data.course);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, authUser.user.id]);

  const handleUpdateCourse = (event) => {
    event.preventDefault();
    console.log("behold the selected course");
    console.log(selectedCourse);

    context.data
      .updateCourse(
        id,
        selectedCourse,
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

  const handleChanges = (event) => {
    setselectedCourse((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="wrap">
      {selectedCourse && (
        <>
          {authUser === null || authUser.user.id !== selectedCourse.User.id ? (
            <Forbidden />
          ) : (
            selectedCourse && (
              <>
                <h2>Update Course</h2>
                {errors.length > 0 && (
                  <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>
                      {errors.map((error, i) => (
                        <li key={i}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <form onSubmit={handleUpdateCourse}>
                  <div className="main--flex">
                    <div>
                      <label htmlFor="courseTitle">Course Title</label>
                      <input
                        id="title"
                        type="text"
                        name="title"
                        defaultValue={selectedCourse.title}
                        onInput={handleChanges}
                      />
                      <p>
                        By {selectedCourse.User.firstName}{" "}
                        {selectedCourse.User.lastName}
                      </p>

                      <label htmlFor="courseDescription">
                        Course Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        defaultValue={selectedCourse.description}
                        onInput={handleChanges}
                      ></textarea>
                    </div>
                    <div>
                      <label htmlFor="estimatedTime">Estimated Time</label>
                      <input
                        id="estimatedTime"
                        name="estimatedTime"
                        type="text"
                        defaultValue={selectedCourse.estimatedTime}
                        onInput={handleChanges}
                      />

                      <label htmlFor="materialsNeeded">Materials Needed</label>
                      <textarea
                        id="materialsNeeded"
                        name="materialsNeeded"
                        defaultValue={selectedCourse.materialsNeeded}
                        onInput={handleChanges}
                      ></textarea>
                    </div>
                  </div>
                  <button className="button" type="submit">
                    Update Course
                  </button>
                  <Link to={`/courses/${id}`}>
                    <button className="button button-secondary">Cancel</button>{" "}
                  </Link>{" "}
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
