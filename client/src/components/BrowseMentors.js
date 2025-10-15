import React, { useState, useEffect } from 'react';

// --- MOCK DATA, CONTEXTS, AND UTILITIES (STUBS) ---

// Mock Mentor Data
const DUMMY_MENTORS = [
    { id: 'm1', name: 'Alice Johnson', expertise: ['React', 'Bootstrap', 'Design'], relevanceScore: 95, rating: 4.8, experienceLevel: 'Expert', pool: 'Open Source', joined: '2022-01-01' },
    { id: 'm2', name: 'Bob Smith', expertise: ['Node.js', 'Databases', 'API'], relevanceScore: 88, rating: 4.5, experienceLevel: 'Senior', pool: 'Corporate', joined: '2023-05-15' },
    { id: 'm3', name: 'Charlie Day', expertise: ['Finance', 'Strategy'], relevanceScore: 75, rating: 4.0, experienceLevel: 'Mid-Level', pool: 'Finance', joined: '2024-02-20' },
    { id: 'm4', name: 'Diana Prince', expertise: ['Vue', 'Design', 'Frontend'], relevanceScore: 92, rating: 4.9, experienceLevel: 'Expert', pool: 'Corporate', joined: '2021-11-10' },
];

// Mock API: Fetches mentor data.
const fetchMentors = async () => {
    return new Promise(resolve => setTimeout(() => resolve(DUMMY_MENTORS), 500));
};

// Mock API: Submits a question.
const submitQuestion = async (mentorId, questionData, token) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (!token) {
                console.log(`[API MOCK] Submitting ANONYMOUS question for mentor ${mentorId}:`, questionData);
            } else {
                console.log(`[API MOCK] Submitting AUTHENTICATED question for mentor ${mentorId}:`, questionData);
            }
            // Always successfully create a session ID (for Charlie Day, m3)
            resolve({ sessionId: `s-${Math.random().toString(36).substring(2, 9)}` });
        }, 500);
    });
};

// Mock Auth Hook
const useAuth = () => {
  // Setting token to null to simulate an unauthenticated user (since login is now optional for Q&A)
  const [token] = useState(null); 
  return { token };
};

// Mock Session Hook
const useSession = () => {
  const [loading, setLoading] = useState(false);
  return { loading, setLoading };
};

// Mock THREAD Data for QATopicView
const MOCK_THREAD_DATA = {
    // Note: Mentor name will be set dynamically based on DUMMY_MENTORS
    subject: 'Initial Question: Help with state management in React.',
    mentorId: 'm3', // Default to Charlie Day
    posts: [
        { id: 'p1', author: 'Mentee', content: 'What is the best way to handle global state in a small-to-medium sized React app without Redux?', role: 'mentee', timestamp: new Date(Date.now() - 3600000).toLocaleString() },
        { id: 'p2', author: 'Charlie Day', content: 'For small apps, Context + useReducer is great. For medium apps, consider Zustand or Jotai. They offer better performance and less boilerplate than Redux. Let me know if you have a specific code example!', role: 'mentor', timestamp: new Date(Date.now() - 1800000).toLocaleString() },
    ]
};

// Mock API: Fetch Thread
const fetchThread = async (sessionId) => {
    const mentor = DUMMY_MENTORS.find(m => m.id === MOCK_THREAD_DATA.mentorId);
    return new Promise(resolve => setTimeout(() => resolve({
        ...MOCK_THREAD_DATA,
        id: sessionId,
        mentorName: mentor ? mentor.name : 'Unknown Mentor' 
    }), 800));
};

// Mock API: Post Follow Up
const postFollowUp = async (sessionId, replyContent) => {
    console.log(`[API MOCK] Posting follow up to session ${sessionId}: ${replyContent}`);
    return new Promise(resolve => setTimeout(() => resolve({
        id: `p-${Math.random().toString(36).substring(2, 9)}`,
        author: 'Mentee',
        content: replyContent,
        role: 'mentee',
        // Use a slight delay for timestamp visibility
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) 
    }), 500));
};

// Mock API: End Session
const endSessionAndSubmitFeedback = async (sessionId, feedback) => {
    console.log(`[API MOCK] Ending session ${sessionId} with feedback: ${feedback}`);
    return new Promise(resolve => setTimeout(() => resolve(true), 500));
};


// --- UI COMPONENTS ---

const Loader = () => (
  <div className="d-flex flex-column justify-content-center align-items-center vh-100">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <p className="mt-3 text-muted">Loading Mentors...</p>
  </div>
);

const MentorCard = ({ mentor, onAskQuestion }) => (
  <div className="card h-100 border-0 shadow-sm rounded-4 hover-lift">
    <div className="card-body d-flex flex-column">
      <h5 className="card-title text-primary fw-bold">{mentor.name}</h5>
      <p className="card-subtitle mb-2 text-muted small">{mentor.experienceLevel} ({mentor.pool})</p>
      
      <div className="mb-3">
        {mentor.expertise.map(e => 
          <span key={e} className="badge text-bg-info-subtle text-info me-1">{e}</span>
        )}
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-warning fw-bold"><i className="fas fa-star me-1"></i>{mentor.rating || 'N/A'}</span>
        <span className="text-secondary small">Relevance: {mentor.relevanceScore}%</span>
      </div>

      <button
        onClick={() => onAskQuestion(mentor)}
        className="btn btn-primary mt-auto rounded-pill fw-semibold"
      >
        Ask a Question
      </button>
    </div>
  </div>
);

const FilterSidebar = ({ relevanceMin, onRelevanceChange, clearFilters }) => (
  <div className="sticky-lg-top pt-lg-4 pb-4">
    <div className="card shadow-sm rounded-4">
      <div className="card-body">
        <h5 className="card-title text-primary border-bottom pb-2 mb-3 fw-bold">
            <i className="fas fa-filter me-2"></i>Filter Mentors
        </h5>
        
        <div className="mb-4">
          <label htmlFor="relevanceRange" className="form-label text-muted mb-1">
            Minimum Relevance: <span className="fw-semibold">{relevanceMin}%</span>
          </label>
          <input 
            type="range" 
            className="form-range" 
            min="0" 
            max="100" 
            step="1" 
            value={relevanceMin} 
            onChange={(e) => onRelevanceChange(Number(e.target.value))}
            id="relevanceRange"
          />
        </div>

        <h6 className="text-secondary mb-2 fw-semibold">Skills (Mock)</h6>
        {['React', 'Node.js', 'Design'].map(skill => (
            <div key={skill} className="form-check">
                <input className="form-check-input" type="checkbox" id={skill} defaultChecked disabled />
                <label className="form-check-label text-muted" htmlFor={skill}>{skill}</label>
            </div>
        ))}
        
        <hr className="my-3" />
        <button 
            onClick={clearFilters}
            className="btn btn-outline-secondary w-100 btn-sm rounded-pill fw-semibold"
        >
            Clear All Filters
        </button>
      </div>
    </div>
  </div>
);

const MenteeOnboardingModal = ({ show, onHide, onSubmit, mentor }) => {
    const [question, setQuestion] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!show) return null;

    const modalId = "mentorQuestionModal";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question.trim()) return;

        setIsSubmitting(true);
        await onSubmit({ question });
        setIsSubmitting(false);
    };

    return (
        <div 
            className={`modal fade ${show ? 'd-block show' : ''}`} 
            tabIndex="-1" 
            role="dialog" 
            style={{ display: show ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }} 
            id={modalId}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content rounded-4 shadow-lg">
                    <div className="modal-header border-0 pb-0">
                        <h5 className="modal-title fw-bold">Ask {mentor.name}</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onHide}></button>
                    </div>
                    <div className="modal-body pt-2">
                        <p className="text-muted">Start your mentorship session with your first question.</p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="questionTextarea" className="form-label fw-semibold">Your Question</label>
                                <textarea 
                                    className="form-control rounded-3" 
                                    id="questionTextarea" 
                                    rows="4" 
                                    placeholder="What are you hoping to learn from this mentor?" 
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div className="d-flex justify-content-end pt-2">
                                <button type="button" className="btn btn-secondary rounded-pill me-2" onClick={onHide} disabled={isSubmitting}>
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary rounded-pill fw-semibold" 
                                    disabled={isSubmitting || !question.trim()}
                                >
                                    {isSubmitting ? 'Starting Session...' : 'Submit Question'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

// PostComponent (Card style)
const PostComponent = ({ post }) => {
    const isMentor = post.role === 'mentor';
    const alignClass = isMentor ? 'bg-light border-start border-primary border-4' : 'bg-white shadow-sm';
    const textColor = isMentor ? 'text-dark' : 'text-dark';

    return (
        <div className={`d-flex ${isMentor ? 'justify-content-start' : 'justify-content-end'} mb-4`}>
            <div className={`card w-100 rounded-4 p-0 ${alignClass}`} style={{ maxWidth: '700px' }}>
                <div className="card-body p-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className={`card-subtitle mb-0 small fw-bold ${textColor}`}>
                            {post.author} {isMentor && <span className="badge text-bg-primary">Mentor</span>}
                        </h6>
                        <span className="text-muted small">{post.timestamp}</span>
                    </div>
                    <p className="card-text mb-0 text-break">{post.content}</p>
                </div>
            </div>
        </div>
    );
};

// ConfirmationModal
const ConfirmationModal = ({ show, onHide, onConfirm, sessionId }) => {
    const [feedback, setFeedback] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!show) return null;

    const handleSubmit = async () => {
        setIsSubmitting(true);
        await onConfirm(feedback);
        setIsSubmitting(false);
        // Do not call onHide here, onConfirm will navigate away
    };

    return (
        <div 
            className={`modal fade ${show ? 'd-block show' : ''}`} 
            tabIndex="-1" 
            role="dialog" 
            style={{ display: show ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content rounded-4 shadow-lg">
                    <div className="modal-header border-0 pb-0">
                        <h5 className="modal-title fw-bold text-danger">End Session: {sessionId}</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onHide} disabled={isSubmitting}></button>
                    </div>
                    <div className="modal-body pt-2">
                        <p>Are you sure you want to end this mentorship session?</p>
                        <p className="small text-muted">You must leave feedback to close the thread.</p>
                        <div className="mb-3">
                            <label htmlFor="feedbackTextarea" className="form-label fw-semibold">Session Feedback</label>
                            <textarea 
                                className="form-control rounded-3" 
                                id="feedbackTextarea" 
                                rows="3" 
                                placeholder="E.g., The mentor provided clear guidance on React best practices." 
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                required
                                disabled={isSubmitting}
                            ></textarea>
                        </div>
                    </div>
                    <div className="modal-footer border-0 pt-0">
                        <button type="button" className="btn btn-secondary rounded-pill" onClick={onHide} disabled={isSubmitting}>
                            Cancel
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-danger rounded-pill fw-semibold" 
                            onClick={handleSubmit} 
                            disabled={isSubmitting || !feedback.trim()}
                        >
                            {isSubmitting ? 'Submitting...' : 'End & Submit Feedback'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


/**
 * Updated Component: Full Q&A / Chat view implementation
 */
const QATopicView = ({ sessionId, navigate }) => {
    const [newReply, setNewReply] = useState('');
    const [thread, setThread] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const { setLoading: setGlobalLoading } = useSession();
    const id = sessionId; // Use prop instead of useParams()

    useEffect(() => {
        const loadThread = async () => {
            try {
                setGlobalLoading(true);
                const threadData = await fetchThread(id);
                setThread(threadData);
            } catch (error) {
                console.error('Failed to load thread:', error);
                // On failure, redirect back to mentors page
                navigate('/');
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
                posts: [...(prev.posts || []), newPost]
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
            // Note: The mock API will log the feedback and return true
            await endSessionAndSubmitFeedback(id, feedback);
            // Navigate away on success
            navigate('/');
        } catch (error) {
            console.error('Failed to end session:', error);
        }
    };

    if (loading || !thread) {
        return <Loader />;
    }

    return (
        <div className="d-flex flex-column min-vh-100 bg-light">
            {/* Thread Header */}
            <header className="bg-white border-bottom py-3 shadow-sm sticky-top">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h1 className="h4 mb-1 fw-bold text-dark">{thread.subject}</h1>
                            <p className="text-muted mb-0 small">Mentor: <strong>{thread.mentorName}</strong> | Session: <code className="fw-bold">{id}</code></p>
                        </div>
                        <button className="btn btn-danger rounded-pill fw-semibold" onClick={handleEndSession}>
                            <i className="fas fa-times-circle me-1"></i>
                            End Mentorship
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow-1 py-4" style={{ backgroundColor: '#f4f4f9' }}>
                <div className="container">
                    {/* Asynchronous Reminder */}
                    <div className="alert alert-info border-0 shadow-sm rounded-4 mb-4" role="alert">
                        <i className="fas fa-clock me-2"></i>
                        This is an asynchronous Q&A thread. Mentor response expected within 24-48 hours.
                    </div>

                    {/* Message Display */}
                    <div className="d-flex flex-column">
                        {(thread.posts || []).map((post) => (
                            <PostComponent key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </main>

            {/* Response Input */}
            <footer className="bg-white border-top p-4 shadow-lg sticky-bottom">
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="newReply" className="form-label fw-semibold">Post Follow-Up</label>
                            <textarea
                                className="form-control rounded-3"
                                id="newReply"
                                rows="3"
                                value={newReply}
                                onChange={(e) => setNewReply(e.target.value)}
                                placeholder="Type your follow-up question or response here..."
                                disabled={loading}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary rounded-pill fw-semibold px-4" disabled={!newReply.trim() || loading}>
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


// --- MAIN APPLICATION COMPONENT (BROWSE VIEW) ---

const BrowseMentors = ({ navigate }) => {
    const [mentors, setMentors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('relevance');
    const [filters, setFilters] = useState({
        relevanceMin: 70,
    });
    const [showModal, setShowModal] = useState(false);
    const [selectedMentor, setSelectedMentor] = useState(null);
    const [error, setError] = useState(null);

    const { setLoading } = useSession();
    const { token } = useAuth(); // Get the user's token (will be null for anonymous)

    // Data Fetching Effect
    useEffect(() => {
        const loadMentors = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchMentors();
                setMentors(data);
            } catch (err) {
                console.error('Failed to load mentors:', err);
                setError('Failed to load mentors. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        loadMentors();
    }, [setLoading]);

    // Filtering and Sorting Logic
    const filteredMentors = React.useMemo(() => {
        let filtered = mentors.filter(m => {
            if (!m) return false;
            const matchesSearch = m.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                m.expertise?.some(e => e.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesRelevance = m.relevanceScore >= filters.relevanceMin;
            return matchesSearch && matchesRelevance;
        });

        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'rating':
                    return (b.rating || 0) - (a.rating || 0);
                case 'newest':
                    return new Date(b.joined || 0) - new Date(a.joined || 0);
                case 'name':
                    return (a.name || '').localeCompare(b.name || '');
                case 'relevance':
                default:
                    return (b.relevanceScore || 0) - (a.relevanceScore || 0);
            }
        });
        return filtered;
    }, [mentors, searchTerm, sortBy, filters.relevanceMin]);

    // Handler Functions
    const handleRelevanceChange = (value) => {
        setFilters({ ...filters, relevanceMin: value });
    };

    const clearFilters = () => {
        setFilters({ relevanceMin: 70 });
        setSearchTerm('');
    };

    const handleAskQuestion = (mentor) => {
        setSelectedMentor(mentor);
        setShowModal(true);
    };

    const handleOnboardingSubmit = async (formData) => {
        if (!selectedMentor) return;
        
        try {
            // The API function (mocked here) handles the session creation 
            const { sessionId } = await submitQuestion(selectedMentor.id, formData, token); 
            
            // USE THE PASSED navigate PROP TO CHANGE STATE/ROUTE
            navigate(`/qa/${sessionId}`);
            setShowModal(false);
        } catch (err) {
            console.error('Failed to submit question:', err);
            setError('Failed to start mentorship. Check console for details.');
        }
    };

    // Render the main application
    return (
        <div className="container-fluid py-4 min-vh-100">
                
            {/* Error Alert */}
            {error && (
                <div className="alert alert-danger d-flex justify-content-between align-items-center mb-4 rounded-3 shadow-sm" role="alert">
                    {error} 
                    <button 
                        className="btn btn-sm btn-outline-danger ms-2" 
                        onClick={() => window.location.reload()}
                    >
                        Retry
                    </button>
                </div>
            )}

            <div className="max-w-7xl mx-auto">
                {/* Header and Search */}
                <div className="row mb-4">
                    <div className="col-12">
                        <h1 className="display-5 fw-bold text-dark mb-3">Find Your Mentor</h1>
                        <input
                            type="text"
                            className="form-control form-control-lg mb-3 shadow-sm rounded-3"
                            placeholder="Search by Mentor Name or Topic (e.g., React, Finance)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="col-12 d-flex justify-content-between align-items-center">
                        <span className="text-muted small">Showing {filteredMentors.length} of {mentors.length} Mentors</span>
                        <select
                            className="form-select w-auto form-select-sm shadow-sm rounded-3"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="relevance">Highest Relevance Score</option>
                            <option value="rating">Highest Rating</option>
                            <option value="newest">Newest</option>
                            <option value="name">Name A-Z</option>
                        </select>
                    </div>
                </div>

                {/* Main Layout (Sidebar + List) */}
                <div className="row">
                    {/* Filter Sidebar */}
                    <div className="col-lg-3">
                        <FilterSidebar
                            relevanceMin={filters.relevanceMin}
                            onRelevanceChange={handleRelevanceChange}
                            clearFilters={clearFilters}
                        />
                    </div>

                    {/* Mentor Listing */}
                    <div className="col-lg-9">
                        {filteredMentors.length === 0 ? (
                            <div className="text-center py-5 bg-white rounded-4 shadow-sm">
                                <h4 className="text-dark fw-bold">No Mentors Found</h4>
                                <p className="text-muted">Try adjusting your filters or search terms.</p>
                            </div>
                        ) : (
                            <div className="row g-4">
                                {filteredMentors.map(mentor => (
                                    <div key={mentor.id} className="col-md-6 col-xl-4">
                                        <MentorCard mentor={mentor} onAskQuestion={handleAskQuestion} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {selectedMentor && (
                <MenteeOnboardingModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    onSubmit={handleOnboardingSubmit}
                    mentor={selectedMentor}
                />
            )}
        </div>
    );
};


// Export the main component as App for single file structure, now serving as a simple router
export default function App() {
    const [path, setPath] = useState('/');

    // Navigation function that updates the state (our mock router)
    const navigate = (newPath) => {
        setPath(newPath);
        console.log(`[NAVIGATION] State changed to: ${newPath}`);
    };
    
    // Determine which view to render
    let content;
    const isQASession = path.startsWith('/qa/');

    if (isQASession) {
        // Correctly pass the session ID extracted from the path
        const sessionId = path.replace('/qa/', '');
        content = <QATopicView sessionId={sessionId} navigate={navigate} />;
    } else {
        content = <BrowseMentors navigate={navigate} />;
    }

    // Render the common structure and the dynamic content
    return (
        <React.Fragment>
            {/* Common global styles and scripts */}
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
            <style>
            {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
                body { 
                    font-family: 'Inter', sans-serif; 
                    background-color: #f8f9fa;
                }
                .hover-lift {
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .hover-lift:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1) !important;
                }
            `}
            </style>
            
            {/* Loader State */}
            {useSession().loading && <Loader />}
            
            {/* Dynamic Content */}
            {content}

            {/* Bootstrap JS CDN */}
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        </React.Fragment>
    );
}
