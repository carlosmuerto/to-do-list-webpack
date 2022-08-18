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

const toDoListForAdd = new ToDoList();
const toDoListDelete = new ToDoList();
const toDoListEdit = new ToDoList();
const toDoListClear = new ToDoList();
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

toDoListEdit.addToDo('some value', false);
toDoListEdit.editTask(0, 'test task', true);

toDoListClear.addToDo('Data to be cleared 1', true);
toDoListClear.addToDo('Data to be cleared 2', true);
toDoListClear.deleteDoneTasks();
// accert

describe('Test for TodoList Class', () => {
  test('Add Task to the List', () => {
    expect(toDoListForAdd).toEqual(expectedtoDoListForAdd);
  });

  test('Delete task from list', () => {
    expect(toDoListDelete.tasks).toEqual([]);
  });

  test("Editing task's description and complete", () => {
    expect(toDoListEdit).toEqual(expectedtoDoListForAdd);
  });

  test("Clear Completed task's ", () => {
    expect(toDoListClear.tasks).toEqual([]);
  });
});
