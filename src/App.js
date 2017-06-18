import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import HomePage from './components/HomePage';
import CoursesPage from './components/courses/CoursesPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'home',
    };
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  render() {
    return (
      <Tabs value={this.state.value} onChange={this.handleChange}>
        <Tab label="Home" value="home">
          <HomePage />
        </Tab>
        <Tab label="Courses" value="courses">
          <CoursesPage />
        </Tab>
      </Tabs>
    );
  }
}

export default App;
