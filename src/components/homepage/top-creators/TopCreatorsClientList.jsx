// src/components/TopCreatorsClientList.jsx
'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiAward, FiCheckCircle } from 'react-icons/fi';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12 // Creates smooth staggered build-up animation
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 60, damping: 15 }
    }
};

const TopCreatorsClientList = ({ creators }) => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }} // Triggers when section scrolls into viewport
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-5"
        >
            {creators.map((creator) => {
                const isPro = creator.plan === 'premium' || creator.role === 'admin';

                return (
                    <motion.div
                        key={creator._id?.$oid || creator._id}
                        variants={cardVariants}
                        className="group relative rounded-2xl bg-[#131c2e] p-5 flex flex-col items-center text-center transition-all duration-300 border border-slate-800/60 hover:border-slate-700 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.4)]"
                    >
                        {/* Premium Plan Badge Accent */}
                        {isPro && (
                            <span className="absolute top-3 right-3 text-amber-400 bg-amber-500/10 p-1.5 rounded-lg border border-amber-500/20 shadow-inner">
                                <FiAward className="text-sm" />
                            </span>
                        )}

                        {/* Avatar Frame */}
                        <div className={`relative w-16 h-16 rounded-full p-0.5 mb-3 transition-transform duration-500 group-hover:rotate-6 ${isPro ? 'bg-gradient-to-tr from-amber-500 to-orange-400' : 'bg-slate-700'
                            }`}>
                            <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-900">
                                <Image
                                    src={creator.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"}
                                    alt={creator.name}
                                    fill
                                    sizes="64px"
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* User Profiling Data */}
                        <div className="flex items-center gap-1 justify-center max-w-full">
                            <h3 className="text-sm font-bold text-white truncate max-w-[110px] group-hover:text-indigo-300 transition-colors">
                                {creator.name}
                            </h3>
                            {creator.emailVerified && (
                                <FiCheckCircle className="text-blue-400 text-xs shrink-0" title="Verified Creator" />
                            )}
                        </div>

                        <p className="text-[11px] text-slate-400 mt-0.5 truncate w-full">
                            {creator.email}
                        </p>

                        {/* Status Label Tiers */}
                        <div className="mt-4 w-full">
                            <span className={`inline-block w-full text-center text-[9px] font-bold tracking-wider uppercase py-1.5 rounded-lg transition-colors ${isPro
                                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                    : 'bg-slate-900/60 text-slate-400 border border-slate-800'
                                }`}>
                                {creator.plan === 'free' ? 'Core Hub' : 'Master Pro'}
                            </span>
                        </div>
                    </motion.div>
                );
            })}
        </motion.div>
    );
};

export default TopCreatorsClientList;