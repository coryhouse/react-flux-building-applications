import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './common/Header';
import HomePage from './HomePage';
import CoursesPage from './course/CoursesPage';
import ManageCoursePage from './course/ManageCoursePage'; //eslint-disable-line import/no-named-as-default
import AboutPage from './about/AboutPage';
import NotFoundPage from './NotFoundPage';

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
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/courses" component={CoursesPage}/>
          <Route path="/course" component={ManageCoursePage} exact />
          <Route path="/course/:id" component={ManageCoursePage}/>
          <Route path="/about" component={AboutPage}/>
          <Route component={NotFoundPage}/>
        </Switch>
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
