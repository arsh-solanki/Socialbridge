// src/components/MenteeOnboardingModal.js (Updated with Pre-Fill & Default Mentor)
import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const MenteeOnboardingModal = ({ show, onHide, onSubmit, defaultMentor = null }) => {
  const [formData, setFormData] = useState({
    currentCareer: '',
    targetCareer: '',
    problemStatement: '',
    priorityGoals: '',
    resumeLink: ''
  });

  // Pre-fill from sessionStorage if available (after login restore)
  useEffect(() => {
    if (show) {
      const savedData = sessionStorage.getItem('onboardingFormData');
      if (savedData) {
        setFormData(JSON.parse(savedData));
        sessionStorage.removeItem('onboardingFormData');
      }
    }
  }, [show]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Optional: Save to sessionStorage for potential restore
    sessionStorage.setItem('onboardingFormData', JSON.stringify(formData));
    onSubmit(formData);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Welcome to SocialBridge!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {defaultMentor && (
          <div className="alert alert-info mb-3">
            Selected Mentor: <strong>{defaultMentor.userId?.name || defaultMentor.name}</strong>
          </div>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Current Career State</Form.Label>
            <Form.Control
              type="text"
              name="currentCareer"
              value={formData.currentCareer}
              onChange={handleChange}
              placeholder="e.g., Software Engineer with 3 years experience"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Target Career State</Form.Label>
            <Form.Control
              type="text"
              name="targetCareer"
              value={formData.targetCareer}
              onChange={handleChange}
              placeholder="e.g., Product Manager at a tech startup"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Problem Statement</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="problemStatement"
              value={formData.problemStatement}
              onChange={handleChange}
              placeholder="Describe the main challenge you're facing in your career transition."
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Priority Goals</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="priorityGoals"
              value={formData.priorityGoals}
              onChange={handleChange}
              placeholder="List 2-3 key goals for the next 6 months."
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Resume/Portfolio Link (Optional)</Form.Label>
            <Form.Control
              type="url"
              name="resumeLink"
              value={formData.resumeLink}
              onChange={handleChange}
              placeholder="https://your-resume-link.com"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Start Your Mentorship
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MenteeOnboardingModal;