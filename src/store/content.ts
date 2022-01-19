import { reactive } from "vue";

const store = reactive<Column[]>([
  {
    id: 0,
    name: "TODO",
    notes: [
      { id: 0, content: "todo-task-1" },
      { id: 1, content: "todo-task-2" },
    ],
  },
  {
    id: 1,
    name: "DONE",
    notes: [
      { id: 0, content: "todo-task-3" },
      { id: 1, content: "todo-task-4" },
    ],
  },
]);

const storeFnSymbol = Symbol("storeFnSymbol");

/**
 * operation functions
 */
const updateStore = (
  FromColumnIndex: number,
  FromNoteIndex: number,
  ToColumnIndex: number
) => {
  const note = store[FromColumnIndex].notes.splice(FromNoteIndex, 1)[0];
  store[ToColumnIndex].notes.push(note);
};

const storeFn = { updateStore };

export { store, storeFnSymbol, storeFn };
