import { toastr } from 'react-redux-toastr';

import * as actionTypes from './actionTypes';
import * as service from './service';
import { history } from '../../_common/helpers';

export const fetchSubreddits = () => (dispatch) => {
  dispatch(request());

  return service.fetchSubreddits()
    .then(
      (res) => {
        dispatch(success(res));
      },
      (error) => {
        dispatch(failure(error));
      },
    );

  function request() { return { type: actionTypes.FETCH_SUBREDDITS_REQUEST }; }
  function success(subreddits) { return { type: actionTypes.FETCH_SUBREDDITS_SUCCESS, subreddits }; }
  function failure(error) { return { type: actionTypes.FETCH_SUBREDDITS_FAILURE, error }; }
};

export const createSubreddit = subreddit => (dispatch) => {
  dispatch(request());

  const newSubreddit = { ...subreddit, favorite: true };
  return service.createSubreddit(newSubreddit)
    .then(
      (res) => {
        dispatch(success(res));
        history.push('/subreddits');
      },
      (error) => {
        dispatch(failure(error));
        toastr.error(error);
      },
    );

  function request() { return { type: actionTypes.CREATE_SUBREDDIT_REQUEST }; }
  function success(subreddit) { return { type: actionTypes.CREATE_SUBREDDIT_SUCCESS, subreddit }; }
  function failure(error) { return { type: actionTypes.CREATE_SUBREDDIT_FAILURE, error }; }
};

export const updateSubreddit = subreddit => (dispatch) => {
  dispatch(request());

  return service.updateSubreddit(subreddit)
    .then(
      (res) => {
        dispatch(success(res));
      },
      (error) => {
        dispatch(failure(error));
      },
    );

  function request() { return { type: actionTypes.UPDATE_SUBREDDIT_REQUEST }; }
  function success(subreddit) { return { type: actionTypes.UPDATE_SUBREDDIT_SUCCESS, subreddit }; }
  function failure(error) { return { type: actionTypes.UPDATE_SUBREDDIT_FAILURE, error }; }
};

export const deleteSubreddit = subreddit => (dispatch) => {
  dispatch(request());

  return service.deleteSubreddit(subreddit)
    .then(
      (res) => {
        dispatch(success(subreddit));
      },
      (error) => {
        dispatch(failure(error));
      },
    );

  function request() { return { type: actionTypes.DELETE_SUBREDDIT_REQUEST }; }
  function success(subreddit) { return { type: actionTypes.DELETE_SUBREDDIT_SUCCESS, subreddit }; }
  function failure(error) { return { type: actionTypes.DELETE_SUBREDDIT_FAILURE, error }; }
};
