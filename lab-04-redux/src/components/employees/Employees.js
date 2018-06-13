import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PageHeader, Grid, Row } from 'react-bootstrap';

import * as EmployeeActions from '../../actions/EmployeeActionCreator';
import EmployeeTable from './EmployeeTable';

const mapStateToProps = state => {
  return {
    employees : state.employees.employees,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions : bindActionCreators(EmployeeActions, dispatch),
  };
}

class Employees extends Component {
  constructor(props) {
    super(props);
    props.actions.listEmployees();
  }

  render() {
    return (
      <Grid>
        <Row>
          <PageHeader>Employees</PageHeader>
        </Row>
        <Row>
          <EmployeeTable employees={this.props.employees} actions={this.props.actions} />
        </Row>
      </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Employees);
