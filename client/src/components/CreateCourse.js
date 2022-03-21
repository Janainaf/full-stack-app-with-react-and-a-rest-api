import React from "react";
import { useState } from "react";
import Forbidden from "./Forbidden";

import { useNavigate } from "react-router-dom";

function CreateCourse(props) {
  const { context } = props;
  let navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setestimatedTime] = useState("");
  const [materialsNeeded, setmaterialsNeeded] = useState("");
  const authUser = context.authenticatedUser;

  function handleSubmit(event) {
    event.preventDefault();
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: authUser.user.id,
    };
    context.data
      .createCourse(
        course,
        authUser.user.emailAddress,
        context.authenticatedUser.password
      )
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  let errors = false;
  return (
    <div id="root">
      <main>
        {authUser === null && <Forbidden />}
        {authUser !== null && (
          <div className="wrap">
            <h2>Create Course</h2>
            {errors && (
              <div className="validation--errors">
                <h3>Validation Errors</h3>
                <ul>
                  <li>Please provide a value for "Title"</li>
                  <li>Please provide a value for "Description"</li>
                </ul>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="main--flex">
                <div>
                  <label htmlFor="courseTitle">Course Title</label>
                  <input
                    id="courseTitle"
                    name="courseTitle"
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                  <p>
                    {" "}
                    By {authUser.user.firstName} {authUser.user.lastName}
                  </p>

                  <label htmlFor="courseDescription">Course Description</label>
                  <textarea
                    id="courseDescription"
                    name="courseDescription"
                    type="text"
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
                    value={estimatedTime}
                    onChange={(event) => setestimatedTime(event.target.value)}
                  />
                  <label htmlFor="materialsNeeded">Materials Needed</label>
                  <textarea
                    id="materialsNeeded"
                    name="materialsNeeded"
                    type="text"
                    value={materialsNeeded}
                    onChange={(event) => setmaterialsNeeded(event.target.value)}
                  ></textarea>
                </div>
              </div>
              <button className="button" type="submit">
                Create Course
              </button>
              <button className="button button-secondary">Cancel</button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

export default CreateCourse;
