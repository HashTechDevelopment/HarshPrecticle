import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {appReducers} from './reducers';

const rootReducer = combineReducers({
  appReducers: appReducers,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
