import { combineReducers } from 'redux';
import employees from './employee-reducer';
import projects from './project-reducer';
import timesheets from './timesheet-reducer';

const rootReducer = combineReducers({
  projects: projects,
  timesheets: timesheets,
  employees: employees,
});

export default rootReducer;
