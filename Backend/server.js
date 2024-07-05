const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS setup
app.use(cors({
    origin: 'https://mern-complete-app-su1r.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'build')));

// Routes setup
const routes = require('./Routes/routes');
app.use('/api', routes);  // Prefix your API routes with /api

// Handle all other routes to serve the front-end application
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');

        // Start server
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
