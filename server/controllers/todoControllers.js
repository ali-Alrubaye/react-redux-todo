const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');

const adapter = new FileSync('data/todo.json');
const db = low(adapter);

const getAll = async (req, res) => {
  const todos = db.get('todos').value();
  return res.status(200).send(todos);
};

const addTodo = async (req, res) => {
  const { name, isFinished } = req.body;
  const id = shortid.generate();
  db.get('todos').push({ id, name, isFinished }).write();

  const todos = db.get('todos').find({ id }).value();

  return res.status(201).send({
    error: false,
    todos,
  });
};

const putTodo = async (req, res) => {
  const { name, isFinished, id } = req.body;

  let todos = db.get('todos').find({ id }).assign({ name, isFinished }).write();

  const result = db.get('todos').find({ id }).value();

  return res.status(202).send({
    error: false,
    result,
  });
};
const finishedAllTodo = async (req, res) => {
  const { isFinished } = req.body;
  db.get('todos')
    .each((item) => {
      if (item.isFinished != isFinished) {
        item.isFinished = isFinished;
      }
    })
    .write();

  const todos = db.get('todos').value();

  return res.status(202).send({
    error: false,
    todos,
  });
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  db.get('todos').remove({ id }).write();

  return res.status(202).send({
    error: false,
  });
};

module.exports = {
  getAll,
  addTodo,
  putTodo,
  deleteTodo,
  finishedAllTodo,
};
