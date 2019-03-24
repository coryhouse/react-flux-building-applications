import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function CourseList({ courses, deleteCourse }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {courses.map(course => {
          return (
            <tr key={course.id}>
              <td>
                <a href={"http://pluralsight.com/courses/" + course.slug}>
                  Watch
                </a>
              </td>
              <td>
                <Link to={"/course/" + course.id}>{course.title}</Link>
              </td>
              <td>{course.authorId}</td>
              <td>{course.category}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => deleteCourse(course.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  deleteCourse: PropTypes.func.isRequired
};

export default CourseList;
