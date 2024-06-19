const mongoose = require('mongoose');

const AddMoviesSchema = new mongoose.Schema({
    movieName: {
        type: String,
     
    },
    movieDescription: {
        type: String,
      
    },
    movieGenere: {
        type: String,
    },
    movieReleaseDate: {
        type: String,
    },
    movieRating: {
        type: String,
    },
    movieImage: {
        type: String,
    },

    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',

    },
});

const AddMovies = mongoose.model('AddMovies', AddMoviesSchema);

module.exports = AddMovies;