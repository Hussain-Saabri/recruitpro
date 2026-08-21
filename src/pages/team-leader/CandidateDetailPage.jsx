import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CandidateDetailsView from '@/components/team-leader/CandidateDetailsView';

const mockCandidates = [
  {
    id: "REQ-2025-FS-001",
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    role: "Full Stack Developer",
    experience: "5Y",
    rel: '4y',
    recruiter: "John Recruiter",
    status: "Profile Rejected by Client",   
    created: "10/1/2025 02:30 PM"
  },
  {
    id: "JD-003",
    name: "Hussain Saabri",
    email: "alice.johnson@email.com",
    role: "Full Stack Developer",
    experience: "5Y",
    rel: '4y',
    recruiter: "John Recruiter",
    status: "Profile Rejected by Client",   
    created: "10/1/2025 02:30 PM"
  }
];

export default function CandidateDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [id, location.pathname]);

  const [candidate, setCandidate] = useState(() => {
    if (location.state?.candidate) {
      return location.state.candidate;
    }
    if (id) {
      return mockCandidates.find(c => c.id === id) || mockCandidates[0];
    }
    return mockCandidates[0];
  });

  const handleStatusUpdate = (cand, newStatus) => {
    setCandidate(prev => (prev ? { ...prev, status: newStatus } : null));
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <CandidateDetailsView 
      candidate={candidate}
      onBack={handleBack}
      onStatusUpdate={handleStatusUpdate}
    />
  );
}
