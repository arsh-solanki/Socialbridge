// src/components/SessionListItem.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Badge } from 'react-bootstrap';

const SessionListItem = ({ session }) => {
  const statusBadge = session.status === 'Pending' ? 'bg-warning' : 
                      session.status === 'Active' ? 'bg-info' : 'bg-success';
  const menteeName = session.mentee?.name || 'Anonymous Mentee';

  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title className="mb-2">{session.subject}</Card.Title>
        <Card.Text className="text-muted mb-2">
          Mentee: {menteeName}
        </Card.Text>
        <Badge bg={statusBadge} className="mb-2">
          {session.status}
        </Badge>
        <Link to={`/mentor/qa/${session._id}`} className="btn btn-primary mt-auto">
          View Thread
        </Link>
      </Card.Body>
    </Card>
  );
};

export default SessionListItem;