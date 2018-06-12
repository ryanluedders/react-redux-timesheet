import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Hello from './Hello';

describe('Hello World:', () => {

    it('renders without exploding', () => {
        expect(shallow(<Hello />)).toHaveLength(1);
    });

    it('should render with default test', () => {
        const component = shallow(<Hello />);

        expect(component).toIncludeText('Howdy');
        expect(component).toIncludeText('Partner');
    });

    it('should render with our props', () => {
        const component = shallow(<Hello friend="Fred" />);

        expect(component).toIncludeText('Howdy');
        expect(component).toIncludeText('Fred');
        expect(component).not.toIncludeText('Partner');
    })

    it('renders to match a snapshot', () => {
        const component = renderer.create(<Hello friend="Obi Wan" />);

        expect(component.toJSON()).toMatchSnapshot();
    })

});