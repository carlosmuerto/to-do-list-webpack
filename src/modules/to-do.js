class ToDo {
  constructor(description = '', index = 0, completed = false) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }

  done() {
    this.completed = true;
  }
}

export default ToDo;