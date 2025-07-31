// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/PrivateRoute';

import Signup from './components/Signup';
import Login from './components/Login';
import LogoutButton from './components/LogoutButton';
import Home from './pages/Home';

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex items-center space-x-4 mb-8">
      {!isAuthenticated && (
        <>
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
        </>
      )}
      {isAuthenticated && <LogoutButton />}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-background text-text min-h-screen flex flex-col items-center justify-start p-8">
          <h1 className="text-3xl font-bold mb-6">LOGIN PORTAL</h1>

          <Navbar />

          <div className="w-full max-w-xl">
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              {/* Optional: Add a 404 route */}
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
