import { SurahSimple, SurahEdition, SurahFullData, CombinedAyah } from '../types';

const BASE_URL = 'https://api.alquran.cloud/v1';

export const getAllSurahs = async (): Promise<SurahSimple[]> => {
  try {
    const response = await fetch(`${BASE_URL}/surah`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (data.code !== 200) {
      throw new Error(data.status);
    }
    return data.data;
  } catch (error) {
    console.error("Failed to fetch all Surahs:", error);
    throw error;
  }
};

export const getSurah = async (surahNumber: number): Promise<SurahFullData> => {
  try {
    const response = await fetch(`${BASE_URL}/surah/${surahNumber}/editions/quran-uthmani,en.asad`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
     if (data.code !== 200) {
      throw new Error(data.status);
    }

    const editions: SurahEdition[] = data.data;
    const arabicEdition = editions.find(e => e.ayahs[0]?.text.charCodeAt(0) > 1500); // Simple check for arabic script
    const englishEdition = editions.find(e => e.ayahs[0]?.text.charCodeAt(0) < 1500);

    if (!arabicEdition || !englishEdition) {
      throw new Error('Could not find both Arabic and English editions.');
    }

    const combinedAyahs: CombinedAyah[] = arabicEdition.ayahs.map((ayah, index) => ({
      number: ayah.number,
      numberInSurah: ayah.numberInSurah,
      arabicText: ayah.text,
      englishText: englishEdition.ayahs[index]?.text || 'Translation not available.',
    }));

    return {
      number: arabicEdition.number,
      name: arabicEdition.name,
      englishName: arabicEdition.englishName,
      englishNameTranslation: arabicEdition.englishNameTranslation,
      revelationType: arabicEdition.revelationType,
      numberOfAyahs: arabicEdition.numberOfAyahs,
      ayahs: combinedAyahs,
    };

  } catch (error) {
    console.error(`Failed to fetch Surah ${surahNumber}:`, error);
    throw error;
  }
};
