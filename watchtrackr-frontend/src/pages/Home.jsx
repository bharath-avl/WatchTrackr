import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ContentCard from '../components/ContentCard';

const Home = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchContent();
  }, [filter]);

  const fetchContent = async () => {
    try {
      const response = await api.get(`/content${filter !== 'all' ? `?type=${filter}` : ''}`);
      setContent(response.data);
    } catch (error) {
      console.error('Error fetching content:', error);
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
        <h1 className="text-4xl font-bold mb-4">Browse Content</h1>
        <div className="flex space-x-4">
          {['all', 'TV Show', 'Movie', 'Anime', 'Web Series'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg transition ${
                filter === type
                  ? 'bg-primary text-white'
                  : 'bg-dark-light text-gray-400 hover:bg-gray-800'
              }`}
            >
              {type === 'all' ? 'All' : type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {content.map((item) => (
          <ContentCard key={item._id} content={item} />
        ))}
      </div>

      {content.length === 0 && (
        <div className="text-center text-gray-400 py-12">
          No content found. Check back later!
        </div>
      )}
    </div>
  );
};

export default Home;