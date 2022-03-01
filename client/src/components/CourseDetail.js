import React from "react";
import { useParams, useLocation, Link } from "react-router-dom";

function CourseDetail(props) {
  const params = useParams();
  const location = useLocation();
  const courses = props.data;

  const found = courses.find((course) => course.id == params.id);

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          <Link to={`/courses/${found.id}/update`}>
            <a className="button button-secondary">Update Course</a>{" "}
          </Link>{" "}
          <a className="button">Delete Course</a>
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
              {found && (
                <>
                  <h4 className="course--name">{found.title}</h4>
                  <p>
                    {" "}
                    By {found.User.firstName} {found.User.lastName}
                  </p>{" "}
                  <p>{found.description}</p>
                </>
              )}
            </div>
            {found && found.materialsNeeded && (
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{found.estimatedTime}</p>
                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                  {" "}
                  {[found.materialsNeeded].forEach((material) => {
                    <>
                      <li>{console.log(material)}</li>
                    </>;
                  })}
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
