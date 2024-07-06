const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');

const mongoURI = 'mongodb+srv://oliverjames4455:aGW1ZhMsdCpsSxNU@cluster0.eenr2d7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS setup
app.use(cors({  
    origin: 'https://mern-complete-app-su1r.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


// Routes setup
const routes = require('./Routes/routes');
app.use('/', routes);

// Handle all other routes to serve the front-end application
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// MongoDB connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
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
