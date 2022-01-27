import express from "express";
import query from "../db/query"; // 导入sql执行模块
import { v1 as uuidv1 } from "uuid";

const router = express.Router();

// 获取数据库信息
router.get("/list", async (req, res) => {
  try {
    const sql = `select * from \`column\``;
    const columns = await query(sql);
    for (const column of columns) {
      const notesSql = `select id,content from \`note\` where column_id='${column.id}';`;
      const notes = await query(`${notesSql}`);
      column.notes = notes;
    }
    res.json({ res: "success", data: JSON.stringify(columns) });
  } catch (error) {
    res.status(500).json({ error: "sql执行错误" });
  }
});

// 修改note所属column
router.patch("/list", async (req, res) => {
  try {
    const { FromNoteId, ToColumnId } = req.body;
    const sql = `update \`note\` set column_id='${ToColumnId}' where id='${FromNoteId}'`;
    const result = await query(sql);
    res.json({ res: "success" });
  } catch (error) {
    res.status(500).json({ error: "sql执行错误" });
  }
});

// 新增 column
router.post("/column", async (req, res) => {
  try {
    const { name } = req.body;
    // 执行SQL语句
    const noteId = uuidv1();
    const sql = `INSERT INTO \`column\` (id, name) VALUES ('${noteId}', '${name}');`;
    const result = await query(sql);
    res.json({ res: "success", data: { noteId } });
  } catch (error) {
    res.status(500).json({ error: "sql执行错误" });
  }
});

// 新增 note
router.post("/note", async (req, res) => {
  try {
    const { columnId, content } = req.body;
    // 执行SQL语句
    const noteId = uuidv1();
    const sql = `INSERT INTO \`note\` (id, column_id, content) VALUES ('${noteId}', '${columnId}', '${content}');`;
    const result = await query(sql);
    res.json({ res: "success", data: { noteId } });
  } catch (error) {
    res.status(500).json({ error: "sql执行错误" });
  }
});

// 重命名 column
router.patch("/column", async (req, res) => {
  try {
    // 执行SQL语句
    const { columnId, newName } = req.body;
    const sql = `UPDATE \`column\` SET name='${newName}' WHERE id='${columnId}'`;
    const result = await query(sql);
    res.json({ res: "success" });
  } catch (error) {
    res.status(500).json({ error: "sql执行错误" });
  }
});

// 删除 column
router.delete("/column", async (req, res) => {
  try {
    const { columnId } = req.body;
    // 两个sql命令应该是可以放在一句里执行的，但是执行报错，原因先不细究，拆开执行。
    const deleteColsql = `delete from \`column\` where id ='${columnId}';`;
    const deleteNotesSql = ` delete from \`note\` where column_id ='${columnId}';`;
    await query(deleteColsql);
    await query(deleteNotesSql);
    res.json({ res: "success" });
  } catch (error) {
    res.status(500).json({ error: "sql执行错误" });
  }
});

// 修改 note 内容
router.patch("/note", async (req, res) => {
  try {
    const { noteId, newContent } = req.body;
    const sql = `update \`note\` set content='${newContent}' where id='${noteId}'`;
    const result = await query(sql);
    res.json({ res: "success" });
  } catch (error) {
    res.status(500).json({ error: "sql执行错误" });
  }
});

// 删除 note
router.delete("/note", async (req, res) => {
  try {
    const { noteId } = req.body;
    const sql = `delete from \`note\` where id ='${noteId}';`;
    const result = await query(sql);
    res.json({ res: "success" });
  } catch (error) {
    res.status(500).json({ error: "sql执行错误" });
  }
});

export default router;
