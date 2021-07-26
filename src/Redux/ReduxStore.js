import {applyMiddleware, combineReducers, compose, createStore} from "redux"
import thunkMiddleware from 'redux-thunk';
import authReducer from './AuthReducer';
import usersReducer from "./UsersReducer";
//two reducers
let reducers = combineReducers({
    auth: authReducer,
    users:usersReducer
})
//also implement redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,composeEnhancers(applyMiddleware(thunkMiddleware)
));

export default store;