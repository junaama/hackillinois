//** Renders landing page component which will feature SearchBar, Header, Nav, and About components */
import './LandingPage.css'
import React from 'react'
import About from './About'
import Header from './Header'
import Navbar from '../Layout/Nav'
import SearchBar from '../SearchBar'

const LandingPage = () => {
  return (
    <div className="page">
      <Navbar/>
      <Header/>
      {/* <SearchBar/> */}
      <About/>
    </div>
  );
};
export default LandingPage;
