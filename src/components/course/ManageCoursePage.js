import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import CourseForm from './CourseForm';
import {getAllAuthors} from '../../api/authorApi';
import toastr from 'toastr';

class ManageCoursePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course: {
        id: '',
        title: '',
        watchHref: '',
        authorId: '',
        length: '',
        category: ''
      },
      authors: [],
      errors: {},
      saving: false,
      redirectToCoursePage: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentDidMount() {
    getAllAuthors().then(authors => {
     this.setState({authors});
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.course.id !== nextProps.course.id) {
      // Necessary to populate form when existing course is loaded directly.
      this.setState({ course: Object.assign({}, nextProps.course) });
    }
  }

  updateCourseState({ target }) {
    this.setState(prevState => {
      const updatedCourse = { ...prevState.course, [target.name]: target.value };
      return updatedCourse;
    });
  }

  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  saveCourse(event) {
    event.preventDefault();

    if (!this.courseFormIsValid()) {
      return;
    }

    this.setState({ saving: true });

    this.props.actions.saveCourse(this.state.course)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({ saving: false });
      });
  }

  redirect() {
    this.setState({ saving: false, redirectToCoursePage: true });
    toastr.success('Course saved');
  }

  render() {
    if (this.state.redirectToCoursePage) return <Redirect to={{ pathname: '/courses' }} />
    return (
      <div>
        {this.state.course.title}
        <CourseForm
          authors={this.state.authors}
          onChange={this.updateCourseState}
          onSave={this.saveCourse}
          course={this.state.course}
          errors={this.state.errors}
          saving={this.state.saving}
        />
      </div>
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object,
  actions: PropTypes.object.isRequired
};

export default ManageCoursePage;