import React, { useState, useEffect } from 'react';
import { SurahFullData } from '../types';
import { getSurah } from '../services/quranService';
import Loader from './Loader';

interface SurahDetailProps {
  surahNumber: number;
  onBack: () => void;
}

const BackArrowIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const SurahDetail: React.FC<SurahDetailProps> = ({ surahNumber, onBack }) => {
  const [surah, setSurah] = useState<SurahFullData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurah = async () => {
      try {
        setLoading(true);
        const data = await getSurah(surahNumber);
        setSurah(data);
        setError(null);
      } catch (err) {
        setError('Failed to load Surah details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSurah();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surahNumber]);

  if (loading) return <Loader />;
  if (error) return <div className="text-center text-red-400 py-10">{error}</div>;
  if (!surah) return null;

  const isBismillahShown = surah.number !== 1 && surah.number !== 9;

  return (
    <div className="bg-slate-800/40 border border-slate-700 rounded-lg shadow-xl">
      <div className="sticky top-[80px] z-20 bg-slate-800/80 backdrop-blur-md p-4 rounded-t-lg border-b border-slate-700 flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors"
        >
         <BackArrowIcon />
          <span>All Surahs</span>
        </button>
        <div className="text-right">
            <h2 className="text-2xl font-bold text-gray-100">{surah.englishName}</h2>
            <p className="text-sm text-gray-400">{surah.englishNameTranslation}</p>
        </div>
      </div>
      
      <div className="p-4 md:p-8 space-y-8">
        {isBismillahShown && (
            <div className="text-center py-6 border-b border-slate-700">
                <p className="font-amiri text-3xl text-yellow-300" dir="rtl">
                    بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                </p>
                <p className="text-gray-400 mt-2">In the name of Allah, the Entirely Merciful, the Especially Merciful.</p>
            </div>
        )}

        {surah.ayahs.map((ayah) => (
          <div key={ayah.number} className="py-4 border-b border-slate-700 last:border-b-0">
             <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold bg-yellow-400 text-slate-900 rounded-full px-3 py-1">
                    {surah.number}:{ayah.numberInSurah}
                </span>
            </div>
            <p className="font-amiri text-3xl md:text-4xl text-right leading-relaxed text-gray-100 mb-4" dir="rtl">
              {ayah.arabicText}
            </p>
            <p className="text-gray-300 leading-relaxed text-left">
              {ayah.englishText}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurahDetail;
