import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900/20 py-4 mt-8">
      <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} My Quran. All Rights Reserved.</p>
        <p className="mt-1">Quran data provided by <a href="https://alquran.cloud" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:underline">alquran.cloud API</a>.</p>
      </div>
    </footer>
  );
};

export default Footer;
