import React from 'react';
import EmployeeRow from './EmployeeRow';
import { shallow } from 'enzyme';

describe('Employee Row Component: ', () => {
  it('should instantiate the employee row', () => {
    const employee = {
      username: 'fflintstone',
      email: 'fflintstone@slate.quarry.com',
      firstName: 'Fred',
      lastName: 'Flintstone',
      admin: true,
    };

    const component = shallow(<EmployeeRow employee={employee} />);

    expect(component).toContainReact(<td>Flintstone</td>);
    expect(component).toContainReact(<td>fflintstone</td>);
    expect(component).toContainReact(<td>Yes</td>);
  });
});
