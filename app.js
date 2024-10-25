const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes')
const cors = require('cors');

dotenv.config();

const app = express();

const allowedOrigin = process.env.FRONTEND_URL;

app.use(cors({
    origin: allowedOrigin,
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  }));

app.use(express.json()); // To parse JSON bodies

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/auth', authRoutes);
app.use('/', bookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});