import React, { useState, useEffect } from "react";
import axios from "axios";

function CreateCourse() {
  const [course, setCourse] = useState([]);
  // const [errors, setErrors] = useState([]);

  useEffect(() => {
    const course = { title: "React Hooks POST Request Example" };
    axios
      .post("http://localhost:5000/api/courses", course)
      .then((response) => setCourse(response.data.id));
  }, []);

  let errors = false;

  return (
    <body>
      <div id="root">
        <main>
          <div class="wrap">
            <h2>Create Course</h2>
            {errors && (
              <div class="validation--errors">
                <h3>Validation Errors</h3>
                <ul>
                  <li>Please provide a value for "Title"</li>
                  <li>Please provide a value for "Description"</li>
                </ul>
              </div>
            )}
            <form>
              <div class="main--flex">
                <div>
                  <label for="courseTitle">Course Title</label>
                  <input
                    id="courseTitle"
                    name="courseTitle"
                    type="text"
                    value=""
                  />
                  {/* authenthicated user */}
                  <p>{course.author}</p>

                  <label for="courseDescription">Course Description</label>
                  <textarea
                    id="courseDescription"
                    name="courseDescription"
                  ></textarea>
                </div>
                <div>
                  <label for="estimatedTime">Estimated Time</label>
                  <input
                    id="estimatedTime"
                    name="estimatedTime"
                    type="text"
                    value=""
                  />

                  <label for="materialsNeeded">Materials Needed</label>
                  <textarea
                    id="materialsNeeded"
                    name="materialsNeeded"
                  ></textarea>
                </div>
              </div>
              <button class="button" type="submit">
                Create Course
              </button>
              <button
                class="button button-secondary"
                onclick="event.preventDefault(); location.href='index.html';"
              >
                Cancel
              </button>
            </form>
          </div>
        </main>
      </div>
    </body>
  );
}

export default CreateCourse;
