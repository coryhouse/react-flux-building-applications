import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import CourseForm from "./CourseForm";
import courseStore from "../../stores/courseStore";
import authorStore from "../../stores/authorStore";
import {
  updateCourse,
  createCourse,
  loadCourses
} from "../../actions/courseActions";
import { loadAuthors } from "../../actions/authorActions";

function ManageCoursePage({ match, history }) {
  const [course, setCourse] = useState({
    id: "",
    title: "",
    slug: "",
    authorId: "",
    category: ""
  });
  const [authors, setAuthors] = useState(authorStore.getAuthors());
  const [errors, setErrors] = useState({});
  const [redirectTo404Page, setRedirectTo404Page] = useState(false);

  const onCourseStoreChange = () => {
    const _course = courseStore.getCourseById(match.params.id);
    if (_course) setCourse(_course);
  };

  const onAuthorStoreChange = () => {
    setAuthors(authorStore.getAuthors());
  };

  // Sub/Unsub to Flux stores
  useEffect(() => {
    courseStore.addChangeListener(onCourseStoreChange);
    authorStore.addChangeListener(onAuthorStoreChange);

    // Cleanup on unmount
    return () => {
      courseStore.removeChangeListener(onCourseStoreChange);
      authorStore.removeChangeListener(onAuthorStoreChange);
    };
  }, []);

  useEffect(() => {
    const courses = courseStore.getCourses();
    if (courses.length === 0) {
      loadCourses();
    } else {
      const courseId = match.params.id;
      if (courseId) {
        const _course = courseStore.getCourseById(courseId);
        course ? setCourse(_course) : setRedirectTo404Page(true);
      }
    }

    if (authorStore.getAuthors().length === 0) loadAuthors();
  }, [match]);

  function handleChange({ target }) {
    setCourse(prevCourse => ({ ...prevCourse, [target.name]: target.value }));
  }

  function formIsValid() {
    let isValid = true;
    let errors = {};

    if (!course.title) {
      errors.title = "Title is required.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  }

  function saveCourse(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    course.id ? updateCourse(course) : createCourse(course);
    history.push("/courses");
  }

  // Showing alternative redirect approach
  if (redirectTo404Page) return <Redirect to="/404" />;

  return (
    <CourseForm
      authors={authors}
      onChange={handleChange}
      onSubmit={saveCourse}
      course={course}
      errors={errors}
    />
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object,
  match: PropTypes.object
};

export default ManageCoursePage;
