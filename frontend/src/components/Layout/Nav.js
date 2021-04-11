import React, { Component } from "react";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse} from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';

class Navbar extends Component {

state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

render() {
  return (
    <Router>
      <MDBNavbar color="#05219b" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">ProjectName</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink to="/">Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem active>
              <MDBNavLink to="#">About</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!">Profile</MDBNavLink>
            </MDBNavItem>
            <MDBNavbarNav center>
            </MDBNavbarNav>
            <MDBNavbarNav right>
                <MDBNavItem>
                    <MDBNavLink to="#!">Logout</MDBNavLink>
                </MDBNavItem>
            </MDBNavbarNav>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </Router>
    );
  }
}

export default Navbar;