// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import GoogleLoginButton from '../components/GoogleLoginButton';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { isAuthenticated, setToken } = useAuth();
  const navigate = useNavigate();

  // ✅ Redirect if already logged in
  if (isAuthenticated) return <Navigate to="/" replace />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await API.post('/login', formData);

      const accessToken = res.data.accessToken;
      localStorage.setItem('accessToken', accessToken);
      setToken(accessToken); // ✅ Update context to trigger profile fetch
      navigate('/'); // ✅ Navigate immediately after setting token
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-text">
      <div className="w-full max-w-md border-2 border-lightAccent p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 border-lightAccent text-text rounded focus:outline-none focus:ring-2 focus:ring-lightAccent"
            />
          </div>
          <div>
            <label className="block mb-2">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 border-lightAccent text-text rounded focus:outline-none focus:ring-2 focus:ring-lightAccent"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-lightAccent px-4 py-2 mt-4 text-text rounded ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-80'
            } transition-all duration-300`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 text-center text-sm text-gray-400">OR</div>

        {/* Google OAuth Button */}
        <GoogleLoginButton />

        {errorMessage && <p className="text-error mt-4 text-center">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Login;
