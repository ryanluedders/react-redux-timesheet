import React from 'react';
import Navigation from './Navigation';
import { mount } from 'enzyme';

import { BrowserRouter } from 'react-router-dom';

describe('Navigation Component: ', () => {
  let nav;

  beforeEach(() => {
    nav = mount(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );
  });

  it ('should instantiate the navigation component', () => {
    expect(nav).toHaveLength(1);
  })

});
