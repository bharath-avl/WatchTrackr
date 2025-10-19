import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-light border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-sm">
            <p>© {currentYear} WatchTrackr. All rights reserved.</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 text-sm">Developed by</span>
            <span className="text-primary font-semibold text-sm">
              Bharath Reddy
            </span>
          </div>

          <div className="flex items-center space-x-4 text-gray-400 text-sm">
            <a 
              href="https://github.com/bharath-avl" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition"
            >
              GitHub
            </a>
            <span>•</span>
            <a 
              href="www.linkedin.com/in/bharath-kumar-reddy040" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;