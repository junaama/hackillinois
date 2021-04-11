//** Renders landing page component which will feature SearchBar, Header, Nav, and About components */
import './LandingPage.css'
import React from 'react'
import About from './About'
import Header from './Header'
import Navbar from '../Layout/Nav'
import Dropdown from '../Dropdown/Dropdown'

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar/>
      <div className="landing-content">
        <Header/>
        <Dropdown />
        <About/>
      </div>
    </div>
  );
};
export default LandingPage;
