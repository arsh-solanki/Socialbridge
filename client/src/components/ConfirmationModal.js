import React, {useState} from 'react';
import { Modal,Form,Button } from 'react-bootstrap';
import {toast} from 'react-toastify';
import {endSessionAndSubmitFeedback} from '../utils/api';

const ConfirmationModal = ({show, onHide, onConfirm, sessionId}) => {
const [rating, setRating] = useState(0); 
const [comments,setComments] = useState('');

const handleConfirm = async () => {
    try {
await endSessionAndSubmitFeedback(sessionId, {rating, comments});
toast.success('session ended and feedback submitted successfully');
onConfirm({rating, comments});
onHide();
    } catch(error) {
toast.error('failed to end session:' + error.message);
    }
};

const stars = [];
for(let i =1; i <=5; i++) {
    stars.push(
<i key={i} className={`bi bi-star${i <= rating ? '-fill' : ''} fs-4 me-1`}
style={{cursor: 'pointer', color: i <= rating? '#ffc107' : '#e9ecef'}}
onClick={() => setRating(i)} />
    );
}
    return (
<Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
<Modal.Title>End Mentorship Session?</Modal.Title>
    </Modal.Header>
    <Modal.Body>
<p>Are you sure you want to end this mentorship session? this will close the thread and return you to the home page</p>
<Form.Group className="mb-3">
    <Form.Label>Final Feedback Rating (1-5 Stars)</Form.Label>
    <div className="d-flex align-items-center">{stars}</div>
</Form.Group>
<Form.Group className="mb-3">
    <Form.Label>Comments(Optional)</Form.Label>
    <Form.Control as="textarea" rows={3} value={comments} onChange={(e) => setComments(e.target.value)}
        placeholder='share any final thoughts or suggestions...'/>
</Form.Group>
    </Modal.Body>
    <Modal.Footer>
<Button variant='secondary' onClick={onHide}>Cancel</Button>
    <Button variant='danger' onClick={handleConfirm} disabled={rating === 0}>Confirm</Button>
    </Modal.Footer>
</Modal>
);
} ;
export default ConfirmationModal;