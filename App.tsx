import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import QuranView from './components/QuranView';
import PrayerTimes from './components/PrayerTimes';
import Qibla from './components/Qibla';
import HadithView from './components/HadithView';

export type View = 'quran' | 'prayer' | 'qibla' | 'hadith';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('quran');

  const renderView = () => {
    switch (activeView) {
      case 'quran':
        return <QuranView />;
      case 'prayer':
        return <PrayerTimes />;
      case 'qibla':
        return <Qibla />;
      case 'hadith':
        return <HadithView />;
      default:
        return <QuranView />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex flex-col">
      <Header activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderView()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
