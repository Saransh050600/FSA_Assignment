// Importing required dependencies
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes')
const cors = require('cors');

// Configure dotenv to read .env file and load environment variables
dotenv.config();

const app = express();

// Defining the allowed origin for CORS based on environment variable
const allowedOrigin = process.env.FRONTEND_URL;

app.use(cors({
    origin: allowedOrigin,
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  }));

app.use(express.json()); // To parse JSON bodies

// Connect to MongoDB using the connection URI from environment variables
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/auth', authRoutes); // Route for handling authentication requests
app.use('/', bookRoutes); // Route for handling Book related requests

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});