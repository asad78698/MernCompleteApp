import { useState } from 'react'
import React from 'react'
const UpdateMovie = () => {
    const[moviename, setMovieName] = useState('')
    const[moviedescription, setMovieDescription] = useState('')
    const[moviegenre, setMovieGenre] = useState('')
    const[moviereleasedate, setMovieReleaseDate] = useState('')
    const[movierating, setMovieRating] = useState('')
    const[movieimage, setMovieImage] = useState('')
    const[error, setError] = useState('')
    const [newmovieName, setNewMovieName] = useState('')

    const handleForm = async(e) => {
        e.preventDefault()
       
        const movieData = {
            movieName: moviename,
            newMovieName: newmovieName,
            movieDescription: moviedescription,
            movieGenere: moviegenre,
            movieReleaseDate: moviereleasedate,
            movieRating: movierating,
            movieImage: movieimage,

        }   
        try {
            const response = await fetch('https://mern-complete-app.vercel.app/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movieData)
            })
            const data = await response.json()
            
            if(response.status===200){
                setError('Movie Updated Successfully')
                setMovieName('')
                setMovieDescription('')
                setMovieGenre('')
                setMovieReleaseDate('')
                setMovieRating('')
                setMovieImage('')
                setNewMovieName('')

            }

            if(response.status===404){
                setError('Movie Not Found')
            }
             
        } catch (error) {
            setError('Internal server error')
        }
    }

  return (
    <>
    <div className=' mx-auto mt-16 max-w-md p-10 bg-slate-300 shadow-xl rounded-lg'>
        
        <form onSubmit={handleForm} action="" className='p-5  w-full flex flex-col justify-center items-center'>
           <h3 className='text-3xl font-semibold mb-2 p-2'>Update Your Movie</h3>
           <input value={moviename} onChange={(e) => setMovieName(e.target.value)} className='mb-1 w-full h-10 p-2 rounded-md'  type='text' placeholder='Enter Movie Name You Want To Update' id='movieName'/>
           <input placeholder='Enter New Movie Name' id='newmovieName' type='text' className='mb-1 w-full h-10 p-2 rounded-md' value={newmovieName} onChange={(e) => setNewMovieName(e.target.value)}/>
           <input value={moviedescription} onChange={(e) => setMovieDescription(e.target.value)} 
            className='mb-1 w-full h-10 p-2 rounded-md'  type='text' placeholder='Enter New Movie Description' id='movieDescription'/>
            <input value={moviegenre} onChange={(e) => setMovieGenre(e.target.value)}
            className='mb-1 w-full h-10 p-2 rounded-md'  type='text' placeholder='Enter New Movie Genre' id='movieGenre'/>
            <input value={moviereleasedate} onChange={(e) => setMovieReleaseDate(e.target.value)}
            className='mb-1 w-full h-10 p-2 rounded-md'  type='text' placeholder='Enter New Movie Release Date' id='movieReleaseDate'/>
            <input value={movierating} onChange={(e) => setMovieRating(e.target.value)}
            className='mb-1 w-full h-10 p-2 rounded-md'  type='text' placeholder='Enter New Movie Rating' id='movieRating'/>
            <input value={movieimage} onChange={(e) => setMovieImage(e.target.value)}
            className='mb-1 w-full h-10 p-2 rounded-md'  type='text' placeholder='Enter New Movie Image' id='movieImage'/>
            <button  className='bg-green-500 text-center w-36 h-10 mt-2 rounded-sm' type='submit'>Update Movie</button>
           {error && <p className='text-red-500 mt-2'>{error}</p>}
        </form>
    </div>
    </>
  )
}

export default UpdateMovie