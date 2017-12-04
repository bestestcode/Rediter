import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

import App from '../app/App';

describe('Root testing', () => {
  const wrapper = shallow(<App />);
  it('+++ App Dumb Component Rendering', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('+++ App Snapshot Testing', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
