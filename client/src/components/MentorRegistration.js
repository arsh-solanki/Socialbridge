// src/components/MentorRegistration.js
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const MentorRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    title: '',
    bio: '',
    expertise: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { registerMentor } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await registerMentor(formData);
      navigate('/mentor/profile');
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Register as a Mentor</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
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
            placeholder="Enter a password (min 6 characters)"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Professional Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Senior Product Manager"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Brief bio about your experience and expertise"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Expertise (comma-separated)</Form.Label>
          <Form.Control
            type="text"
            name="expertise"
            value={formData.expertise}
            onChange={handleChange}
            placeholder="e.g., Product Management, Leadership, Data Science"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register as Mentor'}
        </Button>
      </Form>
    </Container>
  );
};

export default MentorRegistration;