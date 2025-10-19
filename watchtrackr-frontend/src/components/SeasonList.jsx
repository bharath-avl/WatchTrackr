import React from 'react';

const SeasonList = ({ seasons, selectedSeason, onSelectSeason }) => {
  return (
    <div className="flex space-x-2 overflow-x-auto pb-2">
      {seasons.map((season) => (
        <button
          key={season._id}
          onClick={() => onSelectSeason(season)}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
            selectedSeason?._id === season._id
              ? 'bg-primary text-white'
              : 'bg-dark-light text-gray-400 hover:bg-gray-800'
          }`}
        >
          Season {season.seasonNumber}
        </button>
      ))}
    </div>
  );
};

export default SeasonList;