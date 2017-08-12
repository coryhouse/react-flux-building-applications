import React from 'react';
import CourseList from './CourseList';
import courseStore from '../../stores/courseStore';
import { deleteCourse } from '../../actions/courseActions';
import { Link } from 'react-router-dom';

class CoursesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: courseStore.getAllCourses()
    }
  }

  componentWillMount() {
    courseStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    courseStore.removeChangeListener(this.onChange);
  }

  onChange = () => {
    this.setState({ courses: courseStore.getAllCourses() });
  }

  onDeleteCourseClick = (event) => {
    deleteCourse(event.target.value);
  }

  render() {
    return (
      <div>
        <h1>Courses</h1>
        <Link to="/course">Add Course</Link>
        <CourseList courses={this.state.courses} deleteCourse={this.onDeleteCourseClick} />
      </div>
    );
  }
}

export default CoursesPage;