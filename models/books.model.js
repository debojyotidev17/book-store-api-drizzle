import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { authors } from "./authors.model.js";

export const books  = pgTable("books", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    authorId: integer().notNull().references(() => authors.id)
});

