import React from 'react'
import { shallow } from 'enzyme'

import Map from '../components/home/Map';

import Home from '../pages/index';

// test components

it('renders without crashing', () => {
    shallow(<Map />);
});

// test pages

it('renders without crashing', () => {
    shallow(<Home/>);
});