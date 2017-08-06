import React from 'react';
import CourseList from './CourseList';
import {getAllCourses} from '../../api/courseApi';
import {Link} from 'react-router-dom';

class CoursesPage extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        courses: []
      }
  }

  componentDidMount() {
    getAllCourses().then( courses => {
        this.setState({ courses });
    });
  }

  redirectToAddCoursePage = () => {
    // browserHistory.push('/course');
  }

  render() {
    return (
      <div>
        <h1>Courses</h1>
        <Link to="/course">Add Course</Link>
        <CourseList courses={this.state.courses}/>
      </div>
    );
  }
}

export default CoursesPage;