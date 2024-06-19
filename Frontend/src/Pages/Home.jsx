import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { add, deleteimg, main, view } from '../assets/Images';
import Contactform from '../Components/Contactform';
import CarouselDefault from '../Components/CarouselDefault';
import '../Styling/Home.css';
import { jwtDecode } from "jwt-decode";
import Navbar from '../Components/Navbar';
// Fix import statement

const Home = () => {

  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Extract token from URL if present
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token); // Store token in localStorage
      navigate('/', { replace: true }); // Remove token from URL
    } else {
      // Check if token exists in localStorage
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const decodedToken = jwtDecode(storedToken);
          console.log(decodedToken);
        } catch (error) {
          console.error('Invalid token', error);
        }
      } else {
        console.error('Token not found');
      }
    }
  }, [location, navigate]);

  return (
    <>
      <section id='mainPic' className='flex justify-center items-center h-screen bg-gray-800'>
        <div className='p-4'>
          <h1 className='text-4xl sm:text-7xl text-center text-white font-bold'>Movie Management App</h1>
          <p className='text-center text-white text-2xl pt-3'>Here you can manage your movies and watch them anytime you want.</p>
        </div>
      </section>

      <section className='bg-[#1a202c] text-white flex flex-col justify-center items-center py-10 px-20'>
        <div className='text-4xl font-medium p-6'>
          <h1>How It Works</h1>
          <div className='bg-yellow-200 h-1 mt-2'>.</div>
        </div>

        <div className='flex sm:flex flex-wrap flex-row justify-center items-center w-100'>
          <div className='max-w-sm flex flex-col items-center justify-center p-6 mb-4 mt-4 mr-3 bg-[#3a3f55] shadow-lg rounded-lg'>
            <img className='w-52 rounded-lg mb-3' src={add} alt="" />
            <h2 className='text-2xl font-semibold mb-2'>Register Your Account</h2>
            <p className='text-justify'>First You need to register on the website from clicking the button on navbar.</p>
          </div>

          <div className='max-w-sm flex flex-col items-center justify-center p-6 mb-4 mt-4 mr-3 bg-[#3a3f55] shadow-lg rounded-lg'>
            <img className='w-52 rounded-lg mb-3' src={view} alt="" />
            <h2 className='text-2xl font-semibold mb-2'>View Your Movies</h2>
            <p className='text-justify'>Once logged in you can view all your added movies on the dashboard.</p>
          </div>

          <div className='max-w-sm flex flex-col items-center justify-center p-6 mb-4 mt-4 mr-3 bg-[#3a3f55] shadow-lg rounded-lg'>
            <img className='w-52 rounded-lg mb-3' src={deleteimg} alt="" />
            <h2 className='text-2xl font-semibold mb-2'>Add Or Delete Movies</h2>
            <p className='text-justify'>First You need to register on the website from clicking the button on navbar.</p>
          </div>
        </div>
      </section>

      <section className='w-100 h-auto p-10 bg-black'>
        <div className='text-white text-center mb-4'>
          <h1 className='text-4xl font-semibold mb-1'>New Movies Launched!</h1>
          <div className='w-80 bg-yellow-400 h-1 mt-2 mx-auto'>.</div>
        </div>
        <CarouselDefault />
      </section>

      <section className='bg-slate-400 w-100 p-10 bg-white-300 flex flex-col items-center'>
        <div>
          <h1 className='text-4xl font-semibold'>Contact Us</h1>
          <div className='bg-yellow-200 h-1 mt-1 w-44'></div>
          <p className='mt-3'>For latest update hit subscribe </p>
        </div>

        <div className='mt-8'>
          <Contactform />
        </div>
      </section>
    </>
  );
};

export default Home;
