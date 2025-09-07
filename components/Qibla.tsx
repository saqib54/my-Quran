import React, { useState, useEffect, useCallback } from 'react';
import { getQiblaDirection } from '../services/prayerTimeService';
import Loader from './Loader';

const Qibla: React.FC = () => {
    const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
    const [heading, setHeading] = useState<number | null>(0);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<string | null>(null);
    const [permissionGranted, setPermissionGranted] = useState(false);

    const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
        const alpha = event.alpha;
        if (alpha !== null) {
            // webkitCompassHeading is for iOS
            const compassHeading = (event as any).webkitCompassHeading || (360 - alpha);
            setHeading(compassHeading);
        }
    }, []);
    
    const requestPermissions = async () => {
        setLoading("Requesting permissions...");
        setError(null);

        if (!window.isSecureContext) {
            setError("This feature requires a secure connection (HTTPS).");
            setLoading(null);
            return;
        }

        // Request device orientation permission
        if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
            try {
                const permissionState = await (DeviceOrientationEvent as any).requestPermission();
                if (permissionState === 'granted') {
                    window.addEventListener('deviceorientation', handleOrientation);
                } else {
                    setError("Device orientation permission denied.");
                    setLoading(null);
                    return;
                }
            } catch (err) {
                 setError("Error requesting device orientation permission.");
                 setLoading(null);
                 return;
            }
        } else {
            // For browsers that don't require explicit permission
            window.addEventListener('deviceorientation', handleOrientation);
        }

        // Request location permission
        setLoading("Fetching location...");
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    setLoading("Calculating Qibla direction...");
                    try {
                        const direction = await getQiblaDirection(position.coords.latitude, position.coords.longitude);
                        setQiblaDirection(direction);
                        setError(null);
                        setPermissionGranted(true);
                    } catch (err) {
                        setError("Could not calculate Qibla direction.");
                    } finally {
                        setLoading(null);
                    }
                },
                (err) => {
                    setError("Unable to retrieve location. Please grant permission.");
                    setLoading(null);
                }
            );
        } else {
            setError("Geolocation is not supported.");
            setLoading(null);
        }
    };

    useEffect(() => {
        return () => {
            window.removeEventListener('deviceorientation', handleOrientation);
        };
    }, [handleOrientation]);

    const relativeRotation = qiblaDirection !== null && heading !== null ? qiblaDirection - heading : 0;
    
    return (
        <div className="bg-slate-800/40 border border-slate-700 rounded-lg shadow-xl p-4 md:p-8 flex flex-col items-center space-y-6">
            <h2 className="text-3xl font-bold text-center text-yellow-400">Qibla Direction</h2>
            
            {!permissionGranted ? (
                <div className="text-center space-y-4">
                     <p className="text-gray-300">
                        To find the Qibla direction, we need access to your device's location and orientation sensors. Your data is not stored.
                    </p>
                    <button 
                        onClick={requestPermissions}
                        className="bg-yellow-500 text-slate-900 font-bold py-2 px-6 rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50"
                        disabled={!!loading}
                    >
                       {loading ? loading : 'Find Qibla'}
                    </button>
                    {error && <p className="text-red-400 mt-4">{error}</p>}
                </div>
            ) : (
                <>
                    {loading && <Loader />}
                    {error && <div className="text-center text-red-400 py-4">{error}</div>}
                    {qiblaDirection !== null && (
                         <div className="relative w-64 h-64" aria-label="Qibla compass">
                            <div 
                                className="w-full h-full bg-slate-700/50 rounded-full border-4 border-slate-600 flex items-center justify-center text-gray-400"
                                style={{
                                    transform: `rotate(${-heading!}deg)`, // Rotate compass background
                                }}
                            >
                                <span className="absolute top-2 text-xl font-bold text-yellow-400">N</span>
                                <span className="absolute bottom-2 text-lg font-bold">S</span>
                                <span className="absolute left-4 text-lg font-bold">W</span>
                                <span className="absolute right-4 text-lg font-bold">E</span>
                            </div>
                            <div
                                className="absolute top-0 left-0 w-full h-full flex justify-center"
                                style={{ transform: `rotate(${relativeRotation}deg)` }}
                                role="img"
                                aria-label={`Qibla direction arrow, currently pointing ${Math.round(relativeRotation)} degrees relative to your device's top`}
                            >
                                <div className="w-4 h-32 bg-yellow-400 rounded-t-full" style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%)', transform: 'translateY(-16px)' }}></div>
                            </div>
                         </div>
                    )}
                    <p className="text-lg text-gray-200 text-center">
                        Align the top of your device with the yellow arrow.
                    </p>
                </>
            )}
        </div>
    );
};

export default Qibla;