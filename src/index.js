import './style.css';

const { library, dom } = require('@fortawesome/fontawesome-svg-core');

const {
  faArrowsRotate, faRightToBracket, faCheck, faEllipsisVertical,
} = require('@fortawesome/free-solid-svg-icons');

const ToDoList = require('./modules/to-do-list.js');
const { PopulateTaskList, removeTaskElement } = require('./modules/to-do-dom-element.js');

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

  // Kicks off the process of finding <i> tags and replacing with <svg>
  library.add(faArrowsRotate, faRightToBracket, faCheck, faEllipsisVertical);
  dom.watch();
};

window.addEventListener('load', init);