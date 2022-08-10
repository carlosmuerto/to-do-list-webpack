import ToDo from './to-do.js';
import ToDoList from './to-do-list.js';

const taskTemplate = document.getElementById('task-template');
const taskList = document.getElementById('task_list');

const TodoDomElement = (toDo) => {
  if (!(toDo instanceof ToDo)) throw Error(`${toDo} is Not a ToDo object`);

  const taskElement = taskTemplate.cloneNode(true);

  taskElement.id = taskElement.id.replace('template', toDo.index);
  taskElement.classList.remove('template');
  if (toDo.completed) taskElement.querySelector('button i').classList.add(...['fa-solid', 'fa-check']);
  else taskElement.querySelector('button i').classList.add(...['fa-regular', 'fa-square']);

  taskElement.querySelector('textarea').value = toDo.description;

  const liEle = document.createElement('li').appendChild(taskElement);

  return liEle;
};

const PopulateTaskList = (toDoList) => {
  if (!(toDoList instanceof ToDoList)) throw Error(`${toDoList} is Not a ToDoList object`);
  toDoList.tasks.forEach((task) => {
    taskList.querySelector('ul').appendChild(TodoDomElement(task));
  });
};

const removeTaskElement = (index) => {
  document.getElementById(`task-${index}`).remove();
};

export { PopulateTaskList, removeTaskElement };