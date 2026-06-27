import React from 'react';
import { FiStar, FiUser } from 'react-icons/fi';

const UsersReviews = ({ reviews = [], user, isLocked }) => {
    return (
        <div>
            {!isLocked &&
                <div className="bg-[#161f30] p-6 rounded-2xl border border-gray-700/40 shadow-xl space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg flex items-center gap-2 text-secondary">
                            <FiUser /> Community Feed
                        </h3>
                        <div className="badge badge-secondary font-bold text-xs">
                            {reviews?.length || 0}
                        </div>
                    </div>

                    {!reviews || reviews.length === 0 ? (
                        <p className="text-center text-xs text-gray-400 py-6 border border-dashed border-gray-700/50 rounded-xl bg-[#1a2333]">
                            No evaluations posted yet. Be the first to share your experience!
                        </p>
                    ) : (
                        <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                            {reviews.map((rev, index) => (
                                <div key={rev._id || index} className="p-4 bg-[#1a2333] rounded-xl border border-gray-700/30 space-y-1.5 shadow-sm">
                                    <div className="flex items-center justify-between gap-2 flex-wrap">
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-300">
                                            <div className="w-5 h-5 rounded-full bg-[#1e293b] flex items-center justify-center text-gray-400">
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
                                                    className={i < rev.rating ? "fill-current text-orange-400" : "text-gray-700"}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
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