import express from "express";
import { createBooks, getBooks, deleteBook, getBookDetils, updateBook } from "../controlles/bookControlles.js";
const router = express()

// router.get('/', getBooks)
// router.post('/', createBooks)

router.route('/').get(getBooks).post(createBooks)
router.route('/:id').get(getBookDetils).put(updateBook).delete(deleteBook)


export default router
