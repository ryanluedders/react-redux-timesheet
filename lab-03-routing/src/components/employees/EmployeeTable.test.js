import React from 'react';
import EmployeeRow from './EmployeeRow';
import EmployeeTable from './EmployeeTable';
import { mount } from 'enzyme';

describe('Employee Table Component: ', () => {
  it('contains the correct number of rows', () => {
    const employees = [{
      _id: 1,
      username: 'e1',
      email: 'e1@employer.com',
      firstName: 'Fred',
      lastName: 'Flintstone',
      admin: true,
    },{
      _id: 2,
      username: 'e2',
      email: 'e2@employer.com',
      firstName: 'Barney',
      lastName: 'Rubble',
      admin: true,
    }];

    const component = mount(<EmployeeTable employees={employees} />);

    expect(component).toContainReact(<th>Last Name</th>);
    expect(component).toIncludeText("Flintstone");

    expect(component.find('tbody tr')).toHaveLength(2);
  });
});
