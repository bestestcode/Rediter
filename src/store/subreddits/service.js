import axios from 'axios';

import * as actionTypes from './actionTypes';
import * as subredditsActions from './actions';
import { handleResponse } from '../../_common/helpers';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

const ENDPOINT = {
  SUBREDDIT: 'subreddits',
  // More to be added when we add more endpoints
};

export const createSubreddit = subreddit => handleResponse(axiosInstance.post(`${ENDPOINT.SUBREDDIT}`, subreddit));

export const fetchSubreddits = () => handleResponse(axiosInstance.get(ENDPOINT.SUBREDDIT));

export const updateSubreddit = subreddit => handleResponse(axiosInstance.put(`${ENDPOINT.SUBREDDIT}/${subreddit.id}`, subreddit));

export const deleteSubreddit = subreddit => handleResponse(axiosInstance.delete(`${ENDPOINT.SUBREDDIT}/${subreddit.id}`));
