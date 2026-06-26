// components/admin/AnalyticsHeader.jsx
import React from 'react';
import { HiOutlineChartBar } from 'react-icons/hi2';

const AnalyticsHeader = () => {
    return (
        <div className="flex flex-col gap-1 border-b border-slate-800/60 pb-5">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-600/90 text-white rounded-lg shadow-lg shadow-indigo-500/10">
                    <HiOutlineChartBar className="w-6 h-6" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-100 tracking-tight">
                    Platform Analytics
                </h1>
            </div>
            <p className="text-sm text-slate-400 pl-11">
                Monitor promptAI platform growth, engagement metrics, and user activity.
            </p>
        </div>
    );
};

export default AnalyticsHeader;