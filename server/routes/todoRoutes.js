const express = require('express');
const router = express.Router();

const todoController = require('../controllers/todoControllers');

router.get(`/`, todoController.getAll);

router.post(`/`, todoController.addTodo);

router.put(`/`, todoController.putTodo);
router.put(`/toFinished`, todoController.finishedAllTodo);

router.delete(`/:id`, todoController.deleteTodo);

module.exports = router;
