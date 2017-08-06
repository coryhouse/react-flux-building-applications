import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const CourseList = ({courses}) => {
  return (
    <table className="table">
      <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
        <th>Length</th>
      </tr>
      </thead>
      <tbody>
      {
        courses.map(course =>
        <tr key={course.id}>
          <td><a href={course.watchHref}>Watch</a></td>
          <td><Link to={'/course/' + course.id}>{course.title}</Link></td>
          <td>{course.authorId}</td>
          <td>{course.category}</td>
          <td>{course.length}</td>
        </tr>
      )}
      </tbody>
    </table>
  );
};

CourseList.propTypes = {
  courses: PropTypes.array.isRequired
};

export default CourseList;
