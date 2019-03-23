import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
// Note: I don't technically need these imports since they're imported
// on ManageCoursePage.js, but for the calls to loadAuthors and loadCourses
// to work below, these must be imported first so that they're registered
// with the dispatcher, so doing so here. (it coincidentally works without
// these, but leaving these in to be clear and deterministic)
import authorStore from "./stores/authorStore"; // eslint-disable-line no-unused-vars
import courseStore from "./stores/courseStore"; // eslint-disable-line no-unused-vars
import { loadCourses } from "./actions/courseActions";
import { loadAuthors } from "./actions/authorActions";

loadAuthors();
loadCourses();

render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
