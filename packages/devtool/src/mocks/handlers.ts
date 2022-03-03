import { getItem, setItem } from "localforage";
import { rest } from "msw";
import { v1 as uuidv1 } from "uuid";

const apiUrl = "http://localhost:3001";

// 工具函数，获取必要之信息
function getDetails(columns: any, columnId: string, noteId?: string) {
  const column = columns.find(
    (column: any) => column.id === columnId
  ) as Column;
  const columnIndex = columns.indexOf(column) as number;
  if (noteId) {
    const note = column?.notes.find((note) => note.id === noteId) as Note;
    const noteIndex = column?.notes.indexOf(note);
    return { column, columnIndex, note, noteIndex };
  }
  return { column, columnIndex };
}

export const listHandlers = [
  rest.get(`${apiUrl}/list`, async (req, res, ctx) => {
    const columns = (await getItem("columns")) as any;
    return res(ctx.json({ res: "success", data: columns }));
  }),

  rest.patch(`${apiUrl}/list`, async (req, res, ctx) => {
    const { FromColumnId, FromNoteId, ToColumnId } = req.body as any;
    const columns = (await getItem("columns")) as any;
    const { column: FromColumn, noteIndex: FromNoteIndex } = getDetails(
      columns,
      FromColumnId,
      FromNoteId
    );
    const ToColumn = columns.find((column: any) => column.id === ToColumnId);
    ToColumn?.notes.push(
      FromColumn?.notes.splice(FromNoteIndex as number, 1)[0] as Note
    );
    await setItem("columns", columns);
    return res(ctx.json({ res: "success" }));
  }),

  rest.post(`${apiUrl}/column`, async (req, res, ctx) => {
    const { name } = req.body as any;
    const columns = (await getItem("columns")) as any;
    const columnId = uuidv1();
    const newColumn: any = {
      id: columnId,
      name,
      notes: [],
    };
    columns.push(newColumn);
    await setItem("columns", columns);
    return res(ctx.json({ res: "success", data: { columnId } }));
  }),

  rest.post(`${apiUrl}/note`, async (req, res, ctx) => {
    const { columnId, content } = req.body as any;
    const columns = (await getItem("columns")) as any;
    const noteId = uuidv1();
    const newNote: any = {
      id: noteId,
      content,
    };
    const { column } = getDetails(columns, columnId);
    column.notes.push(newNote);
    await setItem("columns", columns);
    return res(ctx.json({ res: "success", data: { noteId } }));
  }),

  rest.patch(`${apiUrl}/column`, async (req, res, ctx) => {
    const { columnId, newName } = req.body as any;
    const columns = (await getItem("columns")) as any;
    const { column } = getDetails(columns, columnId);
    column.name = newName;
    await setItem("columns", columns);
    return res(ctx.json({ res: "success" }));
  }),

  rest.delete(`${apiUrl}/column`, async (req, res, ctx) => {
    const { columnId } = req.body as any;
    const columns = (await getItem("columns")) as any;
    const { column } = getDetails(columns, columnId);
    columns.splice(columns.indexOf(column), 1);
    await setItem("columns", columns);
    return res(ctx.json({ res: "success" }));
  }),

  rest.patch(`${apiUrl}/note`, async (req, res, ctx) => {
    const { columnId, noteId, newContent } = req.body as any;
    const columns = (await getItem("columns")) as any;
    const { column, noteIndex } = getDetails(columns, columnId, noteId);
    column.notes[noteIndex as number].content = newContent;
    await setItem("columns", columns);
    return res(ctx.json({ res: "success" }));
  }),

  rest.delete(`${apiUrl}/note`, async (req, res, ctx) => {
    const { columnId, noteId } = req.body as any;
    const columns = (await getItem("columns")) as any;
    const { column, noteIndex } = getDetails(columns, columnId, noteId);
    column.notes.splice(noteIndex as number, 1);
    await setItem("columns", columns);
    return res(ctx.json({ res: "success" }));
  }),
];
