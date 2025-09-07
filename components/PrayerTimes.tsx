import React, { useState, useEffect } from 'react';
import { PrayerTimingsData, PrayerTimes as PrayerTimesType } from '../types';
import { getPrayerTimes } from '../services/prayerTimeService';
import Loader from './Loader';

const PrayerTimes: React.FC = () => {
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimingsData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [location, setLocation] = useState<GeolocationCoordinates | null>(null);

    const handleRequestLocation = () => {
        setLoading(true);
        setError(null);

        if (!("geolocation" in navigator)) {
            setError("Geolocation is not supported by your browser.");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation(position.coords);
            },
            (err) => {
                 let errorMessage = "Unable to retrieve location. ";
                switch(err.code) {
                    case err.PERMISSION_DENIED:
                        errorMessage += "Permission was denied. Please check your browser settings.";
                        break;
                    case err.POSITION_UNAVAILABLE:
                        errorMessage += "Location information is unavailable.";
                        break;
                    case err.TIMEOUT:
                        errorMessage += "The request to get user location timed out.";
                        break;
                    default:
                        errorMessage += "An unknown error occurred.";
                        break;
                }
                setError(errorMessage);
                setLoading(false);
            }
        );
    };

    useEffect(() => {
        if (location) {
            const fetchTimes = async () => {
                try {
                    setLoading(true);
                    const data = await getPrayerTimes(location.latitude, location.longitude);
                    setPrayerTimes(data);
                    setError(null);
                } catch (err) {
                    setError("Failed to load prayer times. Please try again later.");
                } finally {
                    setLoading(false);
                }
            };
            fetchTimes();
        }
    }, [location]);

    const prayerOrder: (keyof PrayerTimesType)[] = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

    return (
        <div className="bg-slate-800/40 border border-slate-700 rounded-lg shadow-xl p-4 md:p-8">
            <h2 className="text-3xl font-bold text-center text-yellow-400 mb-2">Prayer Times</h2>

            {loading && <Loader />}
            
            {error && <div className="text-center text-red-400 py-4 my-4 bg-red-900/20 rounded-md">{error}</div>}
            
            {!prayerTimes && !loading && (
                 <div className="text-center space-y-4 my-8">
                     <p className="text-gray-300">
                         Get accurate prayer times based on your current location.
                     </p>
                     <button 
                         onClick={handleRequestLocation}
                         className="bg-yellow-500 text-slate-900 font-bold py-2 px-6 rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50"
                         disabled={loading}
                     >
                        Get Times for My Location
                     </button>
                 </div>
            )}

            {prayerTimes && (
                <>
                    <div className="mt-6 text-center">
                        <p className="text-lg text-gray-300">{prayerTimes.date.readable}</p>
                        <p className="text-sm text-gray-400">{`${prayerTimes.date.hijri.day} ${prayerTimes.date.hijri.month.en}, ${prayerTimes.date.hijri.year} AH`}</p>
                    </div>
                    <div className="mt-6 space-y-3">
                        {prayerOrder.map((prayer) => (
                            <div key={prayer} className="flex justify-between items-center bg-slate-700/50 p-4 rounded-lg">
                                <span className="text-lg font-semibold text-gray-200">{prayer}</span>
                                <span className="text-2xl font-bold text-yellow-300 tracking-wider">{prayerTimes.timings[prayer]}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default PrayerTimes;