import React from 'react';
import { Link } from 'react-router-dom';

const ContentCard = ({ content }) => {
  return (
    <Link to={`/content/${content._id}`}>
      <div className="bg-dark-light rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer">
        <div className="aspect-[2/3] bg-gray-800 flex items-center justify-center">
          {content.poster ? (
            <img 
              src={content.poster} 
              alt={content.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-4xl">🎬</span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg truncate">{content.title}</h3>
          <p className="text-sm text-gray-400 mt-1">{content.type}</p>
          <p className="text-xs text-gray-500 mt-1">{content.year}</p>
        </div>
      </div>
    </Link>
  );
};

export default ContentCard;