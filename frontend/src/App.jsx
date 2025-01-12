import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';

const App = () => {
  return (
    <Router>
      <div className="bg-background text-text flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold my-6">LOGIN PORTAL</h1>

        {/* Navigation Buttons */}
        <div className="mb-8">
          <Link to="/signup">
            <button className="bg-accent text-lightText px-4 py-2 rounded hover:bg-opacity-80 transition-all duration-300 mr-4">
            Signup
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-accent text-lightText px-4 py-2 rounded hover:bg-opacity-80 transition-all duration-300">
            Login
            </button>
          </Link>
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
