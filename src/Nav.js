import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';


const NavigationBar = () => {
  return (
    <div>
      <Navbar color="faded" dark expand="sm">
        <NavbarBrand href="/" className="mr-auto">CheddAR</NavbarBrand>
        <Nav navbar>
          <NavItem>
            <NavLink href="/components/">Components</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/reactstrap/reactstrap">Github</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavigationBar;