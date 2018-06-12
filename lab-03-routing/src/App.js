import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Projects from './components/projects/Projects';
import Employees from './components/employees/Employees';
import Timesheets from './components/timesheets/Timesheets';
import Navigation from './components/nav/Navigation'

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navigation />
          <Switch>
            <Route path="/projects" component={Projects} />
            <Route exact path="/employees" component={Employees} />
            <Route path="/employees/:user_id/timesheets" componen={Timesheets} />
            <Redirect to="/employees" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
