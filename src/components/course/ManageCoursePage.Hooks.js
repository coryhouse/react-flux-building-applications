import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import CourseForm from "./CourseForm";
import courseStore from "../../stores/courseStore";
import authorStore from "../../stores/authorStore";
import { updateCourse, createCourse } from "../../actions/courseActions";

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

  // Subscribe/Unsub to Flux store
  const onChange = useCallback(() => {
    debugger;
    setCourse(courseStore.getCourses());
    setAuthors(authorStore.getAuthors());
  });

  useEffect(() => {
    courseStore.addChangeListener(() => alert("onChange"));
    return () => courseStore.removeChangeListener(onChange);
  }, []);

  useEffect(() => {
    const courseId = match.params.id;
    if (courseId) {
      const course = courseStore.getCourseById(courseId);
      console.log(course);
      course ? setCourse(course) : setRedirectTo404Page(true);
    }
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
