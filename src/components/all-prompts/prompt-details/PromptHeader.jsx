'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FiCpu, FiTag, FiUser, FiLayers } from 'react-icons/fi';

const PromptHeader = ({ prompt }) => {
    const difficultyColors = {
        Easy: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
        Intermediate: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
        Advanced: 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#161f30] p-6 sm:p-8 rounded-2xl border border-gray-700/40 shadow-xl relative overflow-hidden"
        >
            {/* Background Accent glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />

            <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="badge badge-primary gap-1 text-xs font-semibold px-3 py-2">
                    <FiCpu /> {prompt.aiTool}
                </span>
                <span className="badge bg-transparent border border-gray-600 text-gray-300 gap-1 text-xs px-3 py-2">
                    <FiLayers /> {prompt.category}
                </span>
                <span className={`badge text-xs font-bold px-3 py-2 ${difficultyColors[prompt.difficulty] || 'bg-gray-800 text-gray-400 border border-gray-700'}`}>
                    {prompt.difficulty}
                </span>
                {prompt.tier === 'premium' && (
                    <span className="badge badge-secondary text-xs font-bold px-3 py-2 animate-pulse">
                        👑 PREMIUM
                    </span>
                )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3 text-white">
                {prompt.title}
            </h1>

            <p className="text-gray-400 max-w-3xl text-sm sm:text-base leading-relaxed mb-6">
                {prompt.fullDescription}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-700/40 text-xs text-gray-400">
                <div className="flex items-center gap-2">
                    <div className="avatar placeholder">
                        <div className="bg-[#1e293b] text-gray-200 rounded-full w-6">
                            <span>{prompt.creatorName?.[0] || 'A'}</span>
                        </div>
                    </div>
                    <span className="font-medium text-white">Curated by {prompt.creatorName}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default PromptHeader;