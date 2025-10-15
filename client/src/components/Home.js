import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-3">Unlock Your Potential: High-Impact Career Mentorship, Simplified.</h1>
              <p className="lead mb-4">
                SocialBridge revolutionizes mentorship with asynchronous, high-quality 1:1 guidance through contextual Q&A. 
                Say goodbye to the pressure of live chats—get expert advice on your schedule, tailored to your career journey.
              </p>
              <a href="/mentors" className="btn btn-light btn-lg px-4">Get Started – Try for Free</a>
            </div>
            <div className="col-lg-6">
              <div className="text-center">
                <i className="bi bi-people display-1 opacity-75"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Why Choose SocialBridge?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-robot display-4 text-primary mb-3"></i>
                  <h5 className="card-title">AI-Powered Matching</h5>
                  <p className="card-text">Connect with the perfect mentor using our advanced AI algorithm, delivering a 95% relevance score for personalized career guidance.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-graph-up display-4 text-primary mb-3"></i>
                  <h5 className="card-title">Personalized Progress Tracking</h5>
                  <p className="card-text">Monitor your growth with custom milestones and actionable items, ensuring every step brings you closer to your goals.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-shield-lock display-4 text-primary mb-3"></i>
                  <h5 className="card-title">Confidential & Secure</h5>
                  <p className="card-text">Your privacy is our priority—backed by end-to-end encryption and full GDPR/DPDP compliance for worry-free interactions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Overview Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Your Journey with SocialBridge</h2>
          <div className="row justify-content-center text-center">
            <div className="col-md-3 mb-4">
              <div className="position-relative">
                <i className="bi bi-person-plus display-4 text-primary mb-3"></i>
                <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
                  <span className="text-white fw-bold fs-5">1</span>
                </div>
              </div>
              <h5 className="mt-4">Complete Profile</h5>
              <p className="text-muted">Share your goals and experience to kickstart your mentorship.</p>
            </div>
            <div className="col-md-3 mb-4">
              <div className="position-relative">
                <i className="bi bi-cpu display-4 text-primary mb-3"></i>
                <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
                  <span className="text-white fw-bold fs-5">2</span>
                </div>
              </div>
              <h5 className="mt-4">Get Matched</h5>
              <p className="text-muted">AI suggests top mentors based on your unique profile.</p>
            </div>
            <div className="col-md-3 mb-4">
              <div className="position-relative">
                <i className="bi bi-chat-dots display-4 text-primary mb-3"></i>
                <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
                  <span className="text-white fw-bold fs-5">3</span>
                </div>
              </div>
              <h5 className="mt-4">Start Learning</h5>
              <p className="text-muted">Ask contextual questions and receive expert Q&A responses.</p>
            </div>
            <div className="col-md-3 mb-4">
              <div className="position-relative">
                <i className="bi bi-bar-chart display-4 text-primary mb-3"></i>
                <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
                  <span className="text-white fw-bold fs-5">4</span>
                </div>
              </div>
              <h5 className="mt-4">Track Progress</h5>
              <p className="text-muted">Use your dashboard to monitor milestones and celebrate wins.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Call-to-Action Section */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="mb-4 fw-bold">Ready to Bridge Your Career Gap?</h2>
          <p className="lead mb-4">Choose from our flexible plans: Free Trial, Pro, or Premium—tailored to your needs.</p>
          <Link to="/pricing" className="btn btn-primary btn-lg px-4">View All Plans</Link>
        </div>
      </section>
    </>
  );
};

export default Home;