import React, { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const res = await API.post('/signup', formData);
            setSuccessMessage('Signup successful! Please log in.');
            setFormData({ name: '', email: '', password: '' });
            navigate('/login');
        } catch (err) {
            const msg = err.response?.data?.message || 'Signup failed. Please try again.';
            setErrorMessage(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center bg-background text-text">
            <div className="w-full max-w-md border-2 border-lightAccent p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border-2 border-lightAccent text-text rounded focus:outline-none focus:ring-2 focus:ring-lightAccent"
                        />
                    </div>
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
                        className={`w-full bg-accent px-4 py-2 mt-4 bg-lightAccent text-text rounded ${
                            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-80'
                        } transition-all duration-300`}
                    >
                        {loading ? 'Signing up...' : 'Signup'}
                    </button>
                </form>
                {errorMessage && <p className="text-error mt-4 text-center">{errorMessage}</p>}
                {successMessage && <p className="text-accent mt-4 text-center">{successMessage}</p>}
            </div>
        </div>
    );
};

export default Signup;
