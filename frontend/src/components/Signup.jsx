import React, { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    otp: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await API.post('/send-otp', { email: formData.email });
      setMessage('OTP sent to your email');
      setStep(2);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await API.post('/verify-signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        otp: formData.otp,
      });
      setMessage('Signup successful! Redirecting...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 text-base-content px-4">
      <div className="w-full max-w-md bg-base-100 border border-base-300 p-8 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

        {step === 1 && (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <Input
              label="Name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
            />
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
            <Button
              type="submit"
              text={loading ? 'Sending OTP...' : 'Send OTP'}
              variant="primary"
              className="w-full"
              disabled={loading}
            />
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyAndSignup} className="space-y-4">
            <Input
              label="Enter OTP"
              name="otp"
              type="text"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              autoComplete="one-time-code"
            />
            <Button
              type="submit"
              text={loading ? 'Verifying & Signing up...' : 'Verify OTP & Signup'}
              variant="primary"
              className="w-full"
              disabled={loading}
            />
          </form>
        )}

        {message && (
          <p className="mt-4 text-center text-sm text-accent">{message}</p>
        )}

        <p className="mt-6 text-sm text-center">
          Already have an account?{' '}
          <a href="/login" className="text-primary font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
