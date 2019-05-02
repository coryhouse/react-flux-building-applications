import React from "react";
import CourseList from "./CourseList";
import courseStore from "../../stores/courseStore";
import { deleteCourse, loadCourses } from "../../actions/courseActions";
import { Link } from "react-router-dom";

class CoursesPage extends React.Component {
  state = {
    courses: courseStore.getCourses()
  };

  componentDidMount() {
    if (courseStore.getCourses().length === 0) loadCourses();
  }

  componentWillMount() {
    courseStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    courseStore.removeChangeListener(this.onChange);
  }

  onChange = () => {
    this.setState({ courses: courseStore.getCourses() });
  };

  render() {
    return (
      <div>
        <h2>Courses</h2>

        <Link className="btn btn-primary add-course" to="/course">
          Add Course
        </Link>
        <CourseList courses={this.state.courses} deleteCourse={deleteCourse} />
      </div>
    );
  }
}

export default CoursesPage;
