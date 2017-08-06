import React from 'react';
import CourseList from './CourseList';
import {getAllCourses} from '../../api/courseApi';
// import {browserHistory} from 'react-router';

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
        <input type="submit"
               value="Add Course"
               className="btn btn-primary"
               onClick={this.redirectToAddCoursePage}/>
        <CourseList courses={this.state.courses}/>
      </div>
    );
  }
}

export default CoursesPage;