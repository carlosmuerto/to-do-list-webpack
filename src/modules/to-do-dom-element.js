import ToDo from './to-do.js';
import ToDoList from './to-do-list.js';

const taskTemplate = document.getElementById('task-item-template');
const taskList = document.getElementById('task_list');

const UpdateDoneBtn = (DoneBtnElement, completed) => {
  const DoneIconElement = DoneBtnElement.querySelector('*');
  if (completed) DoneIconElement.classList.add(...['fa-solid', 'fa-check']);
  else DoneIconElement.classList.add(...['fa-regular', 'fa-square']);
};

const ToggleDoneTask = (DoneBtnElement, task) => {
  task.completed = !task.completed;
  UpdateDoneBtn(DoneBtnElement, task.completed);
};

const TodoDomElement = (task) => {
  if (!(task instanceof ToDo)) throw Error(`${task} is Not a ToDo object`);

  const taskElement = taskTemplate.cloneNode(true);

  taskElement.id = taskElement.id.replace('template', task.index);
  taskElement.classList.remove('template');

  const DoneBtnElement = taskElement.querySelector('button');

  UpdateDoneBtn(DoneBtnElement, task.completed);

  DoneBtnElement.addEventListener('click', (e) => {
    e.preventDefault();
    ToggleDoneTask(DoneBtnElement, task);
  });

  taskElement.querySelector('textarea').value = task.description;

  const liEle = document.createElement('li').appendChild(taskElement);

  return liEle;
};

const PopulateTaskList = (toDoList) => {
  if (!(toDoList instanceof ToDoList)) throw Error(`${toDoList} is Not a ToDoList object`);
  toDoList.tasks.forEach((task) => {
    if (!document.getElementById(`task-item-${task.index}`)) { taskList.querySelector('ul').appendChild(TodoDomElement(task)); }
  });
};

const removeTaskElement = (index) => {
  document.getElementById(`task-item-${index}`).remove();
};

export { PopulateTaskList, removeTaskElement };