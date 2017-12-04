import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import { Feed } from '../components/feed/Feed';
import { ThreadList } from '../components/feed/ThreadList';

describe('-------------COMPONENT TESTING - Feed ------------- ', () => {
  const wrapper = shallow(<Feed />);

  it('+++ Feed Dumb Component Rendering', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('Feed function snapshot testing', () => {
    // const renderedResult = renderer.create(<Feed />).toJSON;
    expect(wrapper).toMatchSnapshot();
  });

  it('+++ Feed Contains ThreadList Component', () => {
    expect(wrapper.contains(<ThreadList />)).toBe(true);
  });
});
