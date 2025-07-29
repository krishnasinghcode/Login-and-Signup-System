import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import LogoutButton from './components/LogoutButton';
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <div className="bg-background text-text min-h-screen flex flex-col items-center justify-start p-8">
        <h1 className="text-3xl font-bold mb-6">LOGIN PORTAL</h1>

        {/* Navigation */}
        <div className="flex items-center space-x-4 mb-8">
          <Link to="/signup">
            <button className="bg-accent text-lightText px-4 py-2 rounded hover:bg-opacity-80 transition-all duration-300">
              Signup
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-accent text-lightText px-4 py-2 rounded hover:bg-opacity-80 transition-all duration-300">
              Login
            </button>
          </Link>
          <LogoutButton />
        </div>

        {/* Routes */}
        <div className="w-full max-w-xl">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
