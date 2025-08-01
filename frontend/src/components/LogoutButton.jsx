import React from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await API.post('/logout');
      logout();
      // Ensure state updates propagate before navigating
      Promise.resolve().then(() => {
        navigate('/login', { replace: true });
      });
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
