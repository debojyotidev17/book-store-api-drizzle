import express from "express";
import { getBooks, getBooksByBookID, createBookByAuthorID, deleteBookByBookID } from "../controllers/books.controller.js"

const router = express.Router();

router.get("/", getBooks);
router.get("/:id",getBooksByBookID)
router.post("/", createBookByAuthorID);
router.delete("/:id", deleteBookByBookID);

export default router;
