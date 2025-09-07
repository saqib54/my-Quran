import React, { useState, useEffect, useMemo } from 'react';
import { SurahSimple } from '../types';
import { getAllSurahs } from '../services/quranService';
import Loader from './Loader';

interface SurahListProps {
  onSelectSurah: (surahNumber: number) => void;
}

const SurahCard: React.FC<{ surah: SurahSimple; onSelect: () => void }> = ({ surah, onSelect }) => (
  <div
    onClick={onSelect}
    className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex items-center justify-between cursor-pointer transition-all duration-300 hover:bg-slate-700/70 hover:border-yellow-500/50 hover:scale-105 transform"
  >
    <div className="flex items-center space-x-4">
      <div className="flex-shrink-0 w-12 h-12 bg-slate-700/50 rounded-full flex items-center justify-center text-yellow-400 font-bold text-lg">
        {surah.number}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-100">{surah.englishName}</h3>
        <p className="text-sm text-gray-400">{surah.englishNameTranslation}</p>
      </div>
    </div>
    <div className="text-right">
      <h3 className="text-xl font-amiri text-yellow-300">{surah.name}</h3>
      <p className="text-xs text-gray-500 uppercase">{surah.revelationType} &bull; {surah.numberOfAyahs} Ayahs</p>
    </div>
  </div>
);


const SurahList: React.FC<SurahListProps> = ({ onSelectSurah }) => {
  const [surahs, setSurahs] = useState<SurahSimple[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        setLoading(true);
        const data = await getAllSurahs();
        setSurahs(data);
        setError(null);
      } catch (err) {
        setError('Failed to load Surahs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSurahs();
  }, []);
  
  const filteredSurahs = useMemo(() => 
    surahs.filter(surah => 
      surah.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surah.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surah.number.toString().includes(searchTerm)
    ), [surahs, searchTerm]);

  if (loading) return <Loader />;
  if (error) return <div className="text-center text-red-400 py-10">{error}</div>;

  return (
    <div className="space-y-6">
       <div className="mb-8 sticky top-[80px] z-10 bg-slate-900/80 backdrop-blur-md p-4 -mx-4 rounded-b-lg shadow-lg">
        <input
          type="text"
          placeholder="Search Surah by name or number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-4 text-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSurahs.map(surah => (
          <SurahCard key={surah.number} surah={surah} onSelect={() => onSelectSurah(surah.number)} />
        ))}
      </div>
    </div>
  );
};

export default SurahList;
