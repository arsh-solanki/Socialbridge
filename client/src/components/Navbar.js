// src/components/Navbar.js (Safe Destructure)
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const NavbarComponent = () => {
  const auth = useAuth(); // Safe call
  const { user, isAuthenticated, logout } = auth || {}; // Fallback if undefined

  const handleLogout = () => {
    if (logout) logout();
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand as={Link} to="/">SocialBridge</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/mentors">Browse Mentors</Nav.Link>
            {isAuthenticated && user?.role === 'Mentor' && (
              <>
                <Nav.Link as={Link} to="/mentor/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/mentor/profile">Profile</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {!isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register-mentor">Register Mentor</Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;