import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CourseList({ courses, deleteCourse }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>&nbsp;</th>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th>Length</th>
        </tr>
      </thead>
      <tbody>
        {
          courses.map(course => {
            return (
              <tr key={course.id}>
                <td><button onClick={deleteCourse} value={course.id}>Delete</button></td>
                <td><a href={course.watchHref}>Watch</a></td>
                <td><Link to={'/course/' + course.id}>{course.title}</Link></td>
                <td>{course.authorId}</td>
                <td>{course.category}</td>
                <td>{course.length}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  );
};

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  deleteCourse: PropTypes.func.isRequired
};

export default CourseList;
