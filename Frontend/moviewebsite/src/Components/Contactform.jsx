import React from 'react'

const Contactform = () => {
  return (
    <div className='px-5 py-2'>
        <form action="">
            <input className='w-80 h-10 p-4 outline-none' type='text' placeholder='Enter Email' />
            <button className='bg-orange-400 mr-4 h-10 w-32' type='submit'>Subscribe</button>
        </form>
    </div>
  )
}

export default Contactform