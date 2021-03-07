import axios from 'axios';

export async function getTodos() {
  const response = await axios.get('http://localhost:3004/todo');
  return response;
}

export async function addTodo(values) {
  const response = await axios.post('http://localhost:3004/todo', values);
  return response;
}
export async function deleteTodo(id) {
  const response = await axios.delete(`http://localhost:3004/todo/${id}`);
  return response;
}
export async function updateTodo(todo) {
  const response = await axios.put('http://localhost:3004/todo', todo);
  return response;
}
export async function finishedAllTodo(isFinished) {
  const response = await axios.put(
    'http://localhost:3004/todo/toFinished',
    isFinished
  );
  return response;
}

const todosServer = {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  finishedAllTodo,
};
export default todosServer;
