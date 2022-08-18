class ToDo {
  constructor(description = '', index = 0, completed = false) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

export default ToDo;