import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastReducer } from 'react-redux-toastr';

import subreddits from './subreddits/reducer';
import threads from './feed/reducer';

export default combineReducers({
  subreddits,
  threads,
  form: formReducer,
  routing: routerReducer,
  toastr: toastReducer,
});
