import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, Moon, Sun, BarChart3, Lock, Users, TrendingUp, AlertCircle, CheckCircle, Loader } from 'lucide-react';

const AnonVoteIntegrated = () => {
  // API Configuration
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
  
  const [darkMode, setDarkMode] = useState(false);
  const [polls, setPolls] = useState([]);
  const [userDisplayName, setUserDisplayName] = useState('');
  const [externalUserId, setExternalUserId] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [view, setView] = useState('polls');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [newPoll, setNewPoll] = useState({
    title: '',
    description: '',
    vote_type: 'both'
  });

  // Check for existing auth token on mount
  useEffect(() => {
    const token = localStorage.getItem('anonvote_token');
    const userName = localStorage.getItem('anonvote_username');
    
    if (token && userName) {
      setAuthToken(token);
      setUserDisplayName(userName);
      setIsAuthenticated(true);
      fetchPolls(token);
    }
  }, []);

  // Auto-dismiss messages
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  // API Helper Function
  const apiCall = async (endpoint, options = {}) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    };

    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      credentials: 'include', // Important: Include credentials
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (err) {
    throw new Error(err.message || 'Network error occurred');
  }
};
  // Authentication
  const handleLogin = async () => {
    if (!userDisplayName.trim() || !externalUserId.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          external_user_id: externalUserId,
          display_name: userDisplayName,
          real_identity: `user_${externalUserId}@example.com`, // Simulated
        }),
      });

      setAuthToken(data.token);
      setIsAuthenticated(true);
      localStorage.setItem('anonvote_token', data.token);
      localStorage.setItem('anonvote_username', userDisplayName);
      setSuccess('Login successful!');
      
      // Fetch polls after login
      await fetchPolls(data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await apiCall('/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout error:', err);
    }

    setAuthToken(null);
    setIsAuthenticated(false);
    setPolls([]);
    localStorage.removeItem('anonvote_token');
    localStorage.removeItem('anonvote_username');
    setSuccess('Logged out successfully');
  };

  // Fetch Polls
  const fetchPolls = async (token = authToken) => {
    setLoading(true);
    try {
      const data = await apiCall('/polls', {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      });
      setPolls(data.polls || []);
    } catch (err) {
      setError('Failed to load polls');
    } finally {
      setLoading(false);
    }
  };

  // Create Poll
  const handleCreatePoll = async () => {
    if (!newPoll.title || !newPoll.description) {
      setError('Please fill in all poll fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await apiCall('/polls', {
        method: 'POST',
        body: JSON.stringify(newPoll),
      });

      setPolls([data.poll, ...polls]);
      setNewPoll({ title: '', description: '', vote_type: 'both' });
      setView('polls');
      setSuccess('Poll created successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Vote Handler
  const handleVote = async (pollId, voteType) => {
    setLoading(true);
    try {
      const poll = polls.find(p => p.id === pollId);
      const currentVote = poll.user_vote;

      // If clicking the same vote, remove it
      if (currentVote === voteType) {
        await apiCall(`/polls/${pollId}/vote`, {
          method: 'DELETE',
        });
      } else {
        // Cast or change vote
        await apiCall(`/polls/${pollId}/vote`, {
          method: 'POST',
          body: JSON.stringify({ vote_type: voteType }),
        });
      }

      // Refresh polls
      await fetchPolls();
      setSuccess('Vote recorded!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getPercentage = (votes, total) => {
    if (total === 0) return 0;
    return ((votes / total) * 100).toFixed(1);
  };

  // Theme Classes
  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const cardClass = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const textClass = darkMode ? 'text-gray-100' : 'text-gray-900';
  const textSecondaryClass = darkMode ? 'text-gray-400' : 'text-gray-600';
  const inputClass = darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900';
  const buttonClass = darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600';

  // Alert Component
  const Alert = ({ type, message }) => {
    const isError = type === 'error';
    const Icon = isError ? AlertCircle : CheckCircle;
    const bgColor = isError 
      ? (darkMode ? 'bg-red-900/30 border-red-800' : 'bg-red-50 border-red-200')
      : (darkMode ? 'bg-green-900/30 border-green-800' : 'bg-green-50 border-green-200');
    const textColor = isError
      ? (darkMode ? 'text-red-400' : 'text-red-800')
      : (darkMode ? 'text-green-400' : 'text-green-800');

    return (
      <div className={`fixed top-4 right-4 z-50 ${bgColor} border rounded-lg p-4 shadow-lg flex items-center gap-3 max-w-md animate-slide-in`}>
        <Icon className={`w-5 h-5 ${textColor}`} />
        <p className={textColor}>{message}</p>
      </div>
    );
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen ${bgClass} flex items-center justify-center p-4 transition-colors duration-200`}>
        {error && <Alert type="error" message={error} />}
        {success && <Alert type="success" message={success} />}
        
        <div className={`${cardClass} border rounded-2xl shadow-2xl p-8 w-full max-w-md transition-colors duration-200`}>
          <div className="flex items-center justify-center mb-6">
            <Lock className="w-12 h-12 text-blue-500 mr-3" />
            <h1 className={`text-3xl font-bold ${textClass}`}>AnonVote</h1>
          </div>
          <p className={`${textSecondaryClass} text-center mb-8`}>
            Secure & Anonymous Voting Platform
          </p>

          <div className="space-y-4">
            <div>
              <label className={`block ${textClass} font-medium mb-2`}>
                User ID (from 3rd party app)
              </label>
              <input
                type="text"
                value={externalUserId}
                onChange={(e) => setExternalUserId(e.target.value)}
                placeholder="user123"
                className={`w-full px-4 py-3 rounded-lg border ${inputClass} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                disabled={loading}
              />
            </div>

            <div>
              <label className={`block ${textClass} font-medium mb-2`}>
                Choose Your Display Name
              </label>
              <input
                type="text"
                value={userDisplayName}
                onChange={(e) => setUserDisplayName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !loading && handleLogin()}
                placeholder="Anonymous User 123"
                className={`w-full px-4 py-3 rounded-lg border ${inputClass} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                disabled={loading}
              />
              <p className={`${textSecondaryClass} text-sm mt-2`}>
                Your real identity remains encrypted and secure
              </p>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className={`w-full ${buttonClass} text-white font-semibold py-3 rounded-lg transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Connecting...
                </>
              ) : (
                'Enter Voting Platform'
              )}
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="text-center">
              <Users className={`w-8 h-8 mx-auto mb-2 ${textSecondaryClass}`} />
              <p className={`text-xs ${textSecondaryClass}`}>Anonymous</p>
            </div>
            <div className="text-center">
              <Lock className={`w-8 h-8 mx-auto mb-2 ${textSecondaryClass}`} />
              <p className={`text-xs ${textSecondaryClass}`}>Encrypted</p>
            </div>
            <div className="text-center">
              <TrendingUp className={`w-8 h-8 mx-auto mb-2 ${textSecondaryClass}`} />
              <p className={`text-xs ${textSecondaryClass}`}>Live Results</p>
            </div>
          </div>

          <div className={`mt-8 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <p className={`text-xs ${textSecondaryClass} text-center`}>
              💡 <strong>Demo Mode:</strong> Using local Laravel API at {API_BASE_URL}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Main App Screen
  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-200`}>
      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}

      {/* Header */}
      <header className={`${cardClass} border-b shadow-sm transition-colors duration-200`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center">
            <Lock className="w-8 h-8 text-blue-500 mr-2" />
            <h1 className={`text-2xl font-bold ${textClass}`}>AnonVote</h1>
          </div>
          
          <div className="flex items-center gap-3 flex-wrap">
            <span className={`${textSecondaryClass} text-sm hidden sm:block`}>
              <span className={`${textClass} font-semibold`}>{userDisplayName}</span>
            </span>
            
            <button
              onClick={() => setView(view === 'polls' ? 'create' : 'polls')}
              className={`px-4 py-2 rounded-lg ${buttonClass} text-white font-medium transition-colors text-sm`}
            >
              {view === 'polls' ? 'Create Poll' : 'View Polls'}
            </button>

            <button
              onClick={handleLogout}
              className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white font-medium transition-colors text-sm`}
            >
              Logout
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${cardClass} border transition-colors`}
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
            </button>
          </div>
        </div>
      </header>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-40">
          <div className={`${cardClass} p-6 rounded-xl shadow-xl flex items-center gap-3`}>
            <Loader className={`w-6 h-6 animate-spin ${textClass}`} />
            <span className={textClass}>Processing...</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {view === 'create' ? (
          <div className={`${cardClass} border rounded-xl shadow-lg p-6 transition-colors duration-200`}>
            <h2 className={`text-2xl font-bold ${textClass} mb-6`}>Create New Poll</h2>
            <div className="space-y-4">
              <div>
                <label className={`block ${textClass} font-medium mb-2`}>Poll Title</label>
                <input
                  type="text"
                  value={newPoll.title}
                  onChange={(e) => setNewPoll({...newPoll, title: e.target.value})}
                  placeholder="Enter poll question"
                  className={`w-full px-4 py-2 rounded-lg border ${inputClass} focus:ring-2 focus:ring-blue-500 transition-all`}
                />
              </div>

              <div>
                <label className={`block ${textClass} font-medium mb-2`}>Description</label>
                <textarea
                  value={newPoll.description}
                  onChange={(e) => setNewPoll({...newPoll, description: e.target.value})}
                  placeholder="Provide more details about this poll"
                  className={`w-full px-4 py-2 rounded-lg border ${inputClass} focus:ring-2 focus:ring-blue-500 transition-all`}
                  rows="4"
                />
              </div>

              <div>
                <label className={`block ${textClass} font-medium mb-2`}>Vote Type</label>
                <select
                  value={newPoll.vote_type}
                  onChange={(e) => setNewPoll({...newPoll, vote_type: e.target.value})}
                  className={`w-full px-4 py-2 rounded-lg border ${inputClass} focus:ring-2 focus:ring-blue-500 transition-all`}
                >
                  <option value="both">Upvote & Downvote</option>
                  <option value="upvote">Upvote Only</option>
                  <option value="downvote">Downvote Only</option>
                </select>
              </div>

              <button
                onClick={handleCreatePoll}
                disabled={loading}
                className={`w-full ${buttonClass} text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50`}
              >
                Create Poll
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className={`text-2xl font-bold ${textClass}`}>Active Polls</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => fetchPolls()}
                  className={`p-2 rounded-lg ${cardClass} border transition-colors hover:scale-105`}
                  title="Refresh polls"
                >
                  <BarChart3 className={`w-5 h-5 ${textSecondaryClass}`} />
                </button>
                <span className={`${textSecondaryClass} text-sm`}>
                  {polls.length} poll{polls.length !== 1 ? 's' : ''} active
                </span>
              </div>
            </div>

            {polls.length === 0 ? (
              <div className={`${cardClass} border rounded-xl p-12 text-center`}>
                <BarChart3 className={`w-16 h-16 mx-auto mb-4 ${textSecondaryClass}`} />
                <h3 className={`text-xl font-semibold ${textClass} mb-2`}>No polls yet</h3>
                <p className={textSecondaryClass}>Be the first to create a poll!</p>
              </div>
            ) : (
              polls.map(poll => (
                <div key={poll.id} className={`${cardClass} border rounded-xl shadow-lg p-6 transition-all duration-200 hover:shadow-xl`}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className={`text-xl font-bold ${textClass} flex-1`}>{poll.title}</h3>
                    <span className={`text-xs ${textSecondaryClass} ml-2`}>
                      by {poll.creator?.display_name || 'Unknown'}
                    </span>
                  </div>
                  
                  <p className={`${textSecondaryClass} mb-4`}>{poll.description}</p>

                  <div className="flex items-center gap-4 mb-4 flex-wrap">
                    {(poll.vote_type === 'both' || poll.vote_type === 'upvote') && (
                      <button
                        onClick={() => handleVote(poll.id, 'up')}
                        disabled={loading}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all disabled:opacity-50 ${
                          poll.user_vote === 'up'
                            ? 'bg-green-500 text-white shadow-lg scale-105'
                            : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-green-500 hover:text-white' : 'bg-gray-100 text-gray-700 hover:bg-green-500 hover:text-white'
                        }`}
                      >
                        <ThumbsUp className="w-5 h-5" />
                        <span className="font-semibold">{poll.upvotes_count}</span>
                      </button>
                    )}
                    
                    {(poll.vote_type === 'both' || poll.vote_type === 'downvote') && (
                      <button
                        onClick={() => handleVote(poll.id, 'down')}
                        disabled={loading}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all disabled:opacity-50 ${
                          poll.user_vote === 'down'
                            ? 'bg-red-500 text-white shadow-lg scale-105'
                            : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-red-500 hover:text-white' : 'bg-gray-100 text-gray-700 hover:bg-red-500 hover:text-white'
                        }`}
                      >
                        <ThumbsDown className="w-5 h-5" />
                        <span className="font-semibold">{poll.downvotes_count}</span>
                      </button>
                    )}
                    
                    <div className={`ml-auto ${textSecondaryClass} text-sm`}>
                      <Users className="w-4 h-4 inline mr-1" />
                      <span className="font-semibold">{poll.total_voters}</span> voter{poll.total_voters !== 1 ? 's' : ''}
                    </div>
                  </div>

                  {poll.vote_type === 'both' && poll.total_voters > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className={`flex-1 h-2 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                          <div 
                            className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                            style={{ width: `${getPercentage(poll.upvotes_count, poll.total_voters)}%` }}
                          />
                        </div>
                        <span className={`text-sm font-medium ${textSecondaryClass} w-12 text-right`}>
                          {getPercentage(poll.upvotes_count, poll.total_voters)}%
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className={`flex-1 h-2 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                          <div 
                            className="h-full bg-gradient-to-r from-red-400 to-red-600 transition-all duration-500"
                            style={{ width: `${getPercentage(poll.downvotes_count, poll.total_voters)}%` }}
                          />
                        </div>
                        <span className={`text-sm font-medium ${textSecondaryClass} w-12 text-right`}>
                          {getPercentage(poll.downvotes_count, poll.total_voters)}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AnonVoteIntegrated;