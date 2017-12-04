import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { feedActions } from '../../store/feed';
import { subredditsActions } from '../../store/subreddits';
import ThreadList from './ThreadList';

export class Feed extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.fetchContent(nextProps.location.search);
    }
  }

  // call action creator to fetch feed
  fetchContent = (search) => {
    const { fetchList, subreddits } = this.props;

    const subs = subreddits
      .filter(item => item.favorite)
      .reduce((str, item) => `${str}+${item.title}`, '');
    if (search) {
      fetchList(subs, search);
    } else {
      fetchList(subs, this.props.location.search);
    }
  }

  refreshContent = () => {
    this.fetchContent(null);
  }

  render() {
    const { newPosts } = this.props.threads;
    return (
      <div>
        {newPosts > 0 &&
          <div className="rf-new-post-notification">
            <button className="btn" onClick={this.refreshContent}>
              New Threads Posted
            </button>
          </div>}
        <ThreadList {...this.props} />
      </div>
    );
  }
}

Feed.contextTypes = {
  router: PropTypes.object
};

export default connect(
  state => ({
    threads: state.threads,
    toast: state.threads.toast,
    subreddits: state.subreddits.items
  }),

  dispatch => bindActionCreators({ ...feedActions, ...subredditsActions }, dispatch),
)(Feed);
