import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
  list: [],
  error: { response: {}, invalid: false },
  toast: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_THREAD_LIST_REQUEST:
      return {
        list: [],
        error: false,
        toast: ''
      };

    case actionTypes.FETCH_THREAD_LIST_SUCCESS:
      if (action.payload.data.children.length > 1) {
        return {
          list: action.payload.data.children,
          error: false,
          toast: ''
        };
      } else {
        return {
          list: action.payload.data.children,
          error: false,
          toast: 'No more threads...'
        };
      }

    case actionTypes.FETCH_THREAD_LIST_ERROR:
      return {
        ...state,
        error: action.payload,
        toast: 'Unexpected error.'
      };

    case actionTypes.NOTIFICATION_THREAD_NEW: //This action is from socketio
      return {
        ...state,
        newPosts: action.newPosts
      };

    default:
      return state;
  }
};
