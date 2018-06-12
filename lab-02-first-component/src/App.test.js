import React from 'react';
import { shallow } from 'enzyme';

import App from './App';
import Hello from './hello/Hello';

describe('App Component', () => {

  it('renders without exploding', () => {
    expect(shallow(<App />)).toHaveLength(1);
  });

  it('initializes with default greeting in state', () => {
    expect(shallow(<App />)).toHaveState('greeting', 'App User');
  });

  it('initializes with alternate greeting in state', () => {
    expect(shallow(<App greeting="React App User"/>)).toHaveState('greeting', "React App User");
  });

  it('renders the Hello component with a specified greeting', () => {
    const app = shallow(<App greeting="Greeting From State" />);

    expect(app).toContainReact(<Hello friend="Greeting From State" />);
  })

  it('renders the Hello component with a default greeting', () => {
    const app = shallow(<App />);

    expect(app).toContainReact(<Hello friend="App User" />);
  })

});
