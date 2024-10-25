// routes/bookRoutes.js
const express = require('express');
const bookController = require('../controllers/bookController');
const verifyToken = require('../middleware/verifyToken'); 

const router = express.Router();

router.post('/book', verifyToken , bookController.addBook);       // Add a new book
router.put('/book/:id', verifyToken, bookController.editBook);
router.delete('/book/:id', verifyToken, bookController.deleteBook);
router.get('/books', verifyToken, bookController.getAllBooks);    // Get all books or search
router.get('/my-books', verifyToken, bookController.myBooks);

module.exports = router;