// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import GoogleLoginButton from '../components/GoogleLoginButton';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { isAuthenticated, setToken } = useAuth();
  const navigate = useNavigate();

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
      setToken(accessToken);
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 text-base-content px-4">
      <div className="w-full max-w-md bg-base-100 border border-base-300 p-8 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            name="email"
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
          />
          <Input
            type="password"
            name="password"
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
          />

          <Button
            type="submit"
            text={loading ? 'Logging in...' : 'Login'}
            variant="primary"
            className="w-full"
            disabled={loading}
          />
        </form>

        <div className="divider">OR</div>

        <GoogleLoginButton />
        <p className="mt-6 text-sm text-center">
          Don’t have an account?{' '}
          <a href="/signup" className="text-primary font-medium hover:underline">
            Sign up
          </a>
        </p>


        {errorMessage && (
          <p className="text-error mt-4 text-center text-sm">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
