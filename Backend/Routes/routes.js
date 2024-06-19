const express = require('express');
const route = express.Router();
const {register, login, SendgoogleAuth, DeleteMovies, UpdateMovies, recievegoogleAuth, AddNewMovies, AllMovies} = require('../Auth-Controllers/auth-controlers');
const authenticate = require('../Middlewares/middleware');

route.get('/asad', (req, res) => {
    res.send('Welcome to the Auth API');
});

route.post('/register',  register);

route.post('/login', login)

// Generate Google OAuth authorization URL
route.post('/auth', SendgoogleAuth);

// Handle Google OAuth callback
route.get('/auth/callback', recievegoogleAuth );


route.post('/addmovies', AddNewMovies)

route.get('/allmovies', AllMovies) 


route.delete('/delete', DeleteMovies)

route.post('/update', UpdateMovies)

module.exports = route;
