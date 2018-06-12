import React from 'react';
import Employees from './Employees';
import { shallow, mount } from 'enzyme';

describe('Employees Component: ', () => {

  it('should instantiate the employees component', () => {
    const component = shallow(<Employees />);

    expect(component).toHaveLength(1);
  });

  it('should should contain a correct employee', () => {
    const component = mount(<Employees />);

    expect(component).toIncludeText("admin@mixtape.com");
  });

});
