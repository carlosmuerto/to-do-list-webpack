import _ from 'lodash';
import ToDo from './to-do.js';

class ToDoList {
  constructor(list = []) {
    this.tasks = list;
  }

  addToDoObj(toDo) {
    if (!(toDo instanceof ToDo)) throw Error(`${toDo} is Not a ToDo object`);
    this.tasks.push(toDo);
    this.tasks = _.sortBy(this.tasks, ['index', 'description']);
  }

  generateNextIndex() {
    if (this.tasks.length === 0) return 0;
    return Math.max(...this.tasks.map((task) => task.index)) + 1;
  }

  addToDo(desc, completed, index) {
    this.addToDoObj(new ToDo(desc, index, completed));
  }

  delete(index) {
    return _.remove(this.tasks, (task) => task.index === index);
  }

  getDoneTasks() {
    return this.tasks.filter((task) => task.completed);
  }

  deleteDoneTasks() {
    this.getDoneTasks().forEach((task) => {
      this.delete(task.index);
    });
  }

  init(listTodo) {
    listTodo.forEach((todo) => {
      this.addToDo(todo.description, todo.completed, todo.index || this.generateNextIndex());
    });
  }
}

export default ToDoList;