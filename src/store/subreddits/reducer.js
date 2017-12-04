import * as actionTypes from './actionTypes';

const initialState = {
  items: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SUBREDDITS_REQUEST:
      return {
        items: state.items,
        fetching: true
      };

    case actionTypes.FETCH_SUBREDDITS_SUCCESS:
      return { items: action.subreddits };

    case actionTypes.CREATE_SUBREDDIT_REQUEST:
      return {
        items: state.items,
        creating: true
      };

    case actionTypes.CREATE_SUBREDDIT_SUCCESS:
      return { items: state.items ? [...state.items, action.subreddit] : [action.subreddit] };

    case actionTypes.UPDATE_SUBREDDIT_REQUEST:
      return {
        items: state.items,
        updating: true
      };

    case actionTypes.UPDATE_SUBREDDIT_SUCCESS:
      return { items: state.items.map(subreddit => (subreddit.id == action.subreddit.id ? action.subreddit : subreddit)) };

    case actionTypes.DELETE_SUBREDDIT_REQUEST:
      return {
        items: state.items,
        deleting: true
      };

    case actionTypes.DELETE_SUBREDDIT_SUCCESS:
      return { items: state.items.filter(subreddit => subreddit.id != action.subreddit.id) };

    default:
      return state;
  }
};
