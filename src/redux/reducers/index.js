import {combineReducers} from 'redux';

import moviesReducer from './movies';
import suggestReducer from './suggest'

export default combineReducers({
    movies: moviesReducer,
    suggest: suggestReducer
})