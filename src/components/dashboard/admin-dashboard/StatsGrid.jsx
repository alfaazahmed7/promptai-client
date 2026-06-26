// components/admin/StatsGrid.jsx
import React from 'react';
import { FiUsers, FiLayers, FiMessageSquare, FiCopy } from 'react-icons/fi';

const StatsGrid = ({ stats }) => {
    const cards = [
        {
            title: 'Total Users',
            value: stats.totalUsers.toLocaleString(),
            icon: FiUsers,
            color: 'text-blue-400 bg-blue-500/10',
            borderColor: 'border-l-blue-500/70'
        },
        {
            title: 'Total Prompts',
            value: stats.totalPrompts.toLocaleString(),
            icon: FiLayers,
            color: 'text-emerald-400 bg-emerald-500/10',
            borderColor: 'border-l-emerald-500/70'
        },
        {
            title: 'Total Reviews',
            value: stats.totalReviews.toLocaleString(),
            icon: FiMessageSquare,
            color: 'text-amber-400 bg-amber-500/10',
            borderColor: 'border-l-amber-500/70'
        },
        {
            title: 'Total Copies',
            value: stats.totalCopies.toLocaleString(),
            icon: FiCopy,
            color: 'text-purple-400 bg-purple-500/10',
            borderColor: 'border-l-purple-500/70'
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => {
                const Icon = card.icon;
                return (
                    <div 
                        key={index} 
                        className={`bg-[#131a26] p-6 rounded-xl border border-slate-800/50 border-l-4 ${card.borderColor} shadow-xl hover:bg-[#17202f] transition-all duration-300 flex items-center justify-between group`}
                    >
                        <div className="space-y-1">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider group-hover:text-slate-300 transition-colors">
                                {card.title}
                            </p>
                            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                                {card.value}
                            </h3>
                        </div>
                        <div className={`p-3.5 rounded-xl ${card.color}`}>
                            <Icon className="w-6 h-6" />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default StatsGrid;