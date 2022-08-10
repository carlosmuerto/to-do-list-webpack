import './style.css';
import '@fortawesome/fontawesome-free/js/all.js';
import ToDoList from './modules/to-do-list.js';
import { PopulateTaskList, removeTaskElement } from './modules/to-do-dom-element.js';

const toDoList = new ToDoList();

const removeTaskButtonEvent = (e) => {
  e.preventDefault();
  toDoList.getDoneTasks().forEach((task) => {
    removeTaskElement(task.index);
  });
  toDoList.deleteDoneTasks();
};

const addTaskToTodoList = (e) => {
  e.preventDefault();
  const taskInput = document.getElementById('task-input');
  const task = taskInput.value;
  taskInput.value = '';
  toDoList.addToDo(task);
  PopulateTaskList(toDoList);
};

const refreshListBtn = (e) => {
  e.preventDefault();
  // for debuging onlly
  // eslint-disable-next-line no-console
  console.table(toDoList.tasks);
};

const init = () => {
  toDoList.init();
  PopulateTaskList(toDoList);
  document.getElementById('clear-task-btn').addEventListener('click', removeTaskButtonEvent);
  document.getElementById('add-task-form').addEventListener('submit', addTaskToTodoList);
  document.getElementById('refresh-btn').addEventListener('click', refreshListBtn);
};

window.addEventListener('load', init);