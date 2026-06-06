import express from "express";
import db from "../db/index.js";

import { books, authors } from "../models/schema.js";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";

async function getAuthors(req, res) { 
    const data = await db.select().from(authors);
    return res.json(data);
}

async function getAuthorByAuthorID(req, res) { 
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).send(`invalid id`);
    }
    const [result] = await db
      .select()
      .from(authors)
      .where(eq(authors.id, id))
      .limit(1);

    if (result === undefined) {
      return res.status(404).send(`author with id ${id} does not exist in DB`);
    }

    return res.json(result);
}

async function getBooksByAuthorID(req, res) { 
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).send(`invalid id`);
    }
    const [result] = await db
      .select()
      .from(authors)
      .where(eq(authors.id, id))
      .limit(1);

    if (result === undefined) {
      return res.status(404).send(`author with id ${id} does not exist in DB`);
    }

    const data  = await db.select().from(books).where(eq(books.authorId, id));

    return res.json(data);
}

async function createAuthor(req, res) { 
    const { name } = req.body;
    if (!name) { 
        return res.status(400).send("invalid name");
    }
    const [author] = await db.insert(authors).values({ name }).returning({ id: authors.id });
    res.status(201).send(`author with id ${author.id} created successfully`);
}

async function deleteAuthorByAuthorID(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).send("invaid id");
  }

  const [result] = await db
    .select()
    .from(authors)
    .where(eq(authors.id, id))
    .limit(1);

  if (result === undefined) {
    return res.status(404).send(`author with id ${id} does not exist in DB`);
  }

  await db.delete(authors).where(eq(authors.id, id));
  res.send(`author with id ${id} successfully deleted from DB`);
}

export {
  getAuthors,
  getAuthorByAuthorID,
  getBooksByAuthorID,
  createAuthor,
  deleteAuthorByAuthorID,
};