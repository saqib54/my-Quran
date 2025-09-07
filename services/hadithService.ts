import { Hadith } from '../types';

const HADITH_API_BASE = 'https://random-hadith-generator.vercel.app';

export const getRandomHadith = async (collection: string = 'bukhari'): Promise<Hadith> => {
    try {
        const response = await fetch(`${HADITH_API_BASE}/${collection}/`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const jsonResponse = await response.json();
        const apiData = jsonResponse.data;

        if (!apiData) {
            throw new Error("Hadith data not found in API response");
        }

        // Map the API response (snake_case) to our internal Hadith type (camelCase)
        const hadith: Hadith = {
            hadithNumber: apiData.hadith_number,
            englishNarrator: apiData.english_narrator,
            hadithEnglish: apiData.hadith_english,
            chapter: {
                chapterEnglish: apiData.chapter.chapter_english,
            },
            book: {
                bookName: apiData.book.book_name,
            },
            url: apiData.hadith_url,
        };
        
        return hadith;
    } catch (error) {
        console.error("Failed to fetch random hadith:", error);
        throw error;
    }
}