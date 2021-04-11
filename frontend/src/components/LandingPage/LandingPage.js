//** Renders landing page component which will feature SearchBar, Header, Nav, and About components */
import './LandingPage.css'
import React from 'react'
import About from './About'
import Header from '../Layout/Header'

const LandingPage = () => {
  return (
    <div className="page">
      <Header/>
      <About/>
    </div>
  );
};
export default LandingPage;
