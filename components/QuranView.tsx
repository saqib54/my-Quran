import React, { useState } from 'react';
import SurahList from './SurahList';
import SurahDetail from './SurahDetail';

const QuranView: React.FC = () => {
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number | null>(null);

  const handleSelectSurah = (surahNumber: number) => {
    setSelectedSurahNumber(surahNumber);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setSelectedSurahNumber(null);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {selectedSurahNumber ? (
        <SurahDetail surahNumber={selectedSurahNumber} onBack={handleBack} />
      ) : (
        <SurahList onSelectSurah={handleSelectSurah} />
      )}
    </>
  );
};

export default QuranView;
