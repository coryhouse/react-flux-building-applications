import React from "react";
import CourseList from "./CourseList";
import courseStore from "../../stores/courseStore";
import { deleteCourse } from "../../actions/courseActions";
import { Link } from "react-router-dom";

class CoursesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: courseStore.getCourses()
    };
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

  onDeleteCourseClick = event => {
    deleteCourse(event.target.value);
  };

  render() {
    return (
      <div>
        <h2>Courses</h2>

        <Link className="btn btn-primary add-course" to="/course">
          Add Course
        </Link>
        <CourseList
          courses={this.state.courses}
          deleteCourse={this.onDeleteCourseClick}
        />
      </div>
    );
  }
}

export default CoursesPage;
