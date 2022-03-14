import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation, Link } from "react-router-dom";

function UpdateCourse(props) {
  const params = useParams();
  const location = useLocation();
  const courses = props.data;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const selectedCourse = courses.find((course) => course.id == params.id);
  const onTitleChange = (e) => setTitle(e.target.value);

  //  **** Update works, but needs to be auth. Also, fix redirect and re-render **** //

  const handleUpdateCourse = (e) => {
    const id = params.id;
    axios
      .put(`http://localhost:5000/api/courses/${id}`)
      .catch((error) => console.log("Error fetching and parsing data", error));
  };

  return (
    <div class="wrap">
      <h2>Update Course</h2>
      <form onSubmit={handleUpdateCourse}>
        <div class="main--flex">
          <div>
            <label for="courseTitle">Course Title</label>
            <input
              id="courseTitle"
              name="courseTitle"
              type="text"
              value={selectedCourse.title}
              onChange={onTitleChange}
            />

            <p>
              By {selectedCourse.User.firstName} {selectedCourse.User.lastName}
            </p>

            <label for="courseDescription">Course Description</label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              placeholder={selectedCourse.description}
            ></textarea>
          </div>
          <div>
            <label for="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              placeholder={selectedCourse.estimatedTime}
            />

            <label for="materialsNeeded">Materials Needed</label>
            <textarea
              id="materialsNeeded"
              name="materialsNeeded "
              placeholder={selectedCourse.materialsNeeded}
            ></textarea>
          </div>
        </div>
        <button class="button" type="submit">
          Update Course
        </button>
        <button
          class="button button-secondary"
          onclick="event.preventDefault(); location.href='index.html';"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default UpdateCourse;
