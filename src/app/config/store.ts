import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import reducer, { IRootState } from '../reducer';
import loggerMiddleware from './logger-middleware';
import { loadingBarMiddleware } from 'react-redux-loading-bar';

const defaultMiddlewares = [
  thunkMiddleware,
  // errorMiddleware,
  // notificationMiddleware,
  promiseMiddleware,
  loadingBarMiddleware(),
  loggerMiddleware
];

const composedMiddlewares = (middlewares: any) =>
  process.env.NODE_ENV === 'development'
    ? compose(
        applyMiddleware(...defaultMiddlewares, ...middlewares)
      )
    : compose(applyMiddleware(...defaultMiddlewares, ...middlewares));

const initialize = (initialState?: IRootState, middlewares = []) => createStore(reducer, initialState, composedMiddlewares(middlewares));

export default initialize;
