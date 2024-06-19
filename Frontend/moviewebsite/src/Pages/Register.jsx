import React from 'react'
import CarouselDefault from '../Components/CarouselDefault'
import RegisterUser from '../Components/RegisterUser'
import { add, register } from '../assets/Images'

const Register = () => {
  return (
    <section className=' h-screen w-auto bg-[#F1F2F5] p-10 flex flex-row justify-center items-center'>
      <div className='hidden lg:block lg:w-[40%]'> 
        <div className='p-4 mt-10'> 
        <h2 className='text-4xl '>Register Your Account </h2>
        <p className='px-2 m-2'>Add or Delete Movies With Ease In Just 3 Steps</p>
        </div>
         <img className='w-96' src={register} alt="" />
      </div>

      <div className='w-full sm:max-w-md '>
       <div>
       <RegisterUser />
       </div>
      </div>
 
    </section>
  )
}

export default Register