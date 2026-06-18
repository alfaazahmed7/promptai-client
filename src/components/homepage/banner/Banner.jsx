"use client";
import { useState } from "react";
import Image from "next/image";
import { FiSearch, FiArrowRight, FiCpu,  } from "react-icons/fi";
import bannerImage from '@/assets/banner.jpg';
import { FaFireFlameCurved } from "react-icons/fa6";

const HeroBanner = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const trendingTags = [
        "Midjourney v6 Art",
        "SEO Blog Writer",
        "SaaS Copywriting",
        "Python Automation",
        "UI Design Ideas"
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Searching for:", searchQuery);
    };

    return (
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#011627] pt-24 pb-12">

            {/* 1. Optimized Background Image Layout */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={bannerImage}
                    alt="AI Creativity Banner Background"
                    fill
                    priority
                    placeholder="blur"
                    className="object-cover object-center opacity-25 select-none pointer-events-none"
                />
                {/* Deep background mesh blends */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#011627] via-transparent to-[#011627]/90" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#011627]/60 via-transparent to-[#011627]/60" />
            </div>

            {/* 2. Main Center Content Container */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center space-y-8">

                {/* Glowing Tech Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs sm:text-sm font-medium backdrop-blur-md">
                    <FiCpu className="w-4 h-4 animate-spin [animation-duration:3s]" />
                    <span>The Ultimate AI Prompt Marketplace</span>
                </div>

                {/* Headings aligned exactly with your snapshot rendering */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15] max-w-4xl">
                    Ignite Your Creativity with <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-[#dc2f02]">
                        Expert AI Prompts
                    </span>
                </h1>

                {/* Subtitle description */}
                <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
                    Skip the trial and error. Discover high-converting prompts built to supercharge your productivity, automation, and digital art engineering.
                </p>

                {/* 3. Sleek Pill-Shaped Search Input */}
                <form
                    onSubmit={handleSearch}
                    className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-slate-700/50 p-1.5 rounded-full shadow-2xl flex items-center gap-2 mt-2 transition-all duration-300 focus-within:border-indigo-500/60 focus-within:ring-2 focus-within:ring-indigo-500/10"
                >
                    <div className="flex items-center flex-1 pl-4 text-slate-400">
                        <FiSearch className="w-5 h-5 flex-shrink-0" />
                        <input
                            type="text"
                            placeholder="Search optimized prompts for Midjourney, ChatGPT, Claude..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-transparent border-none outline-none py-2.5 px-3 text-white placeholder-slate-400 text-sm focus:ring-0"
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-sm sm:btn-md bg-indigo-600 hover:bg-indigo-500 border-none text-white px-6 rounded-full shadow-lg transition-all duration-200 normal-case"
                    >
                        Search
                    </button>
                </form>

                {/* 4. Trending Filter Tags */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-3xl pt-1">
                    <span className="text-xs sm:text-sm text-slate-400 font-medium flex items-center gap-1 mr-1">
                        <FaFireFlameCurved className="text-[#dc2f02] w-4 h-4" /> Trending:
                    </span>
                    {trendingTags.map((tag, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => setSearchQuery(tag)}
                            className="px-3 py-1 text-xs rounded-full bg-slate-800/40 hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-300 border border-slate-700/40 hover:border-indigo-500/40 transition-all duration-200"
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {/* 5. Clean Action Call Button Layout */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto">
                    <button className="btn btn-md bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-none px-8 rounded-xl shadow-xl shadow-indigo-600/20 w-full sm:w-auto group gap-2 normal-case">
                        Explore Premium Prompts
                        <FiArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>

                    <button className="btn btn-md btn-link text-slate-400 hover:text-white no-underline hover:no-underline px-6 w-full sm:w-auto normal-case transition-colors duration-200">
                        Sell Your Prompts
                    </button>
                </div>

            </div>

            {/* Aesthetic Fading Footer Gradient Layer */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#011627] to-transparent pointer-events-none" />
        </section>
    );
};

export default HeroBanner;