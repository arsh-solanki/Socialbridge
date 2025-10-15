// src/components/MentorCard.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MentorCard = ({ mentor, onAskQuestion }) => {
  const mentorName = mentor.userId?.name || 'Unknown Mentor';
  const initial = mentorName.charAt(0).toUpperCase();
  const expertiseTags = (mentor.expertise || []).slice(0, 3);

  const placeholderImg = `https://placehold.co/150x150?text=${initial}&font=roboto`;

  return (
    <div className="card h-100 shadow-sm">
      <img 
        src={placeholderImg} 
        className="card-img-top" 
        alt={mentorName}
        style={{ height: '150px', objectFit: 'cover' }} 
        onError={(e) => {
          e.target.src = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPntpbml0fTwvdGV4dD48L3N2Zz4=`.replace('{initial}', initial);
        }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{mentorName}</h5>
        <p className="card-text text-muted mb-2">{mentor.title || 'No Title'}</p>
        <span className="badge bg-primary mb-2">AI Match: {mentor.relevanceScore || 0}/100</span>
        <div className="mb-3">
          {expertiseTags.map((skill, index) => (
            <span key={index} className="badge bg-secondary me-1">{skill}</span>
          ))}
        </div>
        <p className="text-muted small flex-grow-1 mb-3">Low-Pressure, Asynchronous Guidance</p>
        <button className="btn btn-primary mt-auto" onClick={onAskQuestion}>Ask a Question</button>
      </div>
    </div>
  );
};

export default MentorCard;