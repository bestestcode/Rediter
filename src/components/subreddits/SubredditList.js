import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { subredditsActions } from '../../store/subreddits';
import { SubredditItem } from './SubredditItem';

export class SubredditList extends React.Component {
  componentDidMount() {
    const { fetchSubreddits } = this.props;
    fetchSubreddits();
  }

  handleLike = (subreddit) => {
    const { updateSubreddit } = this.props;
    const newSubreddit = { ...subreddit, favorite: !subreddit.favorite };
    updateSubreddit(newSubreddit);
  }

  render() {
    const {
      subreddits,
      deleteSubreddit
    } = this.props;

    const { items } = subreddits;

    return (
      <div>
        <div className="row">
          <div className="col-md-12 text-right">
            <Link to="/subreddits/new" className="btn"><i className="material-icons">add</i>Add</Link>
          </div>
        </div>
        { items && items.length > 0 &&
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map(subreddit => SubredditItem({
              subreddit,
              onDelete: deleteSubreddit,
              onLike: this.handleLike,
              isTheOnlyItem: items.length == 1,
              }))}
          </tbody>
        </table>
      }
      </div>
    );
  }
}

export default connect(
  (state) => {
    const { subreddits } = state;
    return { subreddits };
  },

  dispatch => bindActionCreators(subredditsActions, dispatch),
)(SubredditList);
