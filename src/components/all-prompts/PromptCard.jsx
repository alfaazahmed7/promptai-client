// src/components/PromptCard.jsx
'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiCopy, FiArrowRight, FiUser } from 'react-icons/fi';
import { AiFillCrown } from 'react-icons/ai';

const PromptCard = ({ prompt }) => {
    const isPremium = prompt.tier === 'premium';

    return (
        <div className={`group relative rounded-2xl bg-[#161f30] flex flex-col justify-between overflow-hidden transition-all duration-300 shadow-sm border ${isPremium
            ? 'border-amber-500/30 hover:border-amber-500 hover:shadow-[0_0_25px_rgba(245,158,11,0.15)]'
            : 'border-gray-700/40 hover:border-primary/40 hover:shadow-[0_0_25px_rgba(59,130,246,0.12)]'
            }`}>

            {/* Top Image Banner Section */}
            <div className="relative w-full aspect-video overflow-hidden bg-gray-800 border-b border-gray-700/30">
                <Image
                    src={prompt.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"}
                    alt={prompt.title || "Prompt Thumbnail"}
                    fill
                    sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                    priority={isPremium}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay Floating Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                    <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase rounded-md bg-slate-900/75 text-amber-400 backdrop-blur-md shadow-sm border border-slate-700/30">
                        {prompt.category}
                    </span>
                    <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-md bg-slate-900/75 text-sky-400 backdrop-blur-md shadow-sm border border-slate-700/30">
                        {prompt.aiTool}
                    </span>
                </div>

                {/* Dynamic Premium Tier Badge Overlay */}
                {isPremium && (
                    <span className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 text-[10px] font-black tracking-wider shadow-md z-10 animate-pulse">
                        <AiFillCrown className="text-xs" />
                        PREMIUM
                    </span>
                )}
            </div>

            {/* Card Content Details */}
            <div className="p-5 flex flex-col flex-1 justify-between bg-[#161f30] text-white">
                <div>
                    {/* Card Title */}
                    <h3 className={`text-lg font-bold tracking-tight transition-colors duration-200 line-clamp-1 ${isPremium
                        ? 'text-white group-hover:text-amber-400'
                        : 'text-white group-hover:text-primary'
                        }`}>
                        {prompt.title}
                    </h3>

                    {/* Sub Description */}
                    <p className="text-sm text-gray-400 mt-2 line-clamp-2 min-h-[40px] leading-relaxed">
                        {prompt.fullDescription || "No description provided for this dynamic prompt design strategy."}
                    </p>
                </div>

                {/* Bottom Row / Metric Utilities */}
                <div className="mt-5 pt-4 border-t border-gray-700/40 flex items-center justify-between">
                    {/* Creator Information */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                        <FiUser className="text-base text-gray-500 shrink-0" />
                        <span className="truncate max-w-[110px]">{prompt.creatorName}</span>
                    </div>

                    {/* Action Metrics & Links */}
                    <div className="flex items-center gap-2">
                        {/* Read-Only Copy Metric Badge */}
                        <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-gray-700/40 bg-[#1e293b] text-gray-300">
                            <FiCopy className="text-sm text-gray-500" />
                            <span>{prompt.copyCount || 0}</span>
                        </div>

                        {/* View Details Target Link */}
                        <Link
                            href={`/all-prompts/${prompt._id || 'details'}`}
                            className={`btn btn-sm text-xs gap-1 group-hover:gap-2 transition-all duration-200 border-none shadow-sm ${isPremium
                                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold'
                                : 'btn-primary text-primary-content'
                                }`}
                        >
                            <span>Details</span>
                            <FiArrowRight className="text-xs" />
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PromptCard;