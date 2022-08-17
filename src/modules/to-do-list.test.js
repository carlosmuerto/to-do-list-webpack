const TodoList = require('./to-do-list.js');

// Arrenge

const toDoListForAdd = new TodoList([], false);
const toDoListDelete = new TodoList([], false);
const expectedtoDoListForAdd = {
  tasks: [
    {
      completed: true,
      description: 'test task',
      index: 0,
    },
  ],
  useLocalStorage: false,
};

// act

toDoListForAdd.addToDo('test task', true);
toDoListDelete.addToDo('ffdagf', true);
toDoListDelete.delete(0);
// accert

describe('Test for TodoList Class', () => {
  test('Add Task to the List', () => {
    expect(toDoListForAdd).toEqual(expectedtoDoListForAdd);
  });
  test('Delete task from list', () => {
    expect(toDoListDelete.tasks).toEqual([]);
  });
});
