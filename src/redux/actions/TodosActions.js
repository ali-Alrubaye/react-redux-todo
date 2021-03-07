import {
  ADD_TODO,
  REMOVE_TODO,
  FINISH_TODO,
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
} from '../actionsType/Type';
import todosServer from '../../services/todosServer';

export const addTodo = (todo) => {
  return (dispatch) => {
    todosServer.addTodo(todo).then((response) => {
      const data = response.data.todos;
      if (!response.data.error) {
        dispatch(addTodoSuccess(data));
      }
    });
  };
};

export const addTodoSuccess = (todo) => {
  return {
    type: ADD_TODO,
    payload: todo,
  };
};

export const removeTodo = (id) => {
  return (dispatch) => {
    todosServer
      .deleteTodo(id)
      .then((response) => {
        if (response.status === '202' || !response.data.error) {
          dispatch(removeTodoFromStaor(id));
        }
      })
      .catch((error) => console.log(error.message));
  };
};
export const removeTodoFromStaor = (index) => {
  return {
    type: REMOVE_TODO,
    index,
  };
};

export const fetchTodos = () => {
  return (dispatch) => {
    dispatch(fetchTodosRequest());
    todosServer
      .getTodos()
      .then((response) => {
        // response.data is the Todos
        const todos = response.data;
        dispatch(fetchTodosSuccess(todos));
      })
      .catch((error) => {
        // error.message is the error message
        dispatch(fetchTodosFailure(error.message));
      });
  };
};

export const fetchTodosRequest = () => {
  return {
    type: FETCH_TODOS_REQUEST,
  };
};

export const fetchTodosSuccess = (todos) => {
  return {
    type: FETCH_TODOS_SUCCESS,
    payload: todos,
  };
};

export const fetchTodosFailure = (error) => {
  return {
    type: FETCH_TODOS_FAILURE,
    payload: error,
  };
};

export const changeTodosFinish = (todo) => {
  if (todo.isFinished) {
    todo.isFinished = false;
  } else {
    todo.isFinished = true;
  }
  return (dispatch) => {
    todosServer
      .updateTodo(todo)
      .then((response) => {
        if (response.status === '202' || !response.data.error) {
          dispatch(updateTodosFinish(todo));
        }
      })
      .catch((error) => console.log(error.message));
  };
};
export const changeAllTodosFinish = () => {
  return (dispatch) => {
    todosServer
      .finishedAllTodo({ isFinished: true })
      .then((response) => {
        // response.data is the Todos
        const todos = response.data.todos;
        if (response.status === '202' || !response.data.error) {
          dispatch(fetchTodosSuccess(todos));
        }
      })
      .catch((error) => console.log(error.message));
  };
};
export const updateTodosFinish = (value) => {
  return {
    type: FINISH_TODO,
    value,
  };
};
