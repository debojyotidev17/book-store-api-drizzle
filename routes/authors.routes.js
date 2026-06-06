import express from "express";

import {
  getAuthors,
  getAuthorByAuthorID,
  getBooksByAuthorID,
  createAuthor,
  deleteAuthorByAuthorID,
} from "../controllers/authors.controller.js";

const router = express.Router();

router.get("/", getAuthors);
router.get("/:id", getAuthorByAuthorID);
router.get("/:id/books", getBooksByAuthorID);
router.post("/", createAuthor);
router.delete("/:id", deleteAuthorByAuthorID);

export default router;
