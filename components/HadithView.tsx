import React, { useState, useEffect, useCallback } from 'react';
import { Hadith } from '../types';
import { getRandomHadith } from '../services/hadithService';
import Loader from './Loader';

const HadithView: React.FC = () => {
    const [hadith, setHadith] = useState<Hadith | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchHadith = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getRandomHadith('bukhari'); // Can be changed to other collections
            setHadith(data);
            setError(null);
        } catch (err) {
            setError("Failed to load Hadith. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchHadith();
    }, [fetchHadith]);

    return (
         <div className="bg-slate-800/40 border border-slate-700 rounded-lg shadow-xl p-4 md:p-8 space-y-6">
             <h2 className="text-3xl font-bold text-center text-yellow-400">Hadith of the Day</h2>
            
            {loading && <Loader />}
            {error && <div className="text-center text-red-400 py-10">{error}</div>}
            
            {hadith && (
                <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700">
                    <blockquote className="space-y-4">
                        <p className="text-lg md:text-xl text-gray-200 leading-relaxed italic">
                           "{hadith.hadithEnglish}"
                        </p>
                        <footer className="text-right text-yellow-400">
                           — {hadith.englishNarrator}, <cite className="not-italic text-gray-400">{hadith.book.bookName}, Chapter {hadith.chapter.chapterEnglish}</cite>
                            {hadith.url && (
                                <a href={hadith.url} target="_blank" rel="noopener noreferrer" className="block text-xs text-yellow-500 hover:underline mt-2">
                                    View on Sunnah.com
                                </a>
                            )}
                        </footer>
                    </blockquote>
                </div>
            )}
             <div className="text-center">
                <button 
                    onClick={fetchHadith}
                    className="bg-slate-700 text-yellow-300 font-semibold py-2 px-5 rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-50"
                    disabled={loading}
                >
                    Get Another Hadith
                </button>
            </div>
        </div>
    );
};

export default HadithView;