import { getAllReviews } from '@/lib/api/review';
import React from 'react';
import Link from 'next/link';
import { FiArrowRight, FiSmile } from 'react-icons/fi';
import CustomerReviewsSlider from './CustomerReviewsSlider';

const CustomerReviewsSection = async () => {
    // Fetch user reviews from database layers
    const allReviews = await getAllReviews() || [];

    // Skip first 6 records and target the rest
    const targetedReviews = allReviews.slice(6);

    return (
        <section className="bg-[#0B1220] text-gray-100 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
                            <FiSmile className="text-sm" />
                            Community Feedback
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                            What Engineers <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">Are Saying</span>
                        </h2>
                        <p className="text-slate-400 mt-2 max-w-xl text-sm sm:text-base">
                            Real metrics and feedback from developers and creatives maximizing production pipelines.
                        </p>
                    </div>

                    <Link
                        href="/reviews"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 group transition-colors duration-200"
                    >
                        See all insights
                        <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Slider Render Fallback Check */}
                {targetedReviews.length === 0 ? (
                    <div className="text-center py-16 bg-[#131c2e] rounded-2xl border border-slate-800">
                        <p className="text-slate-400">No additional customer reviews available.</p>
                    </div>
                ) : (
                    /* Client Drag/Swipe Carousel Container */
                    <CustomerReviewsSlider reviews={targetedReviews} />
                )}

            </div>
        </section>
    );
};

export default CustomerReviewsSection;