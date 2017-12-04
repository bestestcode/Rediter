import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

import { feedReloader } from './middleware';
import rootReducer from './reducers';

const socket = io('http://localhost:3001');
const socketioModdleWare = createSocketIoMiddleware(socket, "server/");
const logger = createLogger();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(
    logger,
    thunk,
    feedReloader,
    socketioModdleWare,
  ))
);
