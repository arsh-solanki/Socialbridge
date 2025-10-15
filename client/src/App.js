// src/App.js (Public for Q&A, Dashboard, Profile, etc.)
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SessionProvider } from './contexts/SessionContext';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Pricing from './components/Pricing';
import BrowseMentors from './components/BrowseMentors';
import QATopicView from './components/QATopicView';
import MentorDashboard from './components/MentorDashboard';
import MentorProfileForm from './components/MentorProfileForm';
import MentorQATopicView from './components/MentorQATopicView';
import MentorRegistration from './components/MentorRegistration';
import LoginForm from './components/LoginForm';
import MenteeOnboardingModal from './components/MenteeOnboardingModal';

const AppContent = () => {
  return (
    <SessionProvider>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/mentors" element={<BrowseMentors />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register-mentor" element={<MentorRegistration />} />

        {/* Public - No Login Required */}
        <Route path="/qa/:id" element={<QATopicView />} /> {/* Mentee Q&A */}
        <Route path="/mentor/dashboard" element={<MentorDashboard />} /> {/* Mentor Dashboard */}
        <Route path="/mentor/profile" element={<MentorProfileForm />} /> {/* Mentor Profile */}
        <Route path="/mentor/qa/:id" element={<MentorQATopicView />} /> {/* Mentor Q&A */}
        <Route path="/onboarding" element={<MenteeOnboardingModal />} /> {/* Mentee Onboarding */}

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </SessionProvider>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;