import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import SeasonList from '../components/SeasonList';
import EpisodeList from '../components/EpisodeList';

const ContentDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [watchedEpisodes, setWatchedEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContentDetails();
  }, [id]);

  useEffect(() => {
    if (selectedSeason) {
      fetchEpisodes(selectedSeason._id);
    }
  }, [selectedSeason]);

  const fetchContentDetails = async () => {
    try {
      const [contentRes, seasonsRes, progressRes] = await Promise.all([
        api.get(`/content/${id}`),
        api.get(`/content/${id}/seasons`),
        user ? api.get(`/progress/${id}`) : Promise.resolve({ data: [] })
      ]);
      
      setContent(contentRes.data);
      setSeasons(seasonsRes.data);
      setWatchedEpisodes(progressRes.data);
      
      if (seasonsRes.data.length > 0) {
        setSelectedSeason(seasonsRes.data[0]);
      }
    } catch (error) {
      console.error('Error fetching content details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEpisodes = async (seasonId) => {
    try {
      const response = await api.get(`/seasons/${seasonId}/episodes`);
      setEpisodes(response.data);
    } catch (error) {
      console.error('Error fetching episodes:', error);
    }
  };

  const handleEpisodeToggle = async (episodeId) => {
    try {
      await api.post('/progress/toggle', { episodeId });
      
      setWatchedEpisodes(prev => {
        const exists = prev.some(e => e._id === episodeId);
        if (exists) {
          return prev.filter(e => e._id !== episodeId);
        } else {
          return [...prev, { _id: episodeId }];
        }
      });
    } catch (error) {
      console.error('Error toggling episode:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
      </div>
    );
  }

  if (!content) {
    return <div className="text-center py-12">Content not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div className="aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden">
          {content.poster ? (
            <img src={content.poster} alt={content.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">🎬</div>
          )}
        </div>
        
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-2">{content.title}</h1>
          <div className="flex items-center space-x-4 text-gray-400 mb-4">
            <span className="bg-dark-light px-3 py-1 rounded">{content.type}</span>
            <span>{content.year}</span>
            {content.genre && <span>{content.genre}</span>}
          </div>
          <p className="text-gray-300 leading-relaxed">{content.description}</p>
        </div>
      </div>

      {seasons.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Seasons</h2>
          <SeasonList
            seasons={seasons}
            selectedSeason={selectedSeason}
            onSelectSeason={setSelectedSeason}
          />

          {episodes.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">
                Season {selectedSeason.seasonNumber} Episodes
              </h3>
              <EpisodeList
                episodes={episodes}
                watchedEpisodes={watchedEpisodes}
                onEpisodeToggle={handleEpisodeToggle}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentDetail;