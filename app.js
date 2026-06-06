import express from "express";
import booksRoutes from "./routes/books.routes.js"
import authorsRoutes from "./routes/authors.routes.js"

const app = express();
const PORT = 8000;

app.use(express.json());

app.use("/books", booksRoutes); 
app.use("/authors", authorsRoutes);

app.listen(8000, () => {
  console.log(`Server running on port ${PORT}`);
});
