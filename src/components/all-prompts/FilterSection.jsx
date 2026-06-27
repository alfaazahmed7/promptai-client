// /components/FilterSection.jsx
'use client';
import { usePathname, useRouter } from 'next/navigation';
import { FiBarChart, FiCpu, FiLayers, FiSearch } from 'react-icons/fi';

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
                <label className="label text-xs font-semibold uppercase tracking-wider text-gray-400">Search Keywords</label>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search titles, tags..."
                        defaultValue={currentFilters?.search || ''}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                        /* Fixed background color and text to stay dark */
                        className="input input-bordered w-full pl-10 focus:border-primary bg-[#1a2333] border-gray-700 text-white transition-all text-sm outline-none placeholder-gray-500"
                    />
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                </div>
            </div>

            {/* Category Dropdown */}
            <div className="form-control w-full">
                <label className="label text-xs font-semibold uppercase tracking-wider text-gray-400">Category</label>
                <div className="relative">
                    <select
                        defaultValue={currentFilters?.category || ''}
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                        className="select select-bordered w-full pl-10 bg-[#1a2333] border-gray-700 text-white text-sm focus:border-primary outline-none"
                    >
                        <option value="" className="bg-[#1a2333] text-white">All Categories</option>
                        <option value="Web Development" className="bg-[#1a2333] text-white">Web Development</option>
                        <option value="AI Art" className="bg-[#1a2333] text-white">AI Art</option>
                        <option value="Content Writing" className="bg-[#1a2333] text-white">Content Writing</option>
                        <option value="Sales & Marketing" className="bg-[#1a2333] text-white">Sales & Marketing</option>
                    </select>
                    <FiLayers className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none" />
                </div>
            </div>

            {/* AI Tool Dropdown */}
            <div className="form-control w-full">
                <label className="label text-xs font-semibold uppercase tracking-wider text-gray-400">AI Engine</label>
                <div className="relative">
                    <select
                        defaultValue={currentFilters?.aiTool || ''}
                        onChange={(e) => handleFilterChange('aiTool', e.target.value)}
                        className="select select-bordered w-full pl-10 bg-[#1a2333] border-gray-700 text-white text-sm focus:border-primary outline-none"
                    >
                        <option value="" className="bg-[#1a2333] text-white">All Tools</option>
                        <option value="ChatGPT" className="bg-[#1a2333] text-white">ChatGPT</option>
                        <option value="Claude AI" className="bg-[#1a2333] text-white">Claude AI</option>
                        <option value="Midjourney" className="bg-[#1a2333] text-white">Midjourney</option>
                    </select>
                    <FiCpu className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none" />
                </div>
            </div>

            {/* Sorting Dropdown */}
            <div className="form-control w-full">
                <label className="label text-xs font-semibold uppercase tracking-wider text-gray-400">Sort Order</label>
                <div className="relative">
                    <select
                        defaultValue={currentFilters?.sort || 'latest'}
                        onChange={(e) => handleFilterChange('sort', e.target.value)}
                        className="select select-bordered w-full pl-10 bg-[#1a2333] border-gray-700 text-white text-sm focus:border-primary outline-none"
                    >
                        <option value="latest" className="bg-[#1a2333] text-white">Newest Released</option>
                        <option value="popular" className="bg-[#1a2333] text-white">Most Copied</option>
                        <option value="alphabetical" className="bg-[#1a2333] text-white">Alphabetical (A-Z)</option>
                    </select>
                    <FiBarChart className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none" />
                </div>
            </div>
        </div>
    );
};

export default FilterSection;