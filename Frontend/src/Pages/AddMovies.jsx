import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddMovies = () => {
    const navigate = useNavigate();

    const [movieName, setMovieName] = useState('');
    const [movieDescription, setMovieDescription] = useState('');
    const [movieGenere, setMovieGenre] = useState('');
    const [movieReleaseDate, setMovieReleaseDate] = useState('');
    const [movieRating, setMovieRating] = useState('');
    const [movieImage, setMovieImage] = useState('');
    const [message, setMessage] = useState('');

    const addMovie = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        console.log('Token:', token);

        const newMovie = {
            movieName,
            movieDescription,
            movieGenere,
            movieReleaseDate,
            movieRating,
            movieImage
        };

        try {
            const response = await fetch('https://mern-complete-app.vercel.app/addmovies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(newMovie)
            });

            const data = await response.json();

            if (response.status === 201) {
                setMessage('Movie added successfully');
                // Clear form fields after successful submission
                setMovieName('');
                setMovieDescription('');
                setMovieGenre('');
                setMovieReleaseDate('');
                setMovieRating('');
                setMovieImage('');
            } else {
                setMessage('Error adding movie');
            }
        } catch (error) {
            console.error('Error adding movie:', error);
            setMessage('Network error');
        }
    };

    return (
        <section className='flex flex-col justify-center items-center p-10'>
            <div className='text-4xl font-semibold px-10 py-5'>Add Movies</div>
            <form className='flex flex-col bg-slate-300 p-6 rounded-md' onSubmit={addMovie}>
                <input
                    required
                    value={movieName}
                    onChange={(e) => setMovieName(e.target.value)}
                    type='text'
                    placeholder='Enter Movie Name'
                    className='w-80 h-10 p-2 mb-2 rounded-md'
                />
                <input
                    required
                    value={movieDescription}
                    onChange={(e) => setMovieDescription(e.target.value)}
                    type='text'
                    placeholder='Enter Movie Description'
                    className='w-80 h-10 p-2 mb-2 rounded-md'
                />
                <input
                    required
                    value={movieGenere}
                    onChange={(e) => setMovieGenre(e.target.value)}
                    type='text'
                    placeholder='Enter Movie Genre'
                    className='w-80 h-10 p-2 mb-2 rounded-md'
                />
                <input
                    required
                    value={movieReleaseDate}
                    onChange={(e) => setMovieReleaseDate(e.target.value)}
                    type='text'
                    placeholder='Enter Movie Release Date'
                    className='w-80 h-10 p-2 mb-2 rounded-md'
                />
                <input
                    required
                    value={movieRating}
                    onChange={(e) => setMovieRating(e.target.value)}
                    type='text'
                    placeholder='Enter Movie Rating'
                    className='w-80 h-10 p-2 mb-2 rounded-md'
                />
                <input
                    required
                    value={movieImage}
                    onChange={(e) => setMovieImage(e.target.value)}
                    type='text'
                    placeholder='Enter Movie Image URL'
                    className='w-80 h-10 p-2 mb-2 rounded-md'
                />
                <button type='submit' className='bg-green-700 mx-auto mt-2 text-white h-10 w-36 rounded-md'>
                    Add Movie
                </button>
            </form>
            {message && <div className='text-red-500 mt-2'>{message}</div>}
        </section>
    );
};

export default AddMovies;
