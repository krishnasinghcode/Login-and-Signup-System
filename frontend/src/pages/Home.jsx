import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get('/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-background text-text p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.name || 'N/A'}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Home;
