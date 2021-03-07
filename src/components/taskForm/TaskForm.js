import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../redux';

function TaskForm() {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();

    const task = {
      name,
      isFinished: false,
    };

    dispatch(addTodo(task));

    setName('');
  };
  return (
    <form onSubmit={handleSubmit} className="add-task">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span onClick={handleSubmit} className="plus">
        +
      </span>
    </form>
  );
}

export default TaskForm;
