// src/components/TopCreatorsSection.jsx
import { getUsers } from '@/lib/api/users';
import React from 'react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';
import TopCreatorsClientList from './TopCreatorsClientList';

const TopCreatorsSection = async () => {
    // Fetch users dynamically from your backend API
    const allCreators = await getUsers() || [];

    // 1 & 2. Skip first 4 data items and grab the next 6 data items
    const targetedCreators = allCreators.slice(4, 10);

    return (
        <section className="bg-[#0B1220] text-gray-100 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
                            <HiOutlineSparkles className="text-sm animate-pulse" />
                            Elite Community
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                            Top Prompt <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent">Creators</span>
                        </h2>
                        <p className="text-slate-400 mt-2 max-w-xl text-sm sm:text-base">
                            Meet the brilliant engineers and digital artists crafting production-ready prompt frameworks.
                        </p>
                    </div>

                    <Link
                        href="/creators"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 group transition-colors duration-200"
                    >
                        View all creators
                        <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Empty State Fallback */}
                {targetedCreators.length === 0 ? (
                    <div className="text-center py-16 bg-[#131c2e] rounded-2xl border border-slate-800">
                        <p className="text-slate-400">No creators found in this range.</p>
                    </div>
                ) : (
                    /* 3. Pass creators to Client Component handling Framer Motion scroll animations */
                    <TopCreatorsClientList creators={targetedCreators} />
                )}

            </div>
        </section>
    );
};

export default TopCreatorsSection;