import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTodos,
  removeTodo,
  changeTodosFinish,
  changeAllTodosFinish,
} from '../../redux';
import TaskForm from '../taskForm/TaskForm';

function TaskList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  const todosData = useSelector((state) => state.todos);

  function handleRemoveTodo(id) {
    dispatch(removeTodo(id));
  }
  function handleFinish(todo) {
    dispatch(changeTodosFinish(todo));
  }
  function handleFinishAll() {
    dispatch(changeAllTodosFinish());
  }

  return (
    <div>
      <div className="todo-container">
        <TaskForm />
        <div className="tasks-content">
          {todosData.loading ? (
            <h2>Loading</h2>
          ) : todosData.error ? (
            <span className="no-tasks-message">{todosData.error}</span>
          ) : todosData.todos.length === 0 ? (
            <span className="no-tasks-message">No data to show</span>
          ) : (
            todosData &&
            todosData.todos &&
            todosData.todos.map((todo, index) => (
              <span
                key={todo.id}
                className={
                  todo && todo.isFinished ? 'task-box finished' : ' task-box'
                }
                onClick={() => handleFinish(todo)}
              >
                {todo.name}
                <span
                  onClick={() => handleRemoveTodo(todo.id)}
                  className="delete"
                >
                  Delete
                </span>
              </span>
            ))
          )}
        </div>
      </div>
      <div className="task-stats">
        <div className="tasks-count">
          Tasks <span>{todosData.todos.length}</span>
        </div>
        <div className="delete-all">
          <span className="del-all">DeleteAll</span>
        </div>
        <div className="finish-all">
          <span className="fin-all" onClick={handleFinishAll}>
            FinishAll
          </span>
        </div>
        <div className="tasks-completed">
          Completed <span>{todosData.isFinishedCount}</span>
        </div>
      </div>
    </div>
  );
}

export default TaskList;
