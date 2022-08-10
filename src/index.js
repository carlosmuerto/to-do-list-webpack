import './style.css';
import '@fortawesome/fontawesome-free/js/all.js';
import ToDoList from './modules/to-do-list.js';
import { PopulateTaskList, removeTaskElement } from './modules/to-do-dom-element.js';

const toDoList = new ToDoList();
const exmpleToDo = [
  {
    description: 'toDo 1',
    completed: false,
    index: 1,
  },
  {
    description: 'toDo 2',
    completed: false,
    index: 2,
  },
  {
    description: 'toDo 4 done',
    completed: true,
    index: 7,
  },
  {
    description: 'toDo 3',
    completed: false,
    index: 3,
  },
  {
    description: 'toDo last',
    completed: false,
  },
];

const removeTaskButtonEvent = (e) => {
  e.preventDefault();
  toDoList.getDoneTasks().forEach((task) => {
    removeTaskElement(task.index);
  });
  toDoList.deleteDoneTasks();
};

const addTaskToTodoList = (e) => {
  e.preventDefault();
  const task = document.getElementById('task-input').value;
  toDoList.addToDo(task);
  PopulateTaskList(toDoList);
};

const refreshListBtn = (e) => {
  e.preventDefault();
  console.table(toDoList.tasks);
};

const init = () => {
  toDoList.init(exmpleToDo);
  PopulateTaskList(toDoList);
  document.getElementById('clear-task-btn').addEventListener('click', removeTaskButtonEvent);
  document.getElementById('add-task-form').addEventListener('submit', addTaskToTodoList);
  document.getElementById('refresh-btn').addEventListener('click', refreshListBtn);
};

window.addEventListener('load', init);