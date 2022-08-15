import { sortBy, remove } from 'lodash';
import ToDo from './to-do.js';
import storageAvailable from './localStorageTools.js';

class ToDoList {
  constructor(list = []) {
    this.tasks = list;
  }

  addToDoObj(toDo) {
    if (!(toDo instanceof ToDo)) throw Error(`${toDo} is Not a ToDo object`);
    this.tasks.push(toDo);
    this.tasks = sortBy(this.tasks, ['index', 'description']);
    this.refreshTaskIndex();
  }

  generateNextIndex() {
    if (this.tasks.length === 0) return 0;
    return Math.max(...this.tasks.map((task) => task.index)) + 1;
  }

  addToDo(desc, completed, index) {
    this.addToDoObj(new ToDo(desc, index || this.generateNextIndex(), completed));
  }

  delete(index) {
    const delTask = remove(this.tasks, (task) => task.index === index);
    this.refreshTaskIndex();
    return delTask;
  }

  getDoneTasks() {
    return this.tasks.filter((task) => task.completed);
  }

  refreshTaskIndex() {
    this.tasks.forEach((task, index) => { task.index = index; });
    this.updateStoreFormData();
  }

  deleteDoneTasks() {
    this.getDoneTasks().forEach((task) => {
      this.delete(task.index);
    });
  }

  getStoreFormData() {
    const obj = JSON.parse(localStorage.getItem('ToDoList-tasks-data'));
    if (obj) {
      obj.tasks.forEach((todo) => {
        this.addToDo(todo.description, todo.completed, todo.index);
      });
    }
  }

  updateStoreFormData() {
    if (!storageAvailable()) return;
    localStorage.setItem(
      'ToDoList-tasks-data',
      JSON.stringify(this),
    );
  }

  init() {
    this.getStoreFormData();
  }
}

export default ToDoList;