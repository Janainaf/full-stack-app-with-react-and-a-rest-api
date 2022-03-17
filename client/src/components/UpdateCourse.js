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

  useEffect(() => {
    context.data
      .getCourse(id)
      .then((response) => {
        console.log(response);
        setselectedCourse(response);
      })
      .catch((error) => {
        console.error("Error fetching and parsing data");
      });
  }, []);

  const handleUpdateCourse = (e) => {
    // const id = params.id;
    // axios
    //   .put(`http://localhost:5000/api/courses/${id}`)
    //   .catch((error) => console.log("Error fetching and parsing data", error));
  };

  return (
    <div className="wrap">
      {authUser === null ? (
        <Forbidden />
      ) : (
        selectedCourse && (
          <>
            <h2>Update Course</h2>
            <form onSubmit={handleUpdateCourse}>
              <div className="main--flex">
                <div>
                  <label for="courseTitle">Course Title</label>
                  <input
                    id="courseTitle"
                    name="courseTitle"
                    type="text"
                    value={selectedCourse.course.title}
                  />
                  <p>
                    By {selectedCourse.course.User.firstName}{" "}
                    {selectedCourse.course.User.lastName}
                  </p>

                  <label for="courseDescription">Course Description</label>
                  <textarea
                    id="courseDescription"
                    name="courseDescription"
                    placeholder={selectedCourse.course.description}
                  ></textarea>
                </div>
                <div>
                  <label for="estimatedTime">Estimated Time</label>
                  <input
                    id="estimatedTime"
                    name="estimatedTime"
                    type="text"
                    placeholder={selectedCourse.course.estimatedTime}
                  />

                  <label for="materialsNeeded">Materials Needed</label>
                  <textarea
                    id="materialsNeeded"
                    name="materialsNeeded "
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
    </div>
  );
}

export default UpdateCourse;
