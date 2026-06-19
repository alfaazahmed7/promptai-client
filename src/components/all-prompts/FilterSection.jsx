// src/components/FilterSection.jsx
'use client';
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FiSearch, FiLayers, FiCpu, FiBarChart } from 'react-icons/fi';

const FilterSection = ({ currentFilters }) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleFilterChange = (key, value) => {
        const params = new URLSearchParams(window.location.search);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        // Triggers server-side update by transitioning state through the path string URL
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="space-y-5">
            {/* Search Input */}
            <div className="form-control w-full">
                <label className="label text-xs font-semibold uppercase tracking-wider text-base-content/60">Search Keywords</label>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search titles, tags..."
                        defaultValue={currentFilters?.search || ''}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                        className="input input-bordered w-full pl-10 focus:input-primary bg-base-100 transition-all text-sm"
                    />
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40 text-lg" />
                </div>
            </div>

            {/* Category Dropdown */}
            <div className="form-control w-full">
                <label className="label text-xs font-semibold uppercase tracking-wider text-base-content/60">Category</label>
                <div className="relative">
                    <select
                        defaultValue={currentFilters?.category || ''}
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                        className="select select-bordered w-full pl-10 bg-base-100 text-sm focus:select-primary"
                    >
                        <option value="">All Categories</option>
                        <option value="Web Development">Web Development</option>
                        <option value="AI Art">AI Art</option>
                        <option value="Content Writing">Content Writing</option>
                        <option value="Sales & Marketing">Sales & Marketing</option>
                    </select>
                    <FiLayers className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40 text-lg" />
                </div>
            </div>

            {/* AI Tool Dropdown */}
            <div className="form-control w-full">
                <label className="label text-xs font-semibold uppercase tracking-wider text-base-content/60">AI Engine</label>
                <div className="relative">
                    <select
                        defaultValue={currentFilters?.aiTool || ''}
                        onChange={(e) => handleFilterChange('aiTool', e.target.value)}
                        className="select select-bordered w-full pl-10 bg-base-100 text-sm focus:select-primary"
                    >
                        <option value="">All Tools</option>
                        <option value="ChatGPT">ChatGPT</option>
                        <option value="Claude AI">Claude AI</option>
                        <option value="Midjourney">Midjourney</option>
                    </select>
                    <FiCpu className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40 text-lg" />
                </div>
            </div>

            {/* Sorting Dropdown */}
            <div className="form-control w-full">
                <label className="label text-xs font-semibold uppercase tracking-wider text-base-content/60">Sort Order</label>
                <div className="relative">
                    <select
                        defaultValue={currentFilters?.sort || 'latest'}
                        onChange={(e) => handleFilterChange('sort', e.target.value)}
                        className="select select-bordered w-full pl-10 bg-base-100 text-sm focus:select-primary"
                    >
                        <option value="latest">Newest Released</option>
                        <option value="popular">Most Copied</option>
                        <option value="alphabetical">Alphabetical (A-Z)</option>
                    </select>
                    <FiBarChart className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40 text-lg" />
                </div>
            </div>
        </div>
    );
};

export default FilterSection;