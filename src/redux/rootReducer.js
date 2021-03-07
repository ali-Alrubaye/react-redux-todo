import { combineReducers } from 'redux';
import todosReducer from './reducers/TodosReducer';

const rootReducer = combineReducers({
  todos: todosReducer,
});

export default rootReducer;
