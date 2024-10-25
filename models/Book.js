const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Assuming you already have a User schema
const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  condition: { type: String, required: true },
  availabilityStatus: { type: String, enum: ['Available', 'Unavailable'], default: 'Available' },
  userId: { type: String, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

// Creating the Book model
module.exports = mongoose.model('Book', BookSchema);