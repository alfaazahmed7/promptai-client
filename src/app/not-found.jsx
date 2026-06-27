'use client';
import React from 'react';
import Link from 'next/link';
import { FiHome, FiGrid, FiArrowLeft, FiActivity } from 'react-icons/fi';
import { TbBrain } from 'react-icons/tb';

const NotFoundPage = () => {
    return (
        <div className="bg-[#0B1220] min-h-screen w-full flex flex-col items-center justify-center relative px-4 overflow-hidden antialiased select-none">

            {/* Background High-Tech Decorative Accents */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Core Message Container */}
            <div className="relative text-center max-w-xl z-10 flex flex-col items-center">

                {/* Visual Error Code Component */}
                <div className="relative flex items-center justify-center mb-6">
                    {/* Glowing Backing Panel */}
                    <span className="absolute text-[12rem] sm:text-[15rem] font-black tracking-tighter opacity-15 bg-gradient-to-b from-indigo-500/40 to-transparent bg-clip-text text-transparent select-none select-none">
                        404
                    </span>

                    {/* Animated Icon Focal Point */}
                    <div className="relative w-24 h-24 rounded-2xl bg-[#131c2e] border border-slate-800/80 shadow-2xl flex items-center justify-center text-indigo-400 group hover:border-indigo-500/30 transition-all duration-300">
                        <TbBrain className="text-5xl animate-bounce [animation-duration:3s]" />
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-10 blur-md group-hover:opacity-20 transition-opacity" />
                    </div>
                </div>

                {/* Technical Text Alert */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[11px] font-mono uppercase tracking-widest mb-4">
                    <FiActivity className="text-xs animate-pulse" />
                    Error: Context Window Truncated
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3">
                    Prompt Structure <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Not Found</span>
                </h1>

                <p className="text-sm text-slate-400 leading-relaxed max-w-md mb-10">
                    The prompt variable matrix, specific generation model route, or vector workspace database link you are querying appears to have been compiled incorrectly.
                </p>

                {/* Dashboard Shortcut Grid System */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">

                    {/* Primary Portal Router Button */}
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-md transition-all duration-200"
                    >
                        <FiHome className="text-base" />
                        Back to Workspace
                    </Link>

                    {/* Secondary Navigation Element */}
                    <Link
                        href="/all-prompts"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-[#131c2e] hover:bg-slate-800/80 text-slate-300 border border-slate-800/80 transition-all duration-200"
                    >
                        <FiGrid className="text-base text-indigo-400" />
                        Explore Prompt Feed
                    </Link>
                </div>

                {/* Simple Native Backward Command Action */}
                <button
                    onClick={() => window.history.back()}
                    className="mt-8 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-400 transition-colors"
                >
                    <FiArrowLeft />
                    Return to previous vector
                </button>
            </div>

            {/* Bottom Subtle Brand Footer Overlay */}
            <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
                <span className="text-[10px] font-mono tracking-widest uppercase text-slate-600/80">
                    promptAI Framework • v1.9.0
                </span>
            </div>
        </div>
    );
};

export default NotFoundPage;