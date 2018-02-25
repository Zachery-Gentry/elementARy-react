import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';


const NavigationBar = ({ onShowInstructions }) => {
  return (
    <div>
      <Navbar color="faded" dark expand="sm">
        <NavbarBrand href="/" className="mr-auto">Where's My CheddAR?</NavbarBrand>
        <Nav navbar>
          <NavItem>
            <NavLink onClick={onShowInstructions}>Instructions</NavLink>
          </NavItem>
          <NavItem>
            <NavLink target="_blank" href="https://github.com">How it's built</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavigationBar;