import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DeleteMovie from '../Components/DeleteMovie';
const Dashboard = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const [colorz, setColorz] = useState('pink');

  const generateRandomLightColor = () => {
    const h = Math.floor(Math.random() * 360); // Hue: 0 to 360
    const s = Math.floor(Math.random() * 20) + 80; // Saturation: 80 to 100%
    const l = Math.floor(Math.random() * 20) + 80; // Lightness: 80 to 100%
    return `hsl(${h}, ${s}%, ${l}%)`;
  };


  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    return alert('Text copied to clipboard');
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Log the token to verify it exists

    if (!token) {
      navigate('/login');
      return;
    }

    const getMovies = async () => {
      try {
        const response = await fetch('https://mern-complete-app.vercel.app/allmovies', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        // Log the response status and headers
        console.log('Response Status:', response.status);
        console.log('Response Headers:', response.headers);

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new TypeError('Response not JSON');
        }

        const data = await response.json();

        if (response.status === 200) {
          setMovies(data.allMovies); // Assuming data is structured with 'allMovies' array
          console.log('Movies fetched successfully', data.allMovies);
        } else {
          console.log('Error fetching movies:', data);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    getMovies();
  }, []);

  return (
    <>
      <section className='flex flex-col justify-center items-center p-10'>
        <div className='p-4 mb-4'>
          <h1 className='text-4xl mb-1 font-semibold'>View All Saved Movies</h1>
          <div className='bg-yellow-300 h-1 w-90'></div>
        </div>
        <div className='flex-col md:flex md:flex-row flex-wrap items-center  md:ml-14 '>
          {movies.length > 0 ? (
            movies.map((movie, index) => (
              <div style={{
                backgroundColor:
                  generateRandomLightColor()
              }} key={index} className='md:mr-4 mb-4 flex max-w-sm flex-col p-4 h-auto shadow-lg rounded-md'>
                <img className='w-full h-56 mx-auto rounded-lg' src={movie.movieImage} alt='' />
                <div className='flex justify-center items-center'>
                <h1 className='text-center text-4xl p-1 mt-1 font-semibold'>{movie.movieName}</h1>
               <button 
               onClick={()=>copyText(movie.movieName)}
               >
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                </svg>
               </button>
                </div>
                <p className='pb-2 text-current '>{movie.movieDescription}</p>
                <div className='flex justify-between mb-2'>
                  <p>
                    Release Date: <span className='font-bold'>{movie.movieReleaseDate}</span>
                  </p>
                  <p>
                    Genre: <span className='font-bold'>{movie.movieGenere}</span>
                  </p>
                  <p>
                    Rating: <span className='font-bold'>{movie.movieRating}</span>
                  </p>
                </div>
                <DeleteMovie
                  movieName={movie.movieName}
                />
              </div>

            ))
          ) : (
            <p>No movies found</p>
          )}
        </div>
      </section>

      <section className='flex flex-col justify-center items-center'>
        <div className='p-4 mb-2'>
          <h1 className='text-4xl mb-1 font-semibold text-center'>Manage Your Movies Here</h1>
          <div className='bg-yellow-300 h-1 w-auto text-center'></div>
        </div>

        <div className='bg-slate-300 flex-row w-full p-10 h-22 mb-1 md:flex md:justify-center'>
          <div className='text-center p-2'>
            <button className='bg-black text-white h-10 w-36 sm:mr-2  mr-1 mb-3 rounded-md'>
              <Link to='/addmovies'>Add Movie</Link>
            </button>
            <button className='bg-green-700 text-white h-10 w-36 rounded-md'>
              <Link
                to='/updatemovie'>Update Movie</Link>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
