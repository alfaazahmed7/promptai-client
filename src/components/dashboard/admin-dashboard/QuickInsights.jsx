// components/admin/QuickInsights.jsx
import React from 'react';

const QuickInsights = ({ stats }) => {
    const averageCopies = stats.totalPrompts > 0 
        ? (stats.totalCopies / stats.totalPrompts).toFixed(1) 
        : 0;

    return (
        <div className="bg-[#131a26] rounded-xl border border-slate-800/50 p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-100 mb-4">
                Quick Engagement Insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0b0f19]/60 p-4 rounded-lg border border-slate-800/30">
                    <p className="text-sm text-slate-400">Average Copies Per Prompt</p>
                    <p className="text-xl font-bold text-indigo-400 mt-1">
                        {averageCopies}x copies
                    </p>
                </div>
                <div className="bg-[#0b0f19]/60 p-4 rounded-lg border border-slate-800/30">
                    <p className="text-sm text-slate-400">Platform Status</p>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/50 animate-pulse"></span>
                        <p className="text-sm font-medium text-slate-300">Healthy & Synchronized</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickInsights;