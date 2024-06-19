import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Import useNavigate from react-router-dom

const RegisterUser = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleClick = async (e) => {
     // Prevent default form submission
     e.preventDefault();

     setError('');

    if(password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    const phoneRegex = /^\+92[0-9]{10}$/;

    if(!phoneRegex.test(phone)) {
      setError('Phone number must be in the format +923333333333');
      return;
    }



  
    const data = { email, username, phone, password };
  
    try {
      const response = await fetch('https://mern-complete-app.vercel.app/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      const responseData = await response.json();
  
      if (response.status === 201) {
        // Redirect to login page after successful registration
        navigate('/login');
      } else if (response.status === 400) {
        setError(responseData.message);
        // Handle showing an error message to the user in the UI
      } else if (response.status === 500) {
        setError('Internal server error');
        // Handle showing an error message to the user in the UI
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setError('Network error'); // Handle showing an error message to the user in the UI
    }



  };
  

  return (
    <div className='w-full'>
      <form onSubmit={handleClick} className='w-full sm:w-[450px] mx-auto'>
        <h2 className='lg:hidden text-4xl mb-6 font-semibold text-center'>Register Account</h2>
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id='email'
          type='text'
          placeholder='Enter Email'
          className='w-full h-14 mb-2 p-4 rounded-md'
        />
        <input
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id='username'
          type='text'
          placeholder='Enter Username'
          className='w-full h-14 mb-2 p-4 rounded-md'
        />
        <input
        required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          id='phone'
          type='text'
          placeholder='Enter Phone'
          className='w-full h-14 mb-2 p-4 rounded-md'
        />
        <input
        required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id='password'
          type='password'
          placeholder='Enter Password'
          className='w-full h-14 mb-2 p-4 rounded-md'
        />
        <button type='submit' className='bg-black text-white h-10 w-full rounded-md'>
          Register
        </button>
        <p className='text-center p-4'>
          Already have an account? <a href='/login' className='text-blue-500'>Login</a>
        </p>
      </form>
      {error && <p className='text-red-500 text-center'>{error}</p>}
    </div>
  );
};

export default RegisterUser;
