import { get, post, patch, deleteReq } from "~/api";
import { defineStore } from "pinia";

export const useStore = defineStore("todoList", {
  state: () => ({
    list: [] as Column[],
  }),

  actions: {
    async initList() {
      const response = await get("/list");
      this.list = JSON.parse(response.data);
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
    async updateStore(
      FromColumnId: string,
      FromNoteId: string,
      ToColumnId: string
    ) {
      const { column: FromColumn, noteIndex: FromNoteIndex } = this.getDetails(
        FromColumnId,
        FromNoteId
      );
      const ToColumn = this.list.find((column) => column.id === ToColumnId);
      // request
      const response = await patch("/list", {
        FromColumnId,
        FromNoteId,
        ToColumnId,
      });
      if (response.res === "success") {
        ToColumn?.notes.push(
          FromColumn?.notes.splice(FromNoteIndex as number, 1)[0] as Note
        );
      }
    },

    // 新增 column
    async newColumn(name: string) {
      const response = await post("/column", { name });
      if (response.res === "success") {
        this.list.push({
          id: response.data.columnId,
          name,
          notes: [],
        });
      }
    },

    // 新增 note
    async newNote(columnId: string, content: string) {
      const response = await post("/note", { columnId, content });
      if (response.res === "success") {
        const { column } = this.getDetails(columnId);
        column?.notes.unshift({
          id: response.data.noteId,
          content,
        });
      }
    },

    // 重命名 column
    async setColName(columnId: string, newName: string) {
      const response = await patch("/column", { columnId, newName });
      if (response.res === "success") {
        const { column } = this.getDetails(columnId);
        column?.name && (column.name = newName);
      }
    },

    // 删除 column
    async deleteCol(columnId: string) {
      const response = await deleteReq("/column", { columnId });
      if (response.res === "success") {
        const { columnIndex } = this.getDetails(columnId);
        this.list.splice(columnIndex, 1);
      }
    },

    // 修改 note 内容
    async setNoteContent(columnId: string, noteId: string, newContent: string) {
      const response = await patch("/note", { noteId, newContent });
      if (response.res === "success") {
        const { note } = this.getDetails(columnId, noteId);
        note?.content && (note.content = newContent);
      }
    },

    // 删除 note
    async delNote(columnId: string, noteId: string) {
      const response = await deleteReq("/note", { noteId });
      if (response.res === "success") {
        const { column, noteIndex } = this.getDetails(columnId, noteId);
        column?.notes.splice(noteIndex as number, 1);
      }
    },
  },
});
