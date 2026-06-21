// 2. InteractionBar.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiBookmark, FiAlertTriangle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { addBookmark } from '@/lib/actions/bookmark';

const InteractionBar = ({ promptId, initialBookmarked, initialCopyCount, isLocked }) => {
    const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
    const [copyCount, setCopyCount] = useState(initialCopyCount);
    const [isReporting, setIsReporting] = useState(false);
    const [reportReason, setReportReason] = useState('');

    const userData = authClient.useSession();
    const user = userData.data?.user;

    // --- INSTANT UI CROSS-COMPONENT LISTEN LOGIC ---
    useEffect(() => {
        const handleInstantIncrement = () => {
            setCopyCount(prev => prev + 1);
        };

        window.addEventListener('prompt-copied', handleInstantIncrement);
        return () => {
            window.removeEventListener('prompt-copied', handleInstantIncrement);
        };
    }, []);

    // Sync state if initialCopyCount changes from server actions
    useEffect(() => {
        setCopyCount(initialCopyCount);
    }, [initialCopyCount]);

    const handleBookmark = async () => {
        if (!user?.email) {
            return toast.error('Please log in to save bookmarks');
        }

        try {
            const newState = !isBookmarked;
            setIsBookmarked(newState);
            if (newState) {
                toast.success('Prompt added to bookmarks successfully!');
            } else {
                toast.success('Bookmark removed.');
            }

            const payload = {
                userEmail: user?.email,
                promptId: promptId,
            };

            await addBookmark(payload);
        }
        catch (err) {
            toast.error('An error occurred. Please try again.');
        }
    };

    const handleReportSubmit = (e) => {
        if (!user?.email) {
            return toast.error('Please log in to report');
        }

        e.preventDefault();
        if (!reportReason) return toast.error('Please pick a valid reason');

        toast.success('Report submitted. Our moderation team will review this soon.');
        setIsReporting(false);
    };

    return (
        <div className="bg-base-200 p-4 rounded-xl border border-base-content/5 shadow-md flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-6">
                <div className="text-center sm:text-left">
                    <span className="text-xs block text-base-content/50 uppercase tracking-wider font-bold">Total Copies</span>
                    <span className="text-xl font-extrabold text-primary">{copyCount}</span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={handleBookmark}
                    className={`btn btn-sm sm:btn-md gap-2 rounded-xl transition-all duration-200 ${isBookmarked ? 'btn-primary' : 'btn-outline'}`}
                >
                    <FiBookmark className={isBookmarked ? 'fill-current' : ''} />
                    <span className="hidden sm:inline">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                </button>

                <button
                    onClick={() => setIsReporting(true)}
                    className="btn btn-sm sm:btn-md btn-outline btn-error gap-2 rounded-xl"
                >
                    <FiAlertTriangle />
                    <span className="hidden sm:inline">Report</span>
                </button>
            </div>

            {isReporting && (
                <div className="modal modal-open backdrop-blur-sm">
                    <div className="modal-box bg-base-200 border border-base-content/10 rounded-2xl">
                        <h3 className="font-extrabold text-lg flex items-center gap-2 text-error">
                            <FiAlertTriangle /> Report Material Block
                        </h3>
                        <form onSubmit={handleReportSubmit} className="space-y-4 mt-4">
                            <div className="form-control">
                                <label className="label font-semibold text-sm">Reason for flag</label>
                                <select
                                    value={reportReason}
                                    onChange={(e) => setReportReason(e.target.value)}
                                    className="select select-bordered w-full rounded-xl"
                                    required
                                >
                                    <option value="">Select a critical reason</option>
                                    <option value="Spam">Spam or Link Manipulation</option>
                                    <option value="Inappropriate Content">Inappropriate Content</option>
                                    <option value="Copyright Violation">Copyright or Intellectual property theft</option>
                                </select>
                            </div>
                            <div className="modal-action">
                                <button type="button" onClick={() => setIsReporting(false)} className="btn btn-ghost rounded-xl">Cancel</button>
                                <button type="submit" className="btn btn-error rounded-xl">Submit Violation File</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InteractionBar;