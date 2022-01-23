import { defineStore } from "pinia";
import { UUID } from "~/utils";

export const useStore = defineStore("todoList", {
  state: () => ({
    list: [
      {
        id: "3e8cb491-fd1d-47a3-9ca1-1d247fc4feae",
        name: "TODO",
        notes: [
          {
            id: "484287bf-6588-4b4c-81e6-05dda5f2d7f6",
            content: "todo-task-1",
          },
          {
            id: "00b5026e-6755-44dc-97d0-24a04cdec7fd",
            content: "todo-task-2",
          },
        ],
      },
      {
        id: "11566563-4fbe-4a4a-854c-efc6d9792949",
        name: "DONE",
        notes: [
          {
            id: "070833c0-51f8-4102-ba0a-1142eff4d87d",
            content: "todo-task-3",
          },
          {
            id: "b5f141f9-74de-4340-baf9-099406506834",
            content: "todo-task-4",
          },
        ],
      },
    ],
  }),

  actions: {
    updateStore(FromColumnId: string, FromNoteId: string, ToColumnId: string) {
      const FromColumn = this.list.find((column) => column.id === FromColumnId);
      const FromNote = FromColumn?.notes.find((note) => note.id === FromNoteId);
      const FromNoteIndex = FromColumn?.notes.indexOf(
        FromNote as Note
      ) as number;
      const ToColumn = this.list.find((column) => column.id === ToColumnId);
      ToColumn?.notes.push(
        FromColumn?.notes.splice(FromNoteIndex, 1)[0] as Note
      );
    },
    newColumn(name: string) {
      this.list.push({
        id: UUID(),
        name,
        notes: [],
      });
    },
    newNote(columnId: string, content: string) {
      const column = this.list.find((column) => column.id === columnId);
      column?.notes.unshift({
        id: UUID(),
        content,
      });
    },
    setColName(columnId: string, newName: string) {
      const column = this.list.find((column) => column.id === columnId);
      column?.name && (column.name = newName);
    },
    deleteCol(columnId: string) {
      const column = this.list.find((column) => column.id === columnId);
      const columnIndex = this.list.indexOf(column as Column);
      this.list.splice(columnIndex, 1);
    },
  },
});
