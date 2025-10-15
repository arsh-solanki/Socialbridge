const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./db');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security and logging middleware
app.use(helmet());
app.use(morgan('dev'));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Database connection
connectDB();

// Mount Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/mentor', require('./routes/mentorRoutes'));
app.use('/api/sessions', require('./routes/sessionRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));

// Basic Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

// Basic check route for server health
app.get('/', (req, res) => {
    res.send('SocialBridge MERN Server Running...');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


