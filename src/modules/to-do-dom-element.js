import ToDo from './to-do.js';
import ToDoList from './to-do-list.js';

const UpdateDoneBtn = (DoneBtnElement, completed) => {
  if (completed) DoneBtnElement.classList.add('done');
  else DoneBtnElement.classList.remove('done');
  DoneBtnElement.parentNode.dataset.completed = completed;
  DoneBtnElement.parentNode.querySelector('input').readOnly = completed;
};

const ToggleDoneTask = (DoneBtnElement, task, parrentTodoList) => {
  parrentTodoList.editTask(task.index, null, !(task.completed));
  UpdateDoneBtn(DoneBtnElement, parrentTodoList.tasks[task.index].completed);
};

const TodoDomElement = (task, parrentTodoList) => {
  if (!(task instanceof ToDo)) throw Error(`${task} is Not a ToDo object`);

  const taskElement = document.getElementById('task-item-template').cloneNode(true);

  taskElement.id = taskElement.id.replace('template', task.index);
  taskElement.classList.remove('template');

  taskElement.dataset.index = task.index;
  taskElement.dataset.completed = task.completed;
  taskElement.dataset.description = task.description;

  const DoneBtnElement = taskElement.querySelector('button');

  UpdateDoneBtn(DoneBtnElement, task.completed);

  DoneBtnElement.addEventListener('click', (e) => {
    e.preventDefault();
    ToggleDoneTask(DoneBtnElement, task, parrentTodoList);
  });

  const taskElementIput = taskElement.querySelector('input');

  taskElementIput.value = task.description;
  taskElementIput.addEventListener('input', (e) => {
    e.preventDefault();
    parrentTodoList.editTask(task.index, taskElementIput.value, null);
  });

  const liEle = document.createElement('li').appendChild(taskElement);
  liEle.classList.add('task-item');
  return liEle;
};

const PopulateTaskList = (toDoList) => {
  if (!(toDoList instanceof ToDoList)) throw Error(`${toDoList} is Not a ToDoList object`);
  toDoList.tasks.forEach((task) => {
    if (!document.getElementById(`task-item-${task.index}`)) {
      document.getElementById('task_list').querySelector('ul').appendChild(TodoDomElement(task, toDoList));
    }
  });
};

const removeTaskElement = (index) => {
  document.querySelector(`[data-index="${index}"]`).remove();
};

export { PopulateTaskList, removeTaskElement };