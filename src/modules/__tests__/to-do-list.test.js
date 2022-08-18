/**
 * @jest-environment jsdom
 */

import ToDoList from '../to-do-list.js';
import ToDo from '../to-do.js';
import { PopulateTaskList, removeTaskElement } from '../to-do-dom-element.js';

// Arrenge

// arrenge Todo-list-class
const toDoListForAdd = new ToDoList();
const toDoListDelete = new ToDoList();
const toDoListEdit = new ToDoList();
const toDoListClear = new ToDoList();
const expectedtoDoListForAdd = new ToDoList([
  new ToDo('test task', 0, true),
]);

// arrenge Todo-list-dom-elements

const initDom = () => {
  document.body.innerHTML = `
    <div id="task-item-template" class="template">
      <button class="done-check">
        <i class="fa-solid fa-check icon"></i>
      </button>
      <input name="task" autocomplete="off" />
      <a>
        <i class="fa-solid fa-ellipsis-vertical icon"></i>
      </a>
    </div>
    
    <div id="task_list">
      <ul>
    
      </ul>
    </div>
  `;
};

// act

// act Todo-list-class
toDoListForAdd.addToDo('test task', true);

toDoListDelete.addToDo('ffdagf', true);
toDoListDelete.delete(0);

toDoListEdit.addToDo('some value', false);
toDoListEdit.editTask(0, 'test task', true);

toDoListClear.addToDo('Data to be cleared 1', true);
toDoListClear.addToDo('Data to be cleared 2', true);
toDoListClear.deleteDoneTasks();

// act Todo-list-dom-elements

initDom();

PopulateTaskList(expectedtoDoListForAdd);
const ListWithElement = document.querySelectorAll('#task_list ul .task-item');

removeTaskElement(0);
const ListWithOutElement = document.querySelectorAll('#task_list ul .task-item');

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

describe('HTML list elements', () => {
  test('Reflesh list Dom Element with a list with task', () => {
    expect(ListWithElement).toHaveLength(1);
  });

  test('Delete Element from the list in DOM', () => {
    expect(ListWithOutElement).toHaveLength(0);
  });
});
