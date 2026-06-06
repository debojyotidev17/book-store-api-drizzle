import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const authors = pgTable("authors", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});
