// src/utils/api.js (Complete Updated - Optional Token for GET, with Logging)
const API_BASE = '/api';

// Helper to get headers
const getHeaders = (token = null) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

// Fetch all mentors (public - no token needed)
export const fetchMentors = async () => {
  const res = await fetch(`${API_BASE}/mentor/mentors`, { method: 'GET' });
  if (!res.ok) throw new Error('Failed to fetch mentors');
  return res.json();
};

// Get single mentor by ID (public - no token needed)
export const getMentorById = async (id) => {
  const res = await fetch(`${API_BASE}/mentor/${id}`, { method: 'GET' });
  if (!res.ok) throw new Error('Mentor not found');
  return res.json();
};

// Submit initial question (onboarding) - creates session (requires token)
export const submitQuestion = async (mentorId, questionData, token) => {
  const res = await fetch(`${API_BASE}/sessions`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify({ mentorId, ...questionData })
  });
  if (!res.ok) throw new Error('Failed to submit question');
  return res.json();
};

// Fetch thread (session) - optional token for public Q&A
export const fetchThread = async (sessionId, token = null) => {
  console.log('Fetching thread for ID:', sessionId); // DEBUG
  const res = await fetch(`${API_BASE}/sessions/${sessionId}`, {
    headers: getHeaders(token),
    method: 'GET'
  });
  if (!res.ok) {
    const errorText = await res.text(); // Get full error body
    console.error('Thread fetch failed:', res.status, errorText); // DEBUG
    throw new Error('Thread not found');
  }
  return res.json();
};

// Alias for getSession
export const getSession = fetchThread;

// Post follow-up (requires token)
export const postFollowUp = async (sessionId, content, token) => {
  const res = await fetch(`${API_BASE}/posts`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify({ sessionId, content })
  });
  if (!res.ok) throw new Error('Failed to post follow-up');
  return res.json();
};

// Alias for createPost
export const createPost = postFollowUp;

// End session and submit feedback (requires token)
export const endSessionAndSubmitFeedback = async (sessionId, feedbackData, token) => {
  // First end the session
  const endRes = await fetch(`${API_BASE}/sessions/${sessionId}/end`, {
    method: 'PATCH',
    headers: getHeaders(token)
  });
  if (!endRes.ok) throw new Error('Failed to end session');

  // Then submit feedback
  const feedbackRes = await fetch(`${API_BASE}/sessions/${sessionId}/feedback`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(feedbackData)
  });
  if (!feedbackRes.ok) throw new Error('Failed to submit feedback');

  return feedbackRes.json();
};

// Get mentor profile (optional token for public)
export const getMentorProfile = async (token = null) => {
  const res = await fetch(`${API_BASE}/mentor/profile`, {
    headers: getHeaders(token),
    method: 'GET'
  });
  if (!res.ok) throw new Error('Failed to fetch profile');
  return res.json();
};

// Update mentor profile (requires token)
export const updateMentorProfile = async (profileData, token) => {
  const res = await fetch(`${API_BASE}/mentor/profile`, {
    method: 'PUT',
    headers: getHeaders(token),
    body: JSON.stringify(profileData)
  });
  if (!res.ok) throw new Error('Failed to update profile');
  return res.json();
};

// Get mentor sessions (optional token for public dashboard)
export const getMentorSessions = async (token = null) => {
  const res = await fetch(`${API_BASE}/mentor/dashboard`, {
    headers: getHeaders(token),
    method: 'GET'
  });
  if (!res.ok) throw new Error('Failed to fetch sessions');
  return res.json();
};