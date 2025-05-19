import '@styles/Navbar.css';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState, useEffect } from 'react';
import api from '@services/api'
import { useNavigate } from 'react-router';

const NavbarPrincipal = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/me');
        setUser(response.data);
      } catch (error) {
      }
    };

    fetchProfile();
  }, []);

  function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }
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
            <NavDropdown title={user && user.name} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={logOut}><i className="bi bi-box-arrow-in-left" ></i>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarPrincipal;
