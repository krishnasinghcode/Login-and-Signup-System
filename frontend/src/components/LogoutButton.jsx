// src/components/LogoutButton.jsx
import React from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.post('/logout');
      localStorage.removeItem('accessToken');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-error text-white rounded hover:bg-error transition"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
