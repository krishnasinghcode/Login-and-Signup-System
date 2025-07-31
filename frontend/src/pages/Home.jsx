// src/pages/Home.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-text p-6">
        <p>Loading user data...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background text-text p-6">
        <p>User not found or not authenticated.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
      <div>
        <p><strong>Name:</strong> {user.name || 'N/A'}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Account Verified:</strong> {user.isAccountVerified ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
};

export default Home;
