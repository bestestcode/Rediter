import * as actionTypes from './subreddits/actionTypes';
import { fetchList } from './feed/actions';

export const feedReloader = store => next => (action) => {
  next(action);

  switch (action.type) {
    case actionTypes.FETCH_SUBREDDITS_SUCCESS:
    case actionTypes.CREATE_SUBREDDIT_SUCCESS:
    case actionTypes.UPDATE_SUBREDDIT_SUCCESS:
    case actionTypes.DELETE_SUBREDDIT_SUCCESS: {
      const subs = store.getState().subreddits.items
        .filter(item => item.favorite)
        .reduce((str, item) => `${str}+${item.title}`, '');
      store.dispatch(fetchList(subs));
      break;
    }
    default:
      break;
  }
};
