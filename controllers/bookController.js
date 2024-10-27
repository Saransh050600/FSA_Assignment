const Book = require('../models/Book');

// Add a new book
exports.addBook = async (req, res) => {
  try {
    const { title, author, genre, condition, availabilityStatus } = req.body;
    const userId = req.user.id; // Get the user ID from the token

    const newBook = new Book({
      title,
      author,
      genre,
      condition,
      availabilityStatus,
      userId
    });
    await newBook.save();

    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Edit a book
exports.editBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if the user is authorized to edit the book
    if (book.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to edit this book' });
    }

    Object.assign(book, req.body);

    await book.save();

    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book || book.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized or book not found' });
    }

    await Book.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    // Destructuring the query parameters from the request
    const { title, author, genre, page = 1 } = req.query;
    const limit = 10;
    const skip = (page - 1) * limit;

    const filter = {};
    // Add filters based on provided query parameters
    if (title) filter.title = { $regex: title, $options: 'i' };
    if (author) filter.author = { $regex: author, $options: 'i' };
    if (genre) filter.genre = { $regex: genre, $options: 'i' };
     // Count total documents matching the filter
    const total = await Book.countDocuments(filter);
    // Fetch books from the database with pagination
    const books = await Book.find(filter).skip(skip).limit(limit);

    res.json({ books, total });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching books' });
  }
};

//Fetch all user's own Books
exports.myBooks = async (req, res) => {
  try {
    const userId = req.user._id;
    const books = await Book.find({ userId: userId });
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};