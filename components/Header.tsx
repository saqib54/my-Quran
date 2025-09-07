import React from 'react';
import { View } from '../App';

interface HeaderProps {
    activeView: View;
    setActiveView: (view: View) => void;
}

const NavButton: React.FC<{
    label: string;
    view: View;
    activeView: View;
    onClick: (view: View) => void;
    children: React.ReactNode;
}> = ({ label, view, activeView, onClick, children }) => (
    <button
        onClick={() => onClick(view)}
        className={`flex flex-col items-center space-y-1 transition-colors duration-200 ${activeView === view ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-300'}`}
        aria-label={`Go to ${label} section`}
        aria-current={activeView === view ? 'page' : undefined}
    >
        {children}
        <span className="text-xs font-medium">{label}</span>
        <div className={`w-full h-0.5 mt-1 ${activeView === view ? 'bg-yellow-400' : 'bg-transparent'}`} />
    </button>
);


const Header: React.FC<HeaderProps> = ({ activeView, setActiveView }) => {
    return (
        <header className="bg-slate-900/70 backdrop-blur-sm shadow-lg shadow-black/10 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3">
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl font-bold text-center text-yellow-400 font-amiri tracking-wider">
                        My Quran
                    </h1>
                    <p className="text-center text-gray-400 text-sm mb-4">Your guide to divine revelation</p>
                </div>
                <nav className="flex justify-around items-center border-t border-slate-700/50 pt-3">
                    <NavButton label="Quran" view="quran" activeView={activeView} onClick={setActiveView}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm14 0a2 2 0 00-2-2h-2a2 2 0 00-2 2v12a2 2 0 002 2h2a2 2 0 002-2V6z" /></svg>
                    </NavButton>
                    <NavButton label="Prayer" view="prayer" activeView={activeView} onClick={setActiveView}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </NavButton>
                    <NavButton label="Qibla" view="qibla" activeView={activeView} onClick={setActiveView}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1V10a1 1 0 00-1-1H7a1 1 0 00-1 1v10a1 1 0 001 1h2a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h2a1 1 0 001-1z" /></svg>
                    </NavButton>
                    <NavButton label="Hadith" view="hadith" activeView={activeView} onClick={setActiveView}>
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                    </NavButton>
                </nav>
            </div>
        </header>
    );
};

export default Header;