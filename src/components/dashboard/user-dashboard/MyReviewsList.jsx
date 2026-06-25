"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import {
    FiMessageSquare,
    FiStar,
    FiCalendar,
    FiCpu,
    FiArrowUpRight,
    FiTrash2
} from 'react-icons/fi';

const MyReviewsList = ({ initialReviews = [] }) => {
    console.log(initialReviews,'initial');
    const [reviews, setReviews] = useState(initialReviews);

    const handleDeleteReview = (reviewId) => {
        // Optional: Trigger delete handling endpoint here
        setReviews((prev) => prev.filter(r => r.reviewId !== reviewId));
    };

    if (reviews.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-20 border border-dashed border-slate-800/60 rounded-xl bg-slate-900/10">
                <FiMessageSquare size={24} className="text-slate-600 mb-3" />
                <h3 className="text-sm font-medium text-slate-400">No reviews submitted yet</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                    Your opinions on used marketplace templates will look organized here.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {reviews.map((review) => (
                <div
                    key={review.reviewId}
                    className="group relative flex flex-col justify-between bg-slate-900/20 hover:bg-slate-900/40 border border-slate-800/60 hover:border-slate-700/60 rounded-xl p-5 transition-all duration-200"
                >
                    <div>
                        {/* Upper Header Row */}
                        <div className="flex items-start justify-between gap-4 mb-3">
                            <span className="text-[10px] font-medium text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded flex items-center gap-1 border border-slate-800">
                                <FiCpu className="size-2.5 text-sky-400" />
                                {review.promptTitle ? "Prompt Feedback" : "System Review"}
                            </span>

                            {/* Star Generator */}
                            <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, index) => (
                                    <FiStar
                                        key={index}
                                        size={13}
                                        className={`${index < review.rating
                                            ? "text-amber-400 fill-amber-400"
                                            : "text-slate-700"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Prompt Association Title */}
                        <h3 className="text-sm font-medium text-slate-200 tracking-tight line-clamp-1 group-hover:text-violet-400 transition-colors duration-200 flex items-center gap-1">
                            <span>{review.promptTitle || "Loading Title Context..."}</span>
                        </h3>

                        {/* Review Content Paragraph Box */}
                        <p className="text-xs sm:text-sm text-slate-400 mt-3 leading-relaxed bg-slate-900/40 border border-slate-800/40 p-3 rounded-lg italic text-slate-300">
                            {review.comment}
                        </p>
                    </div>

                    {/* Bottom Utility Metadata Footer Row */}
                    <div className="flex items-center justify-between mt-5 pt-3 border-t border-slate-800/40">
                        <span className="text-[11px] text-slate-500 flex items-center gap-1">
                            <FiCalendar className="size-3" />
                            {review.reviewDate}
                        </span>

                        <div className="flex items-center gap-1">
                            <Link
                                href={`/all-prompts/${review.promptId}`}
                                title="View Prompt Item"
                                className="p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
                            >
                                <FiArrowUpRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyReviewsList;