export interface SurahSimple {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: 'Meccan' | 'Medinan';
  numberOfAyahs: number;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

export interface SurahEdition {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: 'Meccan' | 'Medinan';
  numberOfAyahs: number;
  ayahs: Ayah[];
}

export interface CombinedAyah {
  number: number;
  numberInSurah: number;
  arabicText: string;
  englishText: string;
}

export interface SurahFullData {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: 'Meccan' | 'Medinan';
  numberOfAyahs: number;
  ayahs: CombinedAyah[];
}

export interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Sunrise: string;
}

export interface PrayerTimingsData {
  timings: PrayerTimes;
  date: {
    readable: string;
    hijri: {
      date: string;
      day: string;
      month: {
        en: string;
      };
      year: string;
    }
  }
}

export interface Hadith {
  hadithNumber: string;
  englishNarrator: string;
  hadithEnglish: string;
  chapter: {
    chapterEnglish: string;
  };
  book: {
    bookName: string;
  };
  url: string;
}