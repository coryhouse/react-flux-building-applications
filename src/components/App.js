import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Tabs, Tab } from 'material-ui/Tabs';
import Header from './common/Header';
import HomePage from './HomePage';
import CoursesPage from './course/CoursesPage';
import ManageCoursePage from './course/ManageCoursePage'; //eslint-disable-line import/no-named-as-default
import AboutPage from './about/AboutPage';

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
      <div className="container-fluid">
        <Header/>
        <Route exact path="/" component={HomePage}/>
        <Route path="/courses" component={CoursesPage}/>
        <Route path="/course/:id" component={ManageCoursePage}/>
        <Route path="/course" component={ManageCoursePage} exact />
        <Route path="/about" component={AboutPage}/>
      </div>
    );
  }

  // render() {
  //   return (
  //     <Tabs value={this.state.value} onChange={this.handleChange}>
  //       <Tab label="Home" value="home">
  //         <HomePage />
  //       </Tab>
  //       <Tab label="Courses" value="courses">
  //         <CoursesPage />
  //       </Tab>
  //     </Tabs>
  //   );
  // }
}

export default App;
