import {
  ADD_TODO,
  REMOVE_TODO,
  FINISH_TODO,
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
} from '../actionsType/Type';

const initialState = {
  loading: false,
  todos: [],
  error: '',
  isFinishedCount: 0,
};
let count = 0;
const TodosReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_TODOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TODOS_SUCCESS:
      countFinishTasks(payload);
      return {
        loading: false,
        todos: payload,
        error: '',
        isFinishedCount: count,
      };
    case FETCH_TODOS_FAILURE:
      return {
        loading: false,
        todos: [],
        error: payload,
      };
    case ADD_TODO:
      return {
        loading: false,
        todos: [...state.todos, payload],
        error: '',
        isFinishedCount: count,
      };
    case REMOVE_TODO:
      const item_index = action.index;
      const new_state = { ...state };
      // const fn = new_state.todos.findIndex(
      //   (item, index) => item.id === item_index
      // );
      // new_state.todos.splice(fn, 1);
      new_state.todos = state.todos.filter((todo) => todo.id !== item_index);

      return new_state;

    case FINISH_TODO:
      const fn_index = action.value;
      const set_state = { ...state };

      countFinishTasks(set_state.todos);
      set_state.isFinishedCount = count;
      set_state.todos.forEach((item, index) => {
        // if (fn_index === 'All') {
        //   item.isFinished = true;
        // } else
        if (item.id === fn_index.id) {
          item.isFinished = fn_index.isFinished;
        }
      });
      return set_state;

    default:
      return state;
  }
};

export default TodosReducer;

function countFinishTasks(payload) {
  count = 0;

  payload.forEach((d) => {
    if (d.isFinished) {
      count = count + 1;
    }
  });
}
