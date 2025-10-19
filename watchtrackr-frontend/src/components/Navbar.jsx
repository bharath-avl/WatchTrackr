import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LoginButton from './LoginButton';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-dark-light border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">WatchTrackr</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-300 hover:text-white transition">
              Browse
            </Link>
            {user ? (
              <>
                <Link to="/profile" className="text-gray-300 hover:text-white transition">
                  My Progress
                </Link>
                <button
                  onClick={logout}
                  className="bg-primary px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <LoginButton />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;