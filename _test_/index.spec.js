import React from 'react'
import { shallow } from 'enzyme'

import SomeComponent from '../components/home/SomeComponent';

import Home from '../pages/index';

// test components

it('renders without crashing', () => {
    shallow(<SomeComponent />);
});

// test pages

it('renders without crashing', () => {
    shallow(<Home/>);
});