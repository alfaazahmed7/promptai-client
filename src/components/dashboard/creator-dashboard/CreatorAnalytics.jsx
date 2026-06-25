"use client";

import React, { useMemo } from 'react';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from 'recharts';
import { FiLayers, FiCopy, FiBookmark } from 'react-icons/fi';

// Declared outside to keep React from recreating it during active render steps
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#111827] border border-slate-800 p-3.5 rounded-xl shadow-2xl backdrop-blur-md">
                <p className="text-xs font-bold text-slate-400 mb-2">{label}</p>
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs font-medium my-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-slate-300">{entry.name}:</span>
                        <span className="text-white font-bold ml-auto">{entry.value}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const CreatorAnalytics = ({ userPromptsData = [] }) => {

    // Processes standard cumulative totals natively from live records
    const stats = useMemo(() => {
        const totalPrompts = userPromptsData.length;
        const totalCopies = userPromptsData.reduce((acc, curr) => acc + (Number(curr.copyCount) || 0), 0);
        const totalBookmarks = userPromptsData.reduce((acc, curr) => acc + (Number(curr.bookmarkCount) || 0), 0);
        return { totalPrompts, totalCopies, totalBookmarks };
    }, [userPromptsData]);

    // Structures the exact date points required by Recharts to draw lines smoothly
    const chartData = useMemo(() => {
        if (!userPromptsData.length) return [];

        const sortedPrompts = [...userPromptsData].map(p => {
            let parsedDate = new Date();
            if (p.createdAt) parsedDate = new Date(p.createdAt);
            else if (p._id?.$oid) {
                const timestamp = parseInt(p._id.$oid.substring(0, 8), 16) * 1000;
                parsedDate = new Date(timestamp);
            }
            return {
                ...p,
                dateObj: parsedDate,
                formattedDate: parsedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            };
        }).sort((a, b) => a.dateObj - b.dateObj);

        const trackingMap = {};
        let cumulativePrompts = 0;

        sortedPrompts.forEach(prompt => {
            const dateStr = prompt.formattedDate;
            const currentCopies = Number(prompt.copyCount) || 0;

            if (!trackingMap[dateStr]) {
                trackingMap[dateStr] = { date: dateStr, copies: 0, newPrompts: 0 };
            }
            trackingMap[dateStr].copies += currentCopies;
            trackingMap[dateStr].newPrompts += 1;
        });

        return Object.values(trackingMap).map(day => {
            cumulativePrompts += day.newPrompts;
            return {
                date: day.date,
                Copies: day.copies,
                TotalPrompts: cumulativePrompts
            };
        });
    }, [userPromptsData]);

    return (
        <div className="p-6 max-w-7xl mx-auto min-h-screen bg-[#0b0f19] text-slate-200">

            <div className="mb-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-white bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
                    Creator Analytics Hub
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                    Live production telemetry rendering system activity across your distributed prompts.
                </p>
            </div>

            {/* Total Metric Modules */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#111827]/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Total Asset Volume</p>
                            <h3 className="text-3xl font-bold text-white mt-2">{stats.totalPrompts}</h3>
                        </div>
                        <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
                            <FiLayers size={20} />
                        </div>
                    </div>
                </div>

                <div className="bg-[#111827]/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Total Copied Logs</p>
                            <h3 className="text-3xl font-bold text-white mt-2">{stats.totalCopies}</h3>
                        </div>
                        <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                            <FiCopy size={20} />
                        </div>
                    </div>
                </div>

                <div className="bg-[#111827]/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">User Bookmarks</p>
                            <h3 className="text-3xl font-bold text-white mt-2">{stats.totalBookmarks}</h3>
                        </div>
                        <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                            <FiBookmark size={20} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Panel Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Bar Graph */}
                <div className="bg-[#111827]/50 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
                    <h4 className="text-sm font-bold text-white mb-1">Global Interaction Index</h4>
                    <p className="text-xs text-slate-400 mb-6">Chronological distribution tracking live usage counts.</p>
                    <div className="w-full h-72">
                        {chartData.length === 0 ? (
                            <div className="h-full w-full flex items-center justify-center text-xs text-slate-500">No data records found in your database.</div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
                                            <stop offset="100%" stopColor="#059669" stopOpacity={0.1} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                                    <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                                    <Bar dataKey="Copies" name="Total Copies" fill="url(#barGradient)" radius={[6, 6, 0, 0]} barSize={28} />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>

                {/* Area Graph */}
                <div className="bg-[#111827]/50 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
                    <h4 className="text-sm font-bold text-white mb-1">Cumulative Catalog Architecture</h4>
                    <p className="text-xs text-slate-400 mb-6">Incremental growth vector tracking active runtime inventories.</p>
                    <div className="w-full h-72">
                        {chartData.length === 0 ? (
                            <div className="h-full w-full flex items-center justify-center text-xs text-slate-500">No metrics available to calculate progression curves.</div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
                                            <stop offset="100%" stopColor="#6366f1" stopOpacity={0.0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                                    <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area type="monotone" dataKey="TotalPrompts" name="Inventory Growth" stroke="#818cf8" strokeWidth={2.5} fillOpacity={1} fill="url(#areaGradient)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CreatorAnalytics;