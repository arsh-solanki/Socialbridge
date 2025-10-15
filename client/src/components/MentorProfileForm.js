// src/components/MentorProfileForm.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getMentorProfile, updateMentorProfile } from '../utils/api';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const MentorProfileForm = () => {
  const { token } = useAuth();
  const [profile, setProfile] = useState({ title: '', bio: '', expertise: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getMentorProfile(token);
        setProfile({
          title: data.title || '',
          bio: data.bio || '',
          expertise: data.expertise || []
        });
      } catch (error) {
        setError('Failed to load profile: ' + error.message);
      }
    };
    loadProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleExpertiseChange = (e) => {
    const expertise = e.target.value.split(',').map(item => item.trim()).filter(item => item);
    setProfile(prev => ({ ...prev, expertise }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await updateMentorProfile(profile, token);
      alert('Profile updated successfully!');
    } catch (error) {
      setError('Failed to update profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Update Mentor Profile</h1>
      {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Professional Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={profile.title}
            onChange={handleChange}
            placeholder="e.g., Senior Product Manager"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            placeholder="Brief bio about your experience and expertise"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Expertise (comma-separated)</Form.Label>
          <Form.Control
            type="text"
            value={profile.expertise.join(', ')}
            onChange={handleExpertiseChange}
            placeholder="e.g., Product Management, Leadership"
            required
          />
        </Form.Group>
        <Button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Updating...' : 'Update Profile'}
        </Button>
      </Form>
    </Container>
  );
};

export default MentorProfileForm;