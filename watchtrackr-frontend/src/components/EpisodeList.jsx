import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const EpisodeList = ({ episodes, watchedEpisodes, onEpisodeToggle }) => {
  const { user } = useContext(AuthContext);

  const isWatched = (episodeId) => {
    return watchedEpisodes.some(e => e._id === episodeId);
  };

  const handleToggle = async (episode) => {
    if (!user) {
      alert('Please login to track your progress');
      return;
    }
    onEpisodeToggle(episode._id);
  };

  return (
    <div className="space-y-3">
      {episodes.map((episode) => (
        <div
          key={episode._id}
          className="bg-dark-light p-4 rounded-lg flex items-center justify-between hover:bg-gray-800 transition"
        >
          <div className="flex-1">
            <h4 className="font-semibold">
              {episode.episodeNumber}. {episode.title}
            </h4>
            <p className="text-sm text-gray-400 mt-1">{episode.description}</p>
          </div>
          <button
            onClick={() => handleToggle(episode)}
            className={`ml-4 px-4 py-2 rounded transition ${
              isWatched(episode._id)
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {isWatched(episode._id) ? '✓ Watched' : 'Mark Watched'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default EpisodeList;