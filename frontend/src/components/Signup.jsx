import React, { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', otp: '' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
                otp: formData.otp
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
        <div className="flex items-center justify-center min-h-screen bg-background text-text">
            <div className="w-full max-w-md border-2 border-lightAccent p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

                {step === 1 && (
                    <form onSubmit={handleSendOTP} className="space-y-4">
                        <div>
                            <label className="block mb-2">Name:</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required
                                className="w-full px-4 py-2 border-2 border-lightAccent rounded" />
                        </div>
                        <div>
                            <label className="block mb-2">Email:</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required
                                className="w-full px-4 py-2 border-2 border-lightAccent rounded" />
                        </div>
                        <div>
                            <label className="block mb-2">Password:</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} required
                                className="w-full px-4 py-2 border-2 border-lightAccent rounded" />
                        </div>
                        <button type="submit" disabled={loading}
                            className="w-full bg-Accent px-4 py-2 text-primary rounded">
                            {loading ? 'Sending OTP...' : 'Send OTP'}
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleVerifyAndSignup} className="space-y-4">
                        <div>
                            <label className="block mb-2">Enter OTP:</label>
                            <input type="text" name="otp" value={formData.otp} onChange={handleChange} required
                                className="w-full px-4 py-2 border-2 border-lightAccent rounded" />
                        </div>
                        <button type="submit" disabled={loading}
                            className="w-full bg-accent px-4 py-2 text-primary rounded">
                            {loading ? 'Verifying & Signing up...' : 'Verify OTP & Signup'}
                        </button>
                    </form>
                )}

                {message && (
                    <p className="mt-4 text-center text-sm text-accent">{message}</p>
                )}
            </div>
        </div>
    );
};

export default Signup;
