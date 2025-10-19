import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const response = await api.get('/progress');
      setProgress(response.data);
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">My Progress</h1>
        <p className="text-gray-400">Welcome back, {user?.name}!</p>
      </div>

      {progress.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-xl mb-4">No progress tracked yet</p>
          <Link to="/" className="text-primary hover:underline">
            Start watching something!
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {progress.map((item) => (
            <Link
              key={item.content._id}
              to={`/content/${item.content._id}`}
              className="block bg-dark-light p-6 rounded-lg hover:bg-gray-800 transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{item.content.title}</h3>
                  <p className="text-gray-400 mt-1">
                    {item.watchedCount} episode{item.watchedCount !== 1 ? 's' : ''} watched
                  </p>
                </div>
                <div className="text-primary text-sm">Continue →</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
