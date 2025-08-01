// src/pages/Home.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import LogoutButton from '../components/LogoutButton';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen p-6 bg-background text-text">
      <h2 className="text-xl font-semibold mb-4">Welcome to the Dashboard</h2>
      <div className="space-y-2">
        <p><strong>Name:</strong> {user.name || 'N/A'}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Account Verified:</strong> {user.isAccountVerified ? 'Yes' : 'No'}</p>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Home;
