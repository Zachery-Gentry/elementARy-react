import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';


const NavigationBar = ({ onShowInstructions }) => {
  return (
    <div>
      <Navbar color="faded" dark expand="sm">
        <NavbarBrand href="/" className="mr-auto">CheddAR</NavbarBrand>
        <Nav navbar>
          <NavItem>
            <NavLink onClick={onShowInstructions}>Instructions</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/reactstrap/reactstrap">How it's built</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavigationBar;