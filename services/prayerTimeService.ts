import { PrayerTimingsData } from '../types';

const PRAYER_API_BASE = 'https://api.aladhan.com/v1';

export const getPrayerTimes = async (latitude: number, longitude: number): Promise<PrayerTimingsData> => {
  const date = new Date();
  // Using calculation method 2 (ISNA)
  try {
    const response = await fetch(`${PRAYER_API_BASE}/timings?latitude=${latitude}&longitude=${longitude}&method=2`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (data.code !== 200) {
      throw new Error(data.status);
    }
    return data.data;
  } catch (error) {
    console.error("Failed to fetch prayer times:", error);
    throw error;
  }
};

export const getQiblaDirection = async (latitude: number, longitude: number): Promise<number> => {
    try {
        const response = await fetch(`${PRAYER_API_BASE}/qibla/${latitude}/${longitude}`);
        if(!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if(data.code !== 200) {
            throw new Error(data.status);
        }
        return data.data.direction;
    } catch (error) {
        console.error("Failed to fetch Qibla direction:", error);
        throw error;
    }
}
