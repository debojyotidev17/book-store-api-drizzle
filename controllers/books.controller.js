import express from "express";
import db from "../db/index.js";

import { books, authors } from "../models/schema.js";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";

async function getBooks(req, res) {
  const data = await db.select().from(books);
  return res.json(data);
}

async function getBooksByBookID(req, res) {

    const id = parseInt(req.params.id);

    if (isNaN(id)) { 
        return res.status(400).send(`invalid id`)
    }
    const [result] = await db.select().from(books).where(eq(books.id, id)).limit(1);

    if (result === undefined) { 
        return res.status(404).send(`book with id ${id} does not exist in DB`);
    }

    return res.json(result);
}

async function createBookByAuthorID(req, res) {

    const { name, authorId } = req.body;
    if (isNaN(authorId)) { 
        return res.status(400).json("invaid author id")
    }

    const [result] = await db.select().from(authors).where(eq(authors.id, authorId)).limit(1);

    if (result === undefined) {
      return res.status(404).send(`author with id ${authorId} does not exist in DB`);
    }

    const [book] = await db.insert(books).values({name, authorId}).returning({
          id: books.id
    });

    res.status(201).send(`book with id ${book.id} created successfully`)
}   

async function deleteBookByBookID(req, res) { 

    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).send("invaid id");
    }

    const [result] = await db.select().from(books).where(eq(books.id, id)).limit(1);

    if (result === undefined) { 
        return res.status(404).send(`book with id ${id} does not exist in DB`);
    }

    await db.delete(books).where(eq(books.id, id));
    res.send(`book with id ${id} successfully deleted from DB`)
}

export { getBooks, getBooksByBookID, createBookByAuthorID, deleteBookByBookID };