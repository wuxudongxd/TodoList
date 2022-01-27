import { fetchList } from "./../api/index";
import { defineStore } from "pinia";
import { UUID } from "~/utils";

/**
 * 
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
 */

export const useStore = defineStore("todoList", {
  state: () => ({
    list: [] as Column[],
  }),

  actions: {
    async initList() {
      const data = await fetchList();
      console.log(data);

      this.list = data;
    },
    // 工具函数，获取必要之信息
    getDetails(columnId: string, noteId?: string) {
      const column = this.list.find(
        (column) => column.id === columnId
      ) as Column;
      const columnIndex = this.list.indexOf(column);
      if (noteId) {
        const note = column?.notes.find((note) => note.id === noteId) as Note;
        const noteIndex = column?.notes.indexOf(note);
        return { column, columnIndex, note, noteIndex };
      }
      return { column, columnIndex };
    },

    // 将拖拽的note添加到新的column中
    updateStore(FromColumnId: string, FromNoteId: string, ToColumnId: string) {
      const { column: FromColumn, noteIndex: FromNoteIndex } = this.getDetails(
        FromColumnId,
        FromNoteId
      );
      const ToColumn = this.list.find((column) => column.id === ToColumnId);
      ToColumn?.notes.push(
        FromColumn?.notes.splice(FromNoteIndex as number, 1)[0] as Note
      );
    },

    // 新增 column
    newColumn(name: string) {
      this.list.push({
        id: UUID(),
        name,
        notes: [],
      });
    },

    // 新增 note
    newNote(columnId: string, content: string) {
      const { column } = this.getDetails(columnId);
      column?.notes.unshift({
        id: UUID(),
        content,
      });
    },

    // 重命名 column
    setColName(columnId: string, newName: string) {
      const { column } = this.getDetails(columnId);
      column?.name && (column.name = newName);
    },

    // 删除 column
    deleteCol(columnId: string) {
      const { columnIndex } = this.getDetails(columnId);
      this.list.splice(columnIndex, 1);
    },

    // 修改 note 内容
    setNoteContent(columnId: string, noteId: string, newContent: string) {
      const { note } = this.getDetails(columnId, noteId);
      note?.content && (note.content = newContent);
    },

    // 删除 note
    delNote(columnId: string, noteId: string) {
      const { column, noteIndex } = this.getDetails(columnId, noteId);
      column?.notes.splice(noteIndex as number, 1);
    },
  },
});
