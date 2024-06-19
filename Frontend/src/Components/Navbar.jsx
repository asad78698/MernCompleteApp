import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { main, userLogo } from '../assets/Images';
import { jwtDecode } from 'jwt-decode'; // Ensure jwtDecode is imported correctly

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState('');
  const [logged, setLogged] = useState(false);
  const navigate = useNavigate(); // Use useNavigate for navigation instead of useHistory
  const location = useLocation(); // Get current location

  useEffect(() => {
    const getToken = localStorage.getItem('token');

    if (getToken) {
      try {
        const decoded = jwtDecode(getToken);
        const { username } = decoded;
        setUser(username);
        setLogged(true);
      } catch (error) {
        console.error('Error decoding token:', error);
        setUser(' '); // Set user to ' ' on decoding error
      }
    } else {
      console.log('No token found in localStorage');
      setUser(' '); // Set user to ' ' when no token is found
    }
  }, [location]); // Update when location changes

  const handleSidebar = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLogged(false);
    setUser(' ');
    navigate('/login'); // Use navigate('/login') instead of history.push('/login')
  };

  return (
    <div className='w-100 bg-gray-800 text-white flex justify-between shadow-sm'>
      <div className='p-4'>
        <p>
          <Link to="/">Movie <span className='text-3xl'>x</span></Link>
        </p>
      </div>
      <div className='hidden sm:block p-4 mt-2'>
        <ul>
          <li className='inline-block px-3 hover:text-red-500'>
            <Link to='/'>Home</Link>
          </li>

          {logged && (
            <li className='inline-block px-3 hover:text-red-500'>
              <Link to='/dashboard'>Dashboard</Link>
            </li>
          )}
          <li className='inline-block px-3 hover:text-red-500'>
            <Link to="/about">About</Link>
          </li>

          {logged ? (
            <li onClick={handleLogout} className='inline-block px-3 hover:text-red-500'>
              <Link to='/logout'>Logout</Link>
            </li>
          ) : (
            <>
              <li className='inline-block px-3 hover:text-red-500'>
                <Link to='/login'>Login</Link>
              </li>
              <li className='inline-block px-3 hover:text-red-500'>
                <Link to='/register'>Registration</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      
      <div className='hidden sm:block'>
      <section style={{
        display: logged ? 'block' : 'none'
      }} className='p-1 mr-2'>
        <img src={userLogo} alt='main' className='w-10 h-10 mx-auto' />
        <p className='cursor-pointer inline-block mt-1'>{user}</p>
      </section>
      </div>

      <div className='block sm:hidden p-4'>
        <p onClick={handleSidebar}>Sidebar</p>
        <ul style={{ display: open ? 'block' : 'none' }}>
          <li className='p-2'>
            <Link to='/'>Home</Link>
          </li>
  
          <hr />
          {logged ? (
            <>
             <li className='inline-block px-3 hover:text-red-500'>
              <Link to='/dashboard'>Dashboard</Link>
            </li>
            <section style={{
        display: logged ? 'block' : 'none'
      }} className='p-1 mr-2'>
        <img src={userLogo} alt='main' className='w-10 h-10 mx-auto' />
        <p className='cursor-pointer inline-block mt-1'>{user}</p>
      </section>
            <hr />
            <li onClick={handleLogout} className='inline-block px-3 hover:text-red-500'>
              <Link to='/logout'>Logout</Link>
            </li>
             
             
            </>
          ) : (
            <>
              <li className='inline-block px-3 hover:text-red-500'>
                <Link to='/login'>Login</Link>
              </li>
              <li className='inline-block px-3 hover:text-red-500'>
                <Link to='/register'>Registration</Link>
              </li>
            </>
          )}
          <hr />
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
