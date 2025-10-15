// src/components/MentorDashboard.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getMentorSessions } from '../utils/api';
import SessionListItem from './SessionListItem';
import Loader from './Loader';

const MentorDashboard = () => {
  const { token } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const data = await getMentorSessions(token);
        setSessions(data);
      } catch (error) {
        console.error('Failed to load sessions:', error);
      } finally {
        setLoading(false);
      }
    };
    loadSessions();
  }, [token]);

  if (loading) return <Loader />;

  return (
    <div className="container py-4">
      <h1 className="mb-4">Mentor Dashboard</h1>
      {sessions.length === 0 ? (
        <p className="text-muted">No sessions yet. Check back for new mentorship requests.</p>
      ) : (
        <div className="row">
          {sessions.map(session => (
            <div key={session._id} className="col-md-6 col-lg-4 mb-4">
              <SessionListItem session={session} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MentorDashboard;