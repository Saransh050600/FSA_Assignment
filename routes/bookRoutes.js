const express = require("express");
const bookController = require("../controllers/bookController");
const verifyToken = require("../middleware/verifyToken");

// Creating a new router instance
const router = express.Router();

// Route to add a new book
router.post("/book", verifyToken, bookController.addBook);

// Route to edit an existing book by its ID
router.put("/book/:id", verifyToken, bookController.editBook);

// Route to delete a book by its ID
router.delete("/book/:id", verifyToken, bookController.deleteBook);

// Route to get search Books
router.get("/books", verifyToken, bookController.getBooks);

// Route to get the user's own books
router.get("/my-books", verifyToken, bookController.myBooks);

module.exports = router;
