const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const AddMovies = require('../DbModels/AddMovies');
// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS setup
app.use(cors({
    origin: 'https://mern-complete-app.vercel.app/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes setup
const routes = require('./Routes/routes');
app.use('/', routes);

// MongoDB connection
mongoose.connect('mongodb+srv://oliverjames4455:aGW1ZhMsdCpsSxNU@cluster0.eenr2d7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to MongoDB');

        // Start server
        const PORT = 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
