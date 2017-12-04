import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as redditService from './service';

export const fetchList = (subreddit, search) => (dispatch) => {
  let path = '';

  // Chages the path based on the query
  if (subreddit === null) {
    path = '/new/.json';
  } else {
    path = `/r/${subreddit}/new/.json`;
  }

  if (search) {
    path = `${path}${search}`;
  }

  dispatch(request());

  return redditService.getThreads(path)
    .then((res) => {
      dispatch(success(res));
    })

    .catch((error) => {
      dispatch(failure(error));
    });

  function request() { return { type: actionTypes.FETCH_THREAD_LIST_REQUEST }; }
  function success(threads) { return { type: actionTypes.FETCH_THREAD_LIST_SUCCESS, payload: threads }; }
  function failure(error) { return { type: actionTypes.FETCH_THREAD_LIST_ERROR, payload: { response: error, invalid: true } }; }
};
