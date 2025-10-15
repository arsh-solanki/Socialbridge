// src/components/PostComponent.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PostComponent = ({ post }) => {
  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const diffMs = now - postDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffHours < 1) return `${diffMins} minutes ago`;
    if (diffDays < 1) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  const isMentor = post.authorRole === 'Mentor'; // Updated to use authorRole from backend
  const relativeTime = getRelativeTime(post.timestamp);

  return (
    <div className={`mb-4 p-3 border rounded ${isMentor ? 'bg-light' : ''}`}>
      <div className="d-flex justify-content-between align-items-start mb-2">
        <span className={`badge ${isMentor ? 'bg-primary' : 'bg-secondary'}`}>
          {post.authorRole}
        </span>
        <small className="text-muted">{relativeTime}</small>
      </div>
      <p className="mb-0">{post.content}</p>
    </div>
  );
};

export default PostComponent;