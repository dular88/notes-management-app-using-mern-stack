const express = require("express");
const { readNote, createNote, updateNote, deleteNote } = require("../controllers/noteController");
const auth = require("../middlewares/auth");
const nodeRouter = express.Router();

nodeRouter.get("/", auth, readNote);
nodeRouter.post("/", auth, createNote);
nodeRouter.put("/:id", auth, updateNote);
nodeRouter.delete("/:id", auth, deleteNote);

module.exports = nodeRouter;