import React from 'react';
import { FiStar, FiUser } from 'react-icons/fi';

const UsersReviews = ({ reviews = [], user, isLocked }) => {
    return (
        <div>
            {/* --- CARD 2: STANDALONE SEPARATE REVIEWS FEED BOX (The Independent Box Below) --- */}
            {!isLocked &&
                <div className="bg-base-200 p-6 rounded-2xl border border-base-content/5 shadow-xl space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg flex items-center gap-2 text-secondary">
                            <FiUser /> Community Feed
                        </h3>
                        <div className="badge badge-secondary font-bold text-xs">
                            {reviews?.length || 0}
                        </div>
                    </div>

                    {!reviews || reviews.length === 0 ? (
                        <p className="text-center text-xs text-base-content/50 py-6 border border-dashed border-base-content/10 rounded-xl bg-base-100">
                            No evaluations posted yet. Be the first to share your experience!
                        </p>
                    ) : (
                        <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                            {reviews.map((rev, index) => (
                                <div key={rev._id || index} className="p-4 bg-base-100 rounded-xl border border-base-content/5 space-y-1.5 shadow-sm">
                                    <div className="flex items-center justify-between gap-2 flex-wrap">
                                        <div className="flex items-center gap-2 text-xs font-bold text-base-content/70">
                                            <div className="w-5 h-5 rounded-full bg-base-300 flex items-center justify-center text-base-content/60">
                                                <FiUser size={10} />
                                            </div>
                                            <span className="truncate max-w-[180px] sm:max-w-none">
                                                {rev.email === user?.email ? 'You (Reviewer)' : rev.email}
                                            </span>
                                        </div>

                                        <div className="flex items-center text-orange-400 gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <FiStar
                                                    key={i}
                                                    size={12}
                                                    className={i < rev.rating ? "fill-current text-orange-400" : "text-base-content/20"}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm text-base-content/80 whitespace-pre-wrap leading-relaxed">
                                        {rev.comment}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default UsersReviews;