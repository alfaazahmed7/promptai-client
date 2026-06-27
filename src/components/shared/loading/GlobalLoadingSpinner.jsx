// src/app/loading.jsx (or your specific path)
import React from 'react';

const GlobalLoadingSpinner = () => {
    return (
        <div className="bg-[#0b0f19] min-h-screen w-full flex flex-col items-center justify-center antialiased">
            <div className="relative flex flex-col items-center justify-center">

                {/* Outer Glow/Ring */}
                <div className="absolute w-20 h-20 rounded-full border-4 border-blue-500/10 border-t-blue-500 animate-spin [animation-duration:1.5s]"></div>

                {/* Inner Reverse Ring */}
                <div className="w-14 h-14 rounded-full border-4 border-indigo-500/10 border-b-indigo-400 animate-spin [animation-direction:reverse] [animation-duration:1s]"></div>

                {/* Central Decorative Soft Glow */}
                <div className="absolute w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
            </div>

            {/* Subtle Brand Loading Text */}
            <div className="mt-6 text-center space-y-1">
                <p className="text-sm font-medium tracking-wider text-slate-400 uppercase animate-pulse [animation-duration:2s]">
                    Loading promptAI
                </p>
                <div className="h-0.5 w-12 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full overflow-hidden">
                    <div className="w-full h-full bg-white/40 -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
                </div>
            </div>
        </div>
    );
};

export default GlobalLoadingSpinner;