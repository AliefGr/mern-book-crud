import express from "express";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import routeBook from "./route/routeBook.js";
import connectDB from "./app/db.js";

dotenv.config();
const port = process.env.PORT;

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// console.log("Loaded PORT:", process.env.PORT); // Tambahkan ini untuk debug

app.get("/", (req, res) => res.send("Server is Running! tes"));
app.use("/api/books", routeBook);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
