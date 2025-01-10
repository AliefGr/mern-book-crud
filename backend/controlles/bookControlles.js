import asyncHandler from "express-async-handler";
import Book from "../models/bookModels.js";
// @des Get all books
// @route GET /api/books
// @access Public
const getBooks = asyncHandler(async (req, res) => {
  // res.send("Get all books");
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const category = req.query.category;
  const skip = (page - 1) * limit;
  let books;
  if (category) {
    books = await Book.find({ category: category })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  } else {
    books = await Book.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
  }
  const lenght = await Book.countDocuments();
  if (books) {
    res.json({
      totalData: lenght,
      page: page,
      limit: limit,
      data: books,
    });
  } else throw new Error("Server Error");
});
// @des Get all books
// @route GET /api/books
// @access Public
const createBooks = asyncHandler(async (req, res) => {
  // res.send("Create all books");
  const { title, description, author, publishYear, category, url } = req.body;
  const newBook = new Book({
    title,
    author,
    description,
    publishYear,
    category,
    url,
  });
  const book = await newBook.save();
  if (book) {
    // Jika berhasil di create return JSON
    res.json(book);
  } else throw new Error("Server Error");

  // res.send("Create new books");
});
// @des Get detils all books
// @route GET /api/books
// @access Public
const getBookDetils = asyncHandler(async (req, res) => {
  // res.send("Get detils all books");
  const book = await Book.findOne({ _id: req.params.id });
  if (book) {
    res.json(book);
  } else {
    throw new Error("Server Error");
  }
});
// @des update all books
// @route GET /api/books
// @access Public
const updateBook = asyncHandler(async (req, res) => {
  // res.send("update detils all books");
  const book = await Book.findById(req.params.id);
  if (!book) {
    throw new Error("Server Error");
  } else {
    const { title, author, description, publishYear, category, url } = req.body;
    book.title = title;
    book.author = author;
    book.description = description;
    book.publishYear = publishYear;
    book.category = category;
    book.url = url;
    const updatedBook = await book.save();
    if (updatedBook) {
      res.json(updatedBook);
    } else throw new Error("Server Error");
  }
});
// @des delete all books
// @route GET /api/books
// @access Public
const deleteBook = asyncHandler(async (req, res) => {
  // res.send("delete detils all books");
  const book = await Book.findById(req.params.id);
  if (!book) {
    throw new Error("Server Error");
  }else{
    await Book.deleteOne({ _id: req.params.id });
    res.json({ message: "Book deleted" });
  }
});

export { getBooks, createBooks, getBookDetils, updateBook, deleteBook };
