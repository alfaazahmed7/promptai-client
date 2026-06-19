// src/components/PromptCard.jsx
'use client';
import React from 'react';
import Link from 'next/link';
import { FiCopy, FiArrowRight, FiUser,  } from 'react-icons/fi';
import { AiFillCrown } from 'react-icons/ai';

const PromptCard = ({ prompt }) => {
    const isPremium = prompt.tier === 'premium';

    return (
        <div className={`group relative rounded-2xl bg-base-100 border p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${isPremium
                ? 'border-amber-500/20 hover:border-amber-500 hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]'
                : 'border-base-content/10 hover:border-primary/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]'
            }`}>

            {/* Top Badge Information */}
            <div>
                <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
                    <div className="flex gap-2">
                        <span className="badge badge-secondary badge-outline text-xs font-semibold py-2">
                            {prompt.category}
                        </span>
                        <span className="badge badge-primary bg-primary/10 border-none text-primary text-xs font-medium py-2">
                            {prompt.aiTool}
                        </span>
                    </div>

                    {/* Dynamic Premium Tier Badge */}
                    {isPremium && (
                        <span className="badge bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold gap-1 py-2 animate-pulse">
                            <AiFillCrown className="text-xs" />
                            PREMIUM
                        </span>
                    )}
                </div>

                {/* Card Title */}
                <h3 className={`text-xl font-bold tracking-tight transition-colors duration-200 line-clamp-1 ${isPremium ? 'text-base-content group-hover:text-amber-500' : 'text-base-content group-hover:text-[#3a86ff]'
                    }`}>
                    {prompt.title}
                </h3>

                {/* Sub Description */}
                <p className="text-sm text-base-content/70 mt-2 line-clamp-2 min-h-[40px]">
                    {prompt.fullDescription || "No description provided for this dynamic prompt design strategy."}
                </p>
            </div>

            {/* Bottom Row / Metric Utilities */}
            <div className="mt-6 pt-4 border-t border-base-content/5 flex items-center justify-between">
                {/* Creator Information */}
                <div className="flex items-center gap-1.5 text-xs text-base-content/60 font-medium">
                    <FiUser className="text-base text-base-content/40 shrink-0" />
                    <span className="truncate max-w-[120px]">{prompt.creatorName}</span>
                </div>

                {/* Action Metrics & Links */}
                <div className="flex items-center gap-2">
                    {/* Read-Only Copy Metric Badge */}
                    <div className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-base-content/10 bg-base-200/50 text-base-content/70">
                        <FiCopy className="text-sm text-base-content/40" />
                        <span>{prompt.copyCount || 0}</span>
                    </div>

                    {/* View Details Target Link */}
                    <Link
                        href={`/prompts/${prompt._id || 'details'}`}
                        className={`btn btn-sm gap-1 group-hover:gap-2 transition-all duration-200 ${isPremium
                                ? 'btn-warning bg-amber-500 hover:bg-amber-600 text-neutral border-none'
                                : 'btn-primary'
                            }`}
                    >
                        <span>Details</span>
                        <FiArrowRight className="text-xs" />
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default PromptCard;