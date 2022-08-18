import ToDoList from '../to-do-list.js';

// eslint-disable-next-line func-names
const localStorageMock = (function () {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
}());

global.window.localStorage = localStorageMock;
global.localStorage = localStorageMock;

// Arrenge

const toDoListForAdd = new ToDoList([]);
const toDoListDelete = new ToDoList([]);
const expectedtoDoListForAdd = {
  tasks: [
    {
      completed: true,
      description: 'test task',
      index: 0,
    },
  ],
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
