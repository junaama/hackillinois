//** Renders landing page component which will feature SearchBar, Header, Nav, and About components */

import React from "react";
import SearchBar from '../SearchBar'
const LandingPage = () => {
  return (
    <div>
      <p>Landing Page</p>
      <SearchBar/>
    </div>
  );
};
export default LandingPage;
