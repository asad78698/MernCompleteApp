import React from 'react'
import { useNavigate } from 'react-router-dom'

const DeleteMovie = ({movieName}) => {
  
    const navigate = useNavigate();

   const deleteMovie = async () => {    
    const data = { movieName };

    const response = await fetch('https://mern-complete-app.vercel.app/delete', {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)

       
    })

    const getResponse = await response.json();

    if(response.status === 200){
        console.log(getResponse.message)
        window.location.reload();

   }

    else{
         console.log(getResponse.message)
    }       
    
   }
 
  return (
    <div className='flex'>
      <button 
      onClick={deleteMovie}
      value={
        movieName
      } className='bg-red-500 w-28 h-8 text-white text-center mx-auto rounded-md'>Delete</button>
  
    </div>
  )

}

export default DeleteMovie