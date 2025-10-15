// src/components/Pricing.js
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Pricing = () => {
  return (
    <div className="py-5 bg-light">
      <div className="container text-center">
        {/* Header */}
        <h1 className="display-4 fw-bold mb-3">Pricing Plans</h1>
        <p className="lead mb-5">Choose the plan that best fits your career growth needs. Start with our free tier and upgrade as you progress.</p>

        {/* Pricing Cards */}
        <div className="row g-4 justify-content-center">
          {/* Free Plan */}
          <div className="col-lg-4">
            <div className="card h-100 border-0 shadow">
              <div className="card-header bg-white border-0 text-center py-4">
                <h2 className="card-title fw-bold mb-1">Free</h2>
                <p className="text-muted mb-0">Get started at no cost</p>
              </div>
              <div className="card-body text-center">
                <div className="display-6 fw-bold text-primary mb-3">0 <small className="fs-5 text-muted">/month</small></div>
                <ul className="list-unstyled mb-4">
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Contextual Q&A</li>
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>AI-Powered Mentor Matching</li>
                  <li className="mb-2"><i className="bi bi-x-circle-fill text-danger me-2"></i>Priority Response Time</li>
                  <li className="mb-2"><i className="bi bi-x-circle-fill text-danger me-2"></i>Unlimited Sessions</li>
                  <li className="mb-2"><i className="bi bi-x-circle-fill text-danger me-2"></i>Access to Premium Mentor Pool</li>
                  <li className="mb-2"><i className="bi bi-x-circle-fill text-danger me-2"></i>Dedicated Account Manager</li>
                </ul>
                <Link to="/mentors" className="btn btn-outline-primary btn-lg w-100">Start Free Trial</Link>
              </div>
            </div>
          </div>

          {/* Pro Plan - Prominent */}
          <div className="col-lg-4">
            <div className="card h-100 border-primary shadow-lg" style={{ borderWidth: '3px' }}>
              <div className="card-header bg-primary text-white border-0 text-center py-4">
                <h2 className="card-title fw-bold mb-1">Pro</h2>
                <p className="text-white-50 mb-0">Most popular</p>
              </div>
              <div className="card-body text-center">
                <div className="display-6 fw-bold text-primary mb-3">100<small className="fs-5 text-muted">/month</small></div>
                <ul className="list-unstyled mb-4">
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Contextual Q&A</li>
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>AI-Powered Mentor Matching</li>
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Priority Response Time</li>
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Unlimited Sessions</li>
                  <li className="mb-2"><i className="bi bi-x-circle-fill text-danger me-2"></i>Access to Premium Mentor Pool</li>
                  <li className="mb-2"><i className="bi bi-x-circle-fill text-danger me-2"></i>Dedicated Account Manager</li>
                </ul>
                
              </div>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="col-lg-4">
            <div className="card h-100 border-0 shadow">
              <div className="card-header bg-white border-0 text-center py-4">
                <h2 className="card-title fw-bold mb-1">Premium</h2>
                <p className="text-muted mb-0">For enterprise needs</p>
              </div>
              <div className="card-body text-center">
                <div className="display-6 fw-bold text-primary mb-3">499 <small className="fs-5 text-muted">/month</small></div>
                <ul className="list-unstyled mb-4">
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Contextual Q&A</li>
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>AI-Powered Mentor Matching</li>
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Priority Response Time</li>
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Unlimited Sessions</li>
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Access to Premium Mentor Pool</li>
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Dedicated Account Manager</li>
                </ul>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;