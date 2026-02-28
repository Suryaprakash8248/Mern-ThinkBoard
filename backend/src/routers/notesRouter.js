import express from "express";
import { deleteNote, getNoteById, getNotes, postNote, updateNote } from "../controllers/notesControler.js";

const router = express.Router();

router.get("/",getNotes);
router.get("/:id",getNoteById)
router.post("/", postNote);
router.put("/:id",updateNote);
router.delete("/:id",deleteNote);

export default router;