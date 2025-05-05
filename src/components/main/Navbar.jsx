import React from 'react';
import '@styles/Navbar.css';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';

const NavbarPrincipal = () => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm px-3">
      <Container fluid>
        <Navbar.Brand href="/"><img
          src={`logo.png`} width="40"
          height="40"
        /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Form className="d-flex me-auto ms-3" style={{ maxWidth: 300 }}>
              <FormControl type="search" placeholder="Buscar..." className="me-2" />
              <Button variant="outline-primary">Buscar</Button>
            </Form>
            <Nav.Link href="#" className="ms-3 fw-bold text-primary">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarPrincipal;
