import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <Navbar bg="light" expand="sm" fixed="top" className="header">
    <Navbar.Brand href="#home">East Haven Animal Shelter</Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse>
      <Nav>
        <Link to="home" className="nav-link">
          Home
        </Link>
        <Link to="donate" className="nav-link">
          Donate
        </Link>
        <Link to="adopt" className="nav-link">Adopt</Link>
        <Link to="admin" className="nav-link"> Admin </Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Navigation;
