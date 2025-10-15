// src/components/LoginForm.js (Override Default Navigation with Intended Path)
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext'; // FIXED: Correct relative import path
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const userData = await login(formData.email, formData.password);
      // Check for stored intended path (e.g., from "Ask a Question")
      const intendedPath = sessionStorage.getItem('intendedPath') || null;
      // Clear after use
      sessionStorage.removeItem('intendedPath');
      // Override default navigation with intended path
      if (intendedPath) {
        navigate(intendedPath); // Restore saved path (e.g., /mentors?askMentorId=123)
      } else {
        // Fallback to role-based
        if (userData.role === 'Mentor') {
          navigate('/mentor/dashboard');
        } else {
          navigate('/mentors'); // Default for mentees
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Login</h2>
      <p className="text-muted mb-3">Sign in as a mentee or mentor.</p>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </Form>
      <p className="mt-3 text-center">
        New to SocialBridge? 
        <Link to="/register-mentor" className="ms-1">Register as Mentor</Link>
      </p>
    </Container>
  );
};

export default LoginForm;