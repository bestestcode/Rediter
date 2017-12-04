import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SubredditForm from './SubredditForm';
import { subredditsActions } from '../../store/subreddits';

export class SubredditAdd extends React.Component {
  handleSubmit = (values) => {
    const { createSubreddit } = this.props;
    createSubreddit(values);
  }

  render() {
    const { creating } = this.props;

    return (
      <div>
        {creating &
          <div className="progress">
            <div className="indeterminate" />
          </div>}
        <SubredditForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default connect(
  (state) => {
    const { creating } = state.subreddits;
    return { creating };
  },
  dispatch => bindActionCreators(subredditsActions, dispatch),
)(SubredditAdd);
