import React from 'react';
import { google } from '../assets/Images';

const GoogleLoginButton = () => {
  const handleLoginClick = async () => {
    try {
      const response = await fetch('https://mern-complete-app.vercel.app/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.url) {
          window.location.href = data.url; // Redirect to the Google OAuth URL
        } else {
          console.error('OAuth URL not received');
        }
      } else {
        console.error('Failed to initiate OAuth flow');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <img className='w-80 mx-auto' onClick={handleLoginClick} src={google} alt="" />
    </div>
  );
};

export default GoogleLoginButton;
