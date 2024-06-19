import React from 'react';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import AddMovies from './Pages/AddMovies';
import { LoginCard } from './Pages/LoginCard';
import ContactForm from './Components/Contactform'
import UpdateMovie from './Components/UpdateMovie';
import About from './Pages/About';
const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
        <Route path='/' Component={Home} />
        <Route path='/register' Component={Register} />
        <Route path='/login' Component={LoginCard} />
        <Route path = '/dashboard' Component={Dashboard} />
        <Route path = '/addmovies' Component={AddMovies} />
        <Route path='/contactform' Component={ContactForm} />
        <Route path = '/updatemovie' Component={UpdateMovie} />
        <Route path='/about' Component={About} />
        </Routes>
      </Router>

    </>
  );
}

export default App;
