// src/components/QATopicView.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSession } from '../contexts/SessionContext';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchThread, postFollowUp, endSessionAndSubmitFeedback } from '../utils/api';
import ConfirmationModal from './ConfirmationModal';
import PostComponent from './PostComponent';
import Loader from './Loader';

const QATopicView = () => {
  const [newReply, setNewReply] = useState('');
  const [thread, setThread] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setLoading: setGlobalLoading } = useSession();
  const navigate = useNavigate();
  const { id } = useParams(); // sessionId

  useEffect(() => {
    const loadThread = async () => {
      try {
        setGlobalLoading(true);
        const threadData = await fetchThread(id);
        setThread(threadData);
      } catch (error) {
        console.error('Failed to load thread:', error);
        navigate('/mentors');
      } finally {
        setGlobalLoading(false);
        setLoading(false);
      }
    };
    loadThread();
  }, [id, navigate, setGlobalLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReply.trim()) return;
    setLoading(true);
    try {
      const newPost = await postFollowUp(id, newReply);
      setThread(prev => ({
        ...prev,
        posts: [...prev.posts, newPost]
      }));
      setNewReply('');
    } catch (error) {
      console.error('Failed to post follow-up:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEndSession = () => {
    setShowModal(true);
  };

  const confirmEndSession = async (feedback) => {
    try {
      await endSessionAndSubmitFeedback(id, feedback);
      navigate('/');
    } catch (error) {
      console.error('Failed to end session:', error);
    }
  };

  if (loading || !thread) {
    return <Loader />;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Thread Header */}
      <header className="bg-light border-bottom py-3">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h3 mb-1 fw-bold">{thread.subject}</h1>
              <p className="text-muted mb-0">Mentor: <strong>{thread.mentorName}</strong></p>
            </div>
            <button className="btn btn-outline-danger" onClick={handleEndSession}>
              <i className="bi bi-check-circle me-1"></i>
              End Mentorship
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow-1 py-4">
        <div className="container">
          {/* Asynchronous Reminder */}
          <div className="alert alert-info mb-4" role="alert">
            <i className="bi bi-clock me-2"></i>
            This is an asynchronous Q&A thread. Mentor response expected within 24-48 hours.
          </div>

          {/* Message Display */}
          <div className="list-unstyled">
            {thread.posts.map((post) => (
              <PostComponent key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>

      {/* Response Input */}
      <footer className="bg-light border-top p-4">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="newReply" className="form-label">Post Follow-Up</label>
              <textarea
                className="form-control"
                id="newReply"
                rows="4"
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="Type your follow-up question or response here..."
                disabled={loading}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" disabled={!newReply.trim() || loading}>
              {loading ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> : null}
              Post Follow-Up
            </button>
          </form>
        </div>
      </footer>

      <ConfirmationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={confirmEndSession}
        sessionId={id}
      />
    </div>
  );
};

export default QATopicView;