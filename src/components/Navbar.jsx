import React from 'react';
import '../stylesheets/Navbar.css';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavbarPrincipal = () => {
  return (
    <Navbar expand="lg" className="navbar-main">
      <Container fluid>
        <Navbar.Brand href="/"><img
            src={`logo.png`} width="40"
            height="40"
          /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#">Task</Nav.Link>
            <Nav.Link href="#">Tag</Nav.Link>
            <Nav.Link href="#">Category</Nav.Link>
            <Nav.Link href="#" className="ms-3 fw-bold text-primary">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarPrincipal;
