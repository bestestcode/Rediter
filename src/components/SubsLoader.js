import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { subredditsActions } from '../store/subreddits';


class SubsLoader extends React.Component {
  componentWillMount() {
    const { subreddits, fetchSubreddits } = this.props;

    if (!subreddits || !subreddits.items || subreddits.items.length == 0) {
      fetchSubreddits();
    }
  }

  render() {
    const {
      component: Component,
      subreddits,
      ...rest
    } = this.props;

    return (
      <Route
        {...rest}
        render={(props) => {
        if (subreddits.items && subreddits.items.length > 0) {
          return (<Component {...props} />);
        } else if (subreddits.error) {
          return <span>Error loading subreddits</span>;
        } else {
          return (
            <div className="progress">
              <div className="indeterminate" />
            </div>
          );
        }
      }}
      />
    );
  }
}

export default connect(
  (state) => {
    const { subreddits } = state;
    return { subreddits };
  },
  dispatch => bindActionCreators({
    ...subredditsActions
  }, dispatch)
)(SubsLoader);
