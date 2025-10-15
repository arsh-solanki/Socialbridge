import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';
import { getSession, createPost, endSessionAndSubmitFeedback } from '../utils/api';
import PostComponent from './PostComponent';
import {Button} from 'react-bootstrap';
import {toast} from 'react-toastify';

const MentorQATopicView = () => {
    const {id} = useParams();
    const {token} = useAuth();
    const [session, setSession] = useState(null);
    const [newReply, setNewReply] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSession = async () => {
            try {
const data = await getSession(id, token);
setSession(data);
            } catch(error) {
console.error('failed to load session',error);
            } finally {
setLoading(false);
            }
        };
        loadSession();
    }, [id,token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!newReply.trim()) return;
        setLoading(true);
        try {
const newPost = await createPost({});
setSession(prev => ({
    ...prev,
    posts: [...prev.posts, newPost]
}));
setNewReply('');
        } catch(error) {
console.error('failed to post reply',error)
        } finally {
setLoading(false);
        }
    };

    const handleEndSession = async () => {
        if(window.confirm('are you sure you want to end this session?')) {
            try {
await endSessionAndSubmitFeedback(id, {rating: null, comments: ''});
toast.success('session ended successfully');
            } catch(error) {
toast.error('failed to end session' + error.message);
            }
        }
    };

    if(loading || !session) return <div>Loading...</div>
    return (
<div className="container py-4">
    <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>{session.subject}</h1>
        <Button variant='danger' onClick={handleEndSession}>End Session</Button>
        </div>
        <div className="alert alert-info mb-4">
            <strong>Mentee Goals:</strong> {session.menteeGoals}
        </div>
        <div className="list-unstyled mb-4">
            {session.posts.map(post => (
                <PostComponent key = {post._id} post ={post} />
            ))}
        </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Draft Response</label>
                    <textarea className="form-control" rows="6" value={newReply} onChange={(e) => setNewReply(e.target.value)} placeholder='provide detailed, guidance..' disabled={loading} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={!newReply.trimm() || loading}>Post Response</button>
            </form>
</div>
    );
};
export default MentorQATopicView;